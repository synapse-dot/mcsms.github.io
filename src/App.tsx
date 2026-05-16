import { useState } from 'react';
import { 
  Atom, 
  Globe, 
  ChevronRight,
  Users,
  X,
  Plus,
  ArrowRight,
  Code,
  Activity,
  ExternalLink,
  Layers,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Binary,
  History as HistoryIcon
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
    id: '3d-projectiles',
    title: "3D Projectile Simulator", 
    desc: "A C++ program that simulates 3D projectile motion with gravity and air resistance, featuring OpenGL-based 3D animation.", 
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'lab' | 'dashboard'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              <button className="btn btn-secondary" onClick={() => setIsLoggedIn(true)}>
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 bg-emerald-dim px-3 py-1.5 rounded-lg border border-emerald/20">
                    <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                    <span className="mono text-[10px] font-bold">MEMBER_ACTIVE</span>
                 </div>
                 <button className="btn-ghost p-2 rounded-lg" onClick={() => { setIsLoggedIn(false); setActiveTab('home'); }}>
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
                  Explore Research <ArrowRight size={20} />
                </button>
                <button className="btn btn-secondary" onClick={() => {
                  const element = document.getElementById('join');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Membership Path
                </button>
              </div>
            </div>
          </header>

          {/* ONBOARDING VIDEO - FIXED & CENTERED */}
          <section className="py-24 bg-surface" id="onboarding">
            <div className="platform-container stack-center">
              <div className="max-w-4xl w-full">
                <div className="stack-center mb-16">
                  <span className="text-emerald uppercase tracking-widest text-[10px] font-black mb-4 mono">ORIENTATION_V1</span>
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">System Onboarding</h2>
                  <p className="text-muted text-center max-w-xl">
                    Master Python, C++, and FORTRAN. We maintain the "engine room" of simulation science. 
                    No black boxes allowed.
                  </p>
                </div>
                
                <div style={{ position: 'relative', width: '100%', borderRadius: '2rem', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#000', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
                   <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }} className="mono text-[10px] text-emerald">
                      STREAMING: COLLECTIVE_INTRO.MP4 <br />
                      DATA_STAT: DECRYPTED
                   </div>
                    <video controls style={{ width: '100%', display: 'block' }}>
                      <source src="Simulation_Society_Intro.mp4" type="video/mp4" />
                    </video>
                </div>
              </div>
            </div>
          </section>

          {/* JOIN FORM */}
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
                <form className="flex flex-col gap-6" onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const body = `### New Member Manifest\n\n**Name:** ${fd.get('name')}\n**Class:** ${fd.get('class')}\n**GitHub:** @${fd.get('github')}\n**Interest:** ${fd.get('domain')}`;
                  window.open(`https://github.com/synapse-dot/mcsms.github.io/issues/new?title=Access_Request&body=${encodeURIComponent(body)}`, '_blank');
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
                       <span className="mono text-[10px] font-bold text-emerald border border-emerald/30 px-3 py-1 rounded-full uppercase">{p.status}</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{p.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-12 flex-1">{p.desc}</p>
                    <div className="flex justify-between items-center pt-8 border-t border-border-subtle">
                       <span className="mono text-[10px] font-bold uppercase text-muted">Version: {p.version}</span>
                       <span className="text-emerald font-bold text-sm flex items-center gap-2">Report <ChevronRight size={18} /></span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'dashboard' && (
        <section className="py-24 min-h-screen">
           <div className="platform-container">
              <div className="stack-center mb-16">
                 <LayoutDashboard className="text-emerald mb-6" size={48} />
                 <h2 className="text-6xl font-black uppercase tracking-tighter">Member Dashboard</h2>
                 <p className="text-muted text-lg mt-4">Welcome back, researcher. Access your current simulations and reviews.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="lab-card">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="bg-emerald-dim p-2 rounded-lg"><Code size={20} className="text-emerald" /></div>
                       <h3 className="text-xl font-bold uppercase">Active Projects</h3>
                    </div>
                    <div className="bg-surface p-4 rounded-xl border border-border-subtle mono text-xs mb-4">
                       &gt; projectile-fix-gravity <br />
                       <span className="text-emerald">[BUILD_SUCCESS]</span>
                    </div>
                    <button className="btn btn-secondary w-full py-3 text-xs">Manage Work</button>
                 </div>
                 <div className="lab-card">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="bg-emerald-dim p-2 rounded-lg"><HistoryIcon size={20} className="text-emerald" /></div>
                       <h3 className="text-xl font-bold uppercase">History</h3>
                    </div>
                    <p className="text-muted text-xs leading-relaxed mb-6 italic">Last submission: Gravitational Lensing v1.0.0 (3 days ago)</p>
                    <button className="btn btn-secondary w-full py-3 text-xs">View Archive</button>
                 </div>
                 <div className="lab-card">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="bg-emerald-dim p-2 rounded-lg"><Users size={20} className="text-emerald" /></div>
                       <h3 className="text-xl font-bold uppercase">Peer Review</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="bg-surface p-3 rounded-lg border border-border-subtle text-[10px] font-bold uppercase tracking-widest text-emerald">2 Pending Reviews</div>
                    </div>
                    <button className="btn btn-primary w-full py-3 text-xs mt-4">Enter PR Lab</button>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-20 border-t border-border-subtle bg-surface">
         <div className="platform-container flex-center justify-between">
            <div className="flex items-center gap-4">
               <Atom className="text-emerald" size={32} />
               <span className="text-xl font-black tracking-tighter">SMS.PLATFORM</span>
            </div>
            <p className="mono text-[10px] text-muted uppercase tracking-widest">
               &copy; {new Date().getFullYear()} Simulation & Modeling Society. // EST. 2026
            </p>
            <div className="flex gap-8">
               <Globe className="text-muted hover:text-emerald cursor-pointer" size={24} />
            </div>
         </div>
      </footer>

      {/* LAB REPORT MODAL */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-surface" onClick={e => e.stopPropagation()}>
            <button className="absolute top-10 right-10 btn-ghost p-2 rounded-full cursor-pointer border-none bg-transparent" onClick={() => setSelectedProject(null)}>
              <X size={32} />
            </button>
            
            <div className="stack-center mb-20">
               <div className="bg-emerald-dim p-4 rounded-3xl mb-8">
                  <Layers className="text-emerald" size={48} />
               </div>
               <h2 className="text-6xl font-black uppercase tracking-tighter text-center">{selectedProject.title}</h2>
               <div className="mono text-[10px] font-bold text-muted uppercase tracking-[0.3em] mt-4">Archive_ID: {selectedProject.id} // VER_{selectedProject.version}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
               <div className="md:col-span-7">
                  <div className="mb-16">
                     <span className="lab-section-title">01. Research Objective</span>
                     <p className="text-xl font-medium leading-relaxed">{selectedProject.problemStatement}</p>
                  </div>
                  <div>
                     <span className="lab-section-title">02. Mathematical Model</span>
                     <div className="bg-black p-8 rounded-2xl border border-border-subtle mono text-emerald text-sm leading-loose">
                        {selectedProject.mathModel}
                     </div>
                  </div>
               </div>

               <div className="md:col-span-5">
                  <div className="bg-surface p-10 border-l-4 border-emerald rounded-r-2xl h-full">
                     <span className="lab-section-title">Findings & Observation</span>
                     <div className="mt-8 space-y-10">
                        <div>
                           <h4 className="mono text-[9px] font-bold text-emerald uppercase tracking-widest mb-4">Observation_Log</h4>
                           <p className="text-sm text-muted italic">{selectedProject.observations}</p>
                        </div>
                        <div className="bg-emerald-dim p-6 rounded-xl border border-emerald/20">
                           <h4 className="mono text-[9px] font-bold text-emerald uppercase tracking-widest mb-4">Final_Conclusion</h4>
                           <p className="text-sm font-black text-white leading-relaxed">{selectedProject.conclusion}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-center gap-6 pt-12 border-t border-border-subtle">
               <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1">
                  <ExternalLink size={20} /> View Source
               </a>
               <a href={`${selectedProject.githubUrl}/issues`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary flex-1">
                  <Users size={20} /> Peer Review
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
