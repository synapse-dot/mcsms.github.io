import { useEffect, useMemo, useState } from 'react';
import { 
  Atom, 
  ChevronRight,
  X,
  Plus,
  Code,
  Activity,
  ExternalLink,
  Layers,
  LogOut,
  ShieldCheck,
  Binary
} from 'lucide-react';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: 'stable' | 'research';
  version: string;
  problem_statement: string;
  math_model: string;
  simulation_approach: string;
  observations: string;
  conclusion: string;
  githubUrl: string;
}

const seedProjects: Project[] = [
  { 
    id: 'projectiles',
    slug: 'projectiles',
    title: "3D Ballistics Engine", 
    description: "Kinematic modeling of high-velocity projectiles with variable atmospheric density and wind vectors.", 
    status: 'stable',
    version: '1.0.0',
    problem_statement: "Modeling accurate 3D kinematics for high-velocity objects where air resistance and wind vectors cannot be ignored.",
    math_model: "Second-order ODEs: F_total = m*g + F_drag. Drag force F_d = -1/2 * ρ * v^2 * C_d * A.",
    simulation_approach: "Euler Integration with dynamic time-stepping for stability. OpenGL for real-time trajectory plotting.",
    observations: "Non-linear drag significantly alters terminal range; wind vectors introduce complex lateral displacement.",
    conclusion: "Numerical methods are essential for modeling non-ideal conditions where analytical solutions are unavailable.",
    githubUrl: "https://github.com/synapse-dot/3DProjectiles"
  },
  { 
    id: 'physx',
    slug: 'physx',
    title: "Gravitational Lensing", 
    description: "Interactive light-ray deflection simulation based on Point-Mass deflection formulas from General Relativity.", 
    status: 'stable',
    version: '1.0.0',
    problem_statement: "Visualizing space-time curvature effects on light propagation near massive stellar objects.",
    math_model: "α = 4GM / (c² b). Impact parameter 'b' determines deflection strength and caustic formation.",
    simulation_approach: "Path integration of light rays using 4th-order Runge-Kutta. PyQt6 for the interactive parameter interface.",
    observations: "Formation of Einstein rings and multiple image systems verified through impact parameter sweep.",
    conclusion: "Real-time computational lensing provides a pedagogical tool for understanding space-time geometry.",
    githubUrl: "https://github.com/synapse-dot/PhysX"
  }
];

function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const jsonPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof jsonPayload.sub === 'string' ? jsonPayload.sub : null;
  } catch {
    return null;
  }
}

