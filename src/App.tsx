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
  title: string;
  desc: string;
  status: 'stable' | 'research';
  version: string;
  problemStatement: string;
  mathModel: string;
  simulationApproach: string;
  observations: string;
  conclusion: string;
  githubUrl: string;
}

const projects: Project[] = [
  { 
    id: 'projectiles',
    title: "3D Ballistics Engine", 
    desc: "Kinematic modeling of high-velocity projectiles with variable atmospheric density and wind vectors.", 
    status: 'stable',
    version: '1.0.0',
    problemStatement: "Modeling accurate 3D kinematics for high-velocity objects where air resistance and wind vectors cannot be ignored.",
    mathModel: "Second-order ODEs: F_total = m*g + F_drag. Drag force F_d = -1/2 * ρ * v^2 * C_d * A.",
    simulationApproach: "Euler Integration with dynamic time-stepping for stability. OpenGL for real-time trajectory plotting.",
    observations: "Non-linear drag significantly alters terminal range; wind vectors introduce complex lateral displacement.",
    conclusion: "Numerical methods are essential for modeling non-ideal conditions where analytical solutions are unavailable.",
    githubUrl: "https://github.com/synapse-dot/3DProjectiles"
  },
  { 
    id: 'physx',
    title: "Gravitational Lensing", 
    desc: "Interactive light-ray deflection simulation based on Point-Mass deflection formulas from General Relativity.", 
    status: 'stable',
    version: '1.0.0',
    problemStatement: "Visualizing space-time curvature effects on light propagation near massive stellar objects.",
    mathModel: "α = 4GM / (c² b). Impact parameter 'b' determines deflection strength and caustic formation.",
    simulationApproach: "Path integration of light rays using 4th-order Runge-Kutta. PyQt6 for the interactive parameter interface.",
    observations: "Formation of Einstein rings and multiple image systems verified through impact parameter sweep.",
    conclusion: "Real-time computational lensing provides a pedagogical tool for understanding space-time geometry.",
    githubUrl: "https://github.com/synapse-dot/PhysX"
  }
];

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
  const [activeTab, setActiveTab] = useState<'home' | 'lab' | 'dashboard'>('home');
  const [sessionToken, setSessionToken] = useState<string | null>(localStorage.getItem('sms_access_token'));
  const [memberName, setMemberName] = useState<string>('Researcher');
  const [memberId, setMemberId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [joiningMessage, setJoiningMessage] = useState<string | null>(null);
  const isLoggedIn = Boolean(sessionToken);

  useEffect(() => {
    if (!supabaseReady || !sessionToken) return;
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

            <div className="bento-grid">
               {projects.map((p) => (
                 <div key={p.id} className="lab-card flex flex-col cursor-pointer" onClick={() => setSelectedProject(p)}>
                    <div className="flex justify-between items-start mb-10">
                       <div className="bg-emerald-dim p-3 rounded-2xl">
                          <Layers className="text-emerald" size={24} />
                       </div>
                       <span className="mono text-[10px] font-bold px-2 py-1 bg-border-subtle rounded">{p.version}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">{p.title}</h3>
                    <p className="text-muted text-sm mb-6 flex-grow">{p.desc}</p>
                    <div className="flex items-center gap-2 text-emerald text-xs font-bold uppercase tracking-widest">
                       View Archives <ChevronRight size={16} />
                    </div>
                 </div>
               ))}
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
                       <p className="text-sm text-dim leading-relaxed">{selectedProject.problemStatement}</p>
                    </div>
                    <div>
                       <h4 className="mono text-[10px] font-black text-muted uppercase tracking-widest mb-2">Math_Model</h4>
                       <p className="text-sm text-dim leading-relaxed mono">{selectedProject.mathModel}</p>
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