function App() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey);
  const apiHeaders = useMemo(
    () => ({
      apikey: supabaseAnonKey ?? '',
      'Content-Type': 'application/json'
    }),
    [supabaseAnonKey]
  );

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'lab' | 'dashboard' | 'committee'>('home');
  const [sessionToken, setSessionToken] = useState<string | null>(localStorage.getItem('sms_access_token'));
  const [memberName, setMemberName] = useState<string>('Researcher');
  const [memberId, setMemberId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [joiningMessage, setJoiningMessage] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [committeeRole, setCommitteeRole] = useState(false);
  const [roleCheckLoading, setRoleCheckLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [committeeMessage, setCommitteeMessage] = useState<string | null>(null);
  const isLoggedIn = Boolean(sessionToken);

  useEffect(() => {
    if (!supabaseReady || !sessionToken) return;
    const tokenUserId = getUserIdFromToken(sessionToken);
    if (tokenUserId) setMemberId(tokenUserId);
    fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { ...apiHeaders, Authorization: `Bearer ${sessionToken}` }
    })
      .then((r) => r.ok ? r.json() : null)
      .then((user) => {
        if (user?.email) setMemberName(user.email.split('@')[0]);
        if (user?.id) setMemberId(user.id);
      })
      .catch(() => undefined);
  }, [supabaseReady, sessionToken, supabaseUrl, apiHeaders]);


  useEffect(() => {
    if (!supabaseReady) return;
    setProjectsLoading(true);
    fetch(`${supabaseUrl}/rest/v1/projects?select=*&order=created_at.desc`, { headers: apiHeaders })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data);
      })
      .catch(() => setProjectsError('Could not load projects from database; showing fallback archive.'))
      .finally(() => setProjectsLoading(false));
  }, [supabaseReady, supabaseUrl, apiHeaders]);

  useEffect(() => {
    if (!supabaseReady || !sessionToken || !memberId) return;
    setRoleCheckLoading(true);
    fetch(`${supabaseUrl}/rest/v1/user_roles?select=role&user_id=eq.${memberId}`, {
      headers: { ...apiHeaders, Authorization: `Bearer ${sessionToken}` }
    })
      .then(async (r) => {
        if (!r.ok) {
          setCommitteeMessage('Role check failed. Re-login or verify user_roles RLS.');
          return [];
        }
        return r.json();
      })
      .then((rows) => setCommitteeRole(Array.isArray(rows) && rows.some((row: any) => row.role === 'committee')))
      .catch(() => {
        setCommitteeRole(false);
        setCommitteeMessage('Unable to validate committee role.');
      })
      .finally(() => setRoleCheckLoading(false));
  }, [supabaseReady, sessionToken, memberId, supabaseUrl, apiHeaders]);

  const loadPendingRequests = async () => {
    if (!supabaseReady || !sessionToken) return;
    const res = await fetch(`${supabaseUrl}/rest/v1/membership_requests?select=*&status=eq.pending&order=created_at.asc`, {
      headers: { ...apiHeaders, Authorization: `Bearer ${sessionToken}` }
    });
    if (!res.ok) {
      setCommitteeMessage('Unable to load pending requests. Check membership_requests RLS.');
      return;
    }
    const data = await res.json();
    setPendingRequests(Array.isArray(data) ? data : []);
  };

  const handleRequestDecision = async (id: string, status: 'approved' | 'rejected', userId: string) => {
    if (!supabaseReady || !sessionToken) return;
    const updateRes = await fetch(`${supabaseUrl}/rest/v1/membership_requests?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...apiHeaders, Authorization: `Bearer ${sessionToken}` , Prefer: 'return=minimal'},
      body: JSON.stringify({ status })
    });
    if (!updateRes.ok) {
      setCommitteeMessage('Failed to update request status.');
      return;
    }
    if (status === 'approved') {
      await fetch(`${supabaseUrl}/rest/v1/user_roles`, {
        method: 'POST',
        headers: { ...apiHeaders, Authorization: `Bearer ${sessionToken}`, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ user_id: userId, role: 'member' })
      });
    }
    setCommitteeMessage(`Request ${status}.`);
    loadPendingRequests();
  };
  const runAuth = async () => {
    if (!supabaseReady) {
      setAuthMessage('Missing Supabase env variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }
    const endpoint = authMode === 'signin' ? 'token?grant_type=password' : 'signup';
    const payload = authMode === 'signin' ? { email, password } : { email, password, data: { source: 'sms.platform' } };
    const res = await fetch(`${supabaseUrl}/auth/v1/${endpoint}`, {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      setAuthMessage(data.error_description ?? data.msg ?? 'Authentication failed.');
      return;
    }
    const token = data.access_token;
    if (token) {
      localStorage.setItem('sms_access_token', token);
      setSessionToken(token);
      setAuthMessage(authMode === 'signin' ? 'Signed in successfully.' : 'Account created and signed in.');
    } else {
      setAuthMessage('Account created. Check your inbox if email confirmation is enabled.');
    }
  };

  const signOut = () => {
    localStorage.removeItem('sms_access_token');
    setSessionToken(null);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen">
      {/* PLATFORM NAVIGATION */}
      <nav className="platform-nav flex-center">
        <div className="platform-container flex-center justify-between w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-dim p-2 rounded-xl">
              <Atom className="text-emerald" size={28} />
            </div>
            <span className="text-xl font-black tracking-tighter">SMS.PLATFORM</span>
          </div>
          
          <div className="flex gap-10 items-center hide-mobile">
            <span onClick={() => setActiveTab('home')} className={`btn-link cursor-pointer uppercase text-xs font-bold tracking-widest ${activeTab === 'home' ? 'text-emerald' : 'text-dim'}`}>Index</span>
            <span onClick={() => setActiveTab('lab')} className={`btn-link cursor-pointer uppercase text-xs font-bold tracking-widest ${activeTab === 'lab' ? 'text-emerald' : 'text-dim'}`}>Laboratory</span>
            {isLoggedIn && <span onClick={() => setActiveTab('dashboard')} className={`btn-link cursor-pointer uppercase text-xs font-bold tracking-widest ${activeTab === 'dashboard' ? 'text-emerald' : 'text-dim'}`}>Dashboard</span>}
            {isLoggedIn && committeeRole && <span onClick={() => { setActiveTab('committee'); loadPendingRequests(); }} className={`btn-link cursor-pointer uppercase text-xs font-bold tracking-widest ${activeTab === 'committee' ? 'text-emerald' : 'text-dim'}`}>Committee</span>}
          </div>

          <div className="flex gap-4">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="form-input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-secondary" onClick={runAuth}>{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</button>
                  <button className="btn-ghost" onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}>
                    {authMode === 'signin' ? 'Create account' : 'Have account?'}
                  </button>
                </div>
                {authMessage && <span className="mono text-[10px] text-muted">{authMessage}</span>}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 bg-emerald-dim px-3 py-1.5 rounded-lg border border-emerald/20">
                    <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                    <span className="mono text-[10px] font-bold">MEMBER_ACTIVE::{memberName}</span>
                 </div>
                 <button className="btn-ghost p-2 rounded-lg" onClick={() => { if (memberId) { setCommitteeMessage('Refreshing role...'); setCommitteeRole(false); } }} title="Role refresh may require re-login">
                    {roleCheckLoading ? '...' : 'Role'}
                 </button>
                 <button className="btn-ghost p-2 rounded-lg" onClick={signOut}>
                    <LogOut size={18} />
                 </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <main>
          {/* HERO SECTION */}
          <header className="hero-section">
            <div className="platform-container stack-center">
              <div className="mono text-[10px] font-black text-emerald uppercase tracking-[0.4em] mb-6">
                Scientific Software Ecosystem
              </div>
              <h1 className="hero-title">
                The Platform for <br /><span className="text-emerald">Numerical Reality</span>
              </h1>
              <p className="hero-subtitle">
                A research-oriented student collective. We model complex systems through mathematical rigor, 
                versioned artifacts, and peer-to-peer engineering.
              </p>
              <div className="hero-video-wrap mb-10">
                <video
                  className="hero-video"
                  controls
                  preload="metadata"
                  playsInline
                  src="/mcsms.github.io/Simulation_Society_Intro.mp4"
                >
                  Your browser does not support the intro video.
                </video>
                <p className="mono text-[10px] text-dim mt-4">Asset: /public/Simulation_Society_Intro.mp4</p>
              </div>
              <div className="flex-center gap-6 mt-4 w-full sm:w-auto">
                <button onClick={() => setActiveTab('lab')} className="btn btn-primary">
                  View Laboratory
                </button>
                <button className="btn btn-secondary">
                  Read Roadmap
                </button>
              </div>
            </div>
          </header>

          {/* JOIN SECTION */}
          <section className="py-32" id="join">
            <div className="platform-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                 <span className="text-emerald uppercase tracking-widest text-[10px] font-black mb-4 mono">GATEWAY_CONTROL</span>
                 <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-[1.1]">Join the Scientific <br /> Workflow</h2>
                 <p className="text-muted text-lg mb-12 leading-relaxed">
                    Submit your membership request to the committee. Admission requires commitment to 
                    scientific rigor and open-source documentation.
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: ShieldCheck, title: "Scientific Rigor" },
                      { icon: Code, title: "Git Workflow" },
                      { icon: Binary, title: "Lower-Level" },
                      { icon: Activity, title: "Live Models" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border-subtle">
                         <item.icon className="text-emerald" size={20} />
                         <span className="text-xs font-bold uppercase tracking-wider">{item.title}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="lab-card" style={{ padding: '3.5rem' }}>
                <form className="flex flex-col gap-6" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!sessionToken || !supabaseReady || !memberId) {
                    setJoiningMessage('Please sign in first. Join requests are stored in the club database.');
                    return;
                  }
                  const fd = new FormData(e.currentTarget);
                  const res = await fetch(`${supabaseUrl}/rest/v1/membership_requests`, {
                    method: 'POST',
                    headers: {
                      ...apiHeaders,
                      Authorization: `Bearer ${sessionToken}`,
                      Prefer: 'return=minimal'
                    },
                    body: JSON.stringify({
                      user_id: memberId,
                      legal_name: fd.get('name'),
                      class_grade: fd.get('class'),
                      github_handle: fd.get('github'),
                      research_focus: fd.get('domain'),
                      status: 'pending'
                    })
                  });
                  setJoiningMessage(res.ok ? 'Membership request submitted. Committee review pending.' : 'Could not submit request. Check Supabase schema/RLS.');
                }}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="mono text-[9px] font-bold text-muted uppercase tracking-widest">Legal_Name</label>
                       <input name="name" className="form-input" required placeholder="Felix Wayne" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="mono text-[9px] font-bold text-muted uppercase tracking-widest">Class_Grade</label>
                       <input name="class" className="form-input" required placeholder="10-C" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="mono text-[9px] font-bold text-muted uppercase tracking-widest">GitHub_Handle</label>
                     <input name="github" className="form-input" required placeholder="synapse-dot" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="mono text-[9px] font-bold text-muted uppercase tracking-widest">Research_Focus</label>
                     <select name="domain" className="form-input" style={{ appearance: 'none' }}>
                        <option>Physics Simulation</option>
                        <option>Biological Modeling</option>
                        <option>Atmospheric Systems</option>
                     </select>
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">
                    Submit Membership Request
                  </button>
                  {joiningMessage && <span className="mono text-[10px] text-muted">{joiningMessage}</span>}
                </form>
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === 'lab' && (
        <section className="py-24 min-h-screen">
          <div className="platform-container">
            <div className="flex-center justify-between mb-20">
               <div>
                  <span className="text-emerald uppercase tracking-widest text-[10px] font-black mb-4 mono">CENTRAL_ARCHIVE</span>
                  <h2 className="text-6xl font-black uppercase tracking-tighter">Research Lab</h2>
               </div>
               <button className="btn btn-primary" onClick={() => window.open('https://github.com/synapse-dot/mcsms.github.io/issues/new', '_blank')}>
                  <Plus size={20} /> Propose Project
               </button>
            </div>

            <div className="mb-6">{projectsLoading && <p className="mono text-[10px] text-muted">Loading projects...</p>}{projectsError && <p className="mono text-[10px] text-muted">{projectsError}</p>}</div><div className="bento-grid">
               {projects.map((p) => (
                 <div key={p.id} className="lab-card flex flex-col cursor-pointer" onClick={() => setSelectedProject(p)}>
                    <div className="flex justify-between items-start mb-10">
                       <div className="bg-emerald-dim p-3 rounded-2xl">
                          <Layers className="text-emerald" size={24} />
                       </div>
                       <span className="mono text-[10px] font-bold px-2 py-1 bg-border-subtle rounded">{p.version}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">{p.title}</h3>
                    <p className="text-muted text-sm mb-6 flex-grow">{p.description}</p>
                    <div className="flex items-center gap-2 text-emerald text-xs font-bold uppercase tracking-widest">
                       View Archives <ChevronRight size={16} />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}
      
      {activeTab === 'committee' && (
        <section className="py-24 min-h-screen">
          <div className="platform-container">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Committee Dashboard</h2>
            <p className="text-muted mb-8">Pending membership requests</p>
            <div className="flex flex-col gap-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="lab-card p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-black">{request.legal_name}</h3>
                      <p className="text-sm text-muted">{request.class_grade} • @{request.github_handle}</p>
                      <p className="text-sm text-dim mt-2">{request.research_focus}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn btn-primary" onClick={() => handleRequestDecision(request.id, 'approved', request.user_id)}>Approve</button>
                      <button className="btn btn-secondary" onClick={() => handleRequestDecision(request.id, 'rejected', request.user_id)}>Reject</button>
                    </div>
                  </div>
                </div>
              ))}
              {!pendingRequests.length && <p className="text-muted">No pending requests.</p>}
              {committeeMessage && <p className="mono text-[10px] text-muted">{committeeMessage}</p>}
            </div>
          </div>
        </section>
      )}

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex-center bg-black/80 p-6" onClick={() => setSelectedProject(null)}>
           <div className="lab-card max-w-4xl w-full p-12 relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-6 right-6 p-2 hover:bg-surface rounded-lg" onClick={() => setSelectedProject(null)}><X size={24} /></button>
              <h2 className="text-4xl font-black mb-6">{selectedProject.title}</h2>
              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <div>
                       <h4 className="mono text-[10px] font-black text-muted uppercase tracking-widest mb-2">Problem</h4>
                       <p className="text-sm text-dim leading-relaxed">{selectedProject.problem_statement}</p>
                    </div>
                    <div>
                       <h4 className="mono text-[10px] font-black text-muted uppercase tracking-widest mb-2">Math_Model</h4>
                       <p className="text-sm text-dim leading-relaxed mono">{selectedProject.math_model}</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <h4 className="mono text-[10px] font-black text-muted uppercase tracking-widest mb-2">Observations</h4>
                       <p className="text-sm text-dim leading-relaxed">{selectedProject.observations}</p>
                    </div>
                    <button className="btn btn-secondary w-full" onClick={() => window.open(selectedProject.githubUrl, '_blank')}>
                       View GitHub Repo <ExternalLink size={16} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default App;
