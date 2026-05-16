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
  Binary,
  Cpu,
  Activity,
  Lightbulb,
  ExternalLink,
  Layers,
  History,
  Info
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
  const [activeTab, setActiveTab] = useState<'home' | 'lab'>('home');

  return (
    <div className="app-container">
      {/* INDUSTRIAL NAVIGATION */}
      <nav className="nav-industrial">
        <div className="nav-brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <Atom className="text-signal-green" size={32} strokeWidth={3} />
          <span>SMS.RESEARCH</span>
        </div>
        
        <div className="nav-link-group hide-mobile">
          <span onClick={() => setActiveTab('home')} className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}>System.Index</span>
          <span onClick={() => setActiveTab('lab')} className={`nav-link ${activeTab === 'lab' ? 'active' : ''}`}>Research.Archive</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/synapse-dot/mcsms.github.io" className="nav-link mono" style={{ fontSize: '0.65rem' }}>
            SRC.CORE_REPOSITORY
          </a>
        </div>
      </nav>

      {activeTab === 'home' ? (
        <main>
          {/* HERO: LABORATORY ENTRY */}
          <section className="hero-box">
            <div className="hero-text">
              <span className="lab-label">Simulation & Modeling Society</span>
              <h1>The Art of <br /><span className="text-signal-green">Numerical</span><br />Reality</h1>
            </div>
            <div className="flex flex-col justify-center gap-12">
              <p className="hero-subtitle">
                A research-oriented student collective. We model complex systems through mathematical rigor, 
                versioned artifacts, and peer-to-peer engineering.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('lab')} className="btn btn-primary">
                  Explore Archive <ArrowRight size={20} />
                </button>
                <button className="btn btn-ghost">
                  Join Society
                </button>
              </div>
            </div>
          </section>

          {/* ONBOARDING: VIDEO DATA STREAM */}
          <section className="container py-24" id="onboarding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="lab-label">Orientation.01</span>
                <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">System <br /> Onboarding</h2>
                <div className="space-y-12">
                  <div className="flex gap-8">
                    <div className="bg-signal-green-soft p-4 rounded-xl border border-signal-green/20 h-fit">
                      <Binary className="text-signal-green" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 uppercase italic">Growth Mindset</h3>
                      <p className="text-text-dim text-sm leading-relaxed">
                        Master Python, C++, and FORTRAN. We maintain the "engine room" of simulation science. 
                        No black boxes allowed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="bg-signal-green-soft p-4 rounded-xl border border-signal-green/20 h-fit">
                      <Cpu className="text-signal-green" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 uppercase italic">Unix Environment</h3>
                      <p className="text-text-dim text-sm leading-relaxed">
                        Linux-first development. We use WSL or native distros for parity. 
                        Command line mastery is a prerequisite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="video-frame">
                  <div className="video-overlay-data">
                    FILE: SOCIETY_INTRO.MP4 <br />
                    RES: 1080P_COLLECTIVE_VIEW <br />
                    STAT: DECRYPTED
                  </div>
                  <video controls>
                    <source src="/mcsms.github.io/Simulation_Society_Intro.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </section>

          {/* WORKFLOW: SCIENTIFIC ENGINE */}
          <section className="container py-24 border-y 2px solid var(--border-heavy)">
            <span className="lab-label text-center">Protocol.Engine</span>
            <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-widest">The SMS Workflow</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
              {[
                { icon: Lightbulb, title: "Hypothesis", desc: "Identify System Problem" },
                { icon: Code, title: "Math Model", desc: "Define Governing Equations" },
                { icon: Activity, title: "Simulation", desc: "Numerical Implementation" },
                { icon: History, title: "Observation", desc: "Document Findings" }
              ].map((step, i) => (
                <div key={i} className="bg-panel border border-border-heavy p-10 text-center flex flex-col items-center group">
                  <step.icon className="text-text-dim group-hover:text-signal-green transition-colors mb-6" size={40} />
                  <h4 className="text-lg font-black uppercase mb-2">{step.title}</h4>
                  <p className="mono text-[10px] text-text-dim uppercase tracking-widest">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACCESS REQUEST FORM */}
          <section className="container py-32" id="join">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              <div className="lg:col-span-5">
                <span className="lab-label">Manifest.Apply</span>
                <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Manifest Interest</h2>
                <p className="text-text-dim mb-8">
                  Submit your membership request to the committee. Admission requires commitment to 
                  scientific rigor and open-source documentation.
                </p>
                <div className="bg-panel p-8 border-l-4 border-signal-green">
                  <Info className="text-signal-green mb-4" size={24} />
                  <p className="mono text-xs leading-relaxed uppercase">
                    NOTE: Every access request generates a public GitHub Issue. Your technical journey starts with this record.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-panel p-12 border border-border-heavy">
                <form className="grid grid-cols-2 gap-x-8" onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const body = `### New Member Manifest\n\n**Name:** ${fd.get('name')}\n**Class:** ${fd.get('class')}\n**GitHub:** @${fd.get('github')}\n**Interest:** ${fd.get('domain')}`;
                  window.open(`https://github.com/synapse-dot/mcsms.github.io/issues/new?title=Access_Request&body=${encodeURIComponent(body)}`, '_blank');
                }}>
                  <div className="col-span-1">
                    <label className="lab-label">Legal_Name</label>
                    <input name="name" className="input-industrial" placeholder="John Doe" required />
                  </div>
                  <div className="col-span-1">
                    <label className="lab-label">Class_Grade</label>
                    <input name="class" className="input-industrial" placeholder="12-B" required />
                  </div>
                  <div className="col-span-2">
                    <label className="lab-label">Github_Identity</label>
                    <input name="github" className="input-industrial" placeholder="octocat" required />
                  </div>
                  <div className="col-span-2 mb-12">
                    <label className="lab-label">Domain_Focus</label>
                    <select name="domain" className="input-industrial">
                      <option>Physics Simulation</option>
                      <option>Biological Systems</option>
                      <option>Atmospheric Modeling</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-signal col-span-2">Submit Access Request</button>
                </form>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* RESEARCH LAB: ARCHIVE GRID */
        <section className="container py-24 min-h-screen">
          <div className="flex justify-between items-end mb-16 border-b-2 border-border-heavy pb-8">
            <div>
              <span className="lab-label">Archive.V1</span>
              <h2 className="text-6xl font-black uppercase tracking-tighter">Research Lab</h2>
            </div>
            <button className="btn btn-primary" onClick={() => window.open('https://github.com/synapse-dot/mcsms.github.io/issues/new', '_blank')}>
              <Plus size={20} /> Propose Project
            </button>
          </div>

          <div className="lab-grid">
            {projects.map((p) => (
              <div key={p.id} className="lab-card" onClick={() => setSelectedProject(p)}>
                <div className="flex justify-between items-start mb-12">
                  <div className="bg-signal-green-soft p-3 rounded-lg text-signal-green">
                    <Layers size={24} />
                  </div>
                  <span className="mono text-[10px] uppercase tracking-widest text-signal-green font-bold">
                    REL_{p.version}
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter group-hover:text-signal-green">{p.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed mb-12 flex-1">{p.desc}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="lab-label mb-0">{p.status}</span>
                  <ChevronRight className="text-signal-green" size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LAB REPORT MODAL: THE SCIENTIFIC ENGINE */}
      {selectedProject && (
        <div className="modal-industrial" onClick={() => setSelectedProject(null)}>
          <div className="modal-content-wrapper" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="lab-label">Formal Report</span>
                <h2 className="text-6xl font-black uppercase tracking-tighter">{selectedProject.title}</h2>
                <p className="mono text-xs text-text-dim mt-2 tracking-[0.3em]">ID: {selectedProject.id} // VER: {selectedProject.version}</p>
              </div>
              <X className="text-text-dim hover:text-white cursor-pointer mb-2" size={48} onClick={() => setSelectedProject(null)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
              <div className="lg:col-span-7 space-y-16">
                <section>
                  <span className="lab-label">01. Problem Statement</span>
                  <p className="text-xl font-semibold leading-relaxed">{selectedProject.problemStatement}</p>
                </section>
                
                <section>
                  <span className="lab-label">02. Mathematical Model</span>
                  <div className="bg-panel p-8 border border-border-heavy mono text-signal-green text-sm leading-loose">
                    {selectedProject.mathModel}
                  </div>
                </section>

                <section>
                  <span className="lab-label">03. Simulation Approach</span>
                  <p className="text-text-dim leading-relaxed">{selectedProject.simulationApproach}</p>
                </section>
              </div>

              <div className="lg:col-span-5">
                <div className="lab-report border-l-4 border-signal-green">
                  <span className="lab-label">Findings & Validation</span>
                  <div className="space-y-12 mt-8">
                    <div>
                      <h4 className="mono text-[10px] uppercase font-bold text-signal-green mb-2 tracking-widest">Observations</h4>
                      <p className="text-sm italic">{selectedProject.observations}</p>
                    </div>
                    <div className="bg-signal-green-soft p-6 border border-signal-green/20 rounded-xl">
                      <h4 className="mono text-[10px] uppercase font-bold text-signal-green mb-2 tracking-widest">Verified Conclusion</h4>
                      <p className="text-sm font-bold text-white leading-relaxed">{selectedProject.conclusion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 border-t 2px solid var(--border-heavy) pt-12">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 justify-center">
                <ExternalLink size={20} /> View Source Code
              </a>
              <a href={`${selectedProject.githubUrl}/issues`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 justify-center">
                <Users size={20} /> Peer Review Thread
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER: INDUSTRIAL SIGN-OFF */}
      <footer className="container py-24 border-t border-border-heavy mt-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <Atom className="text-signal-green" size={40} />
            <div>
              <span className="text-xl font-black tracking-tighter block">SMS.RESEARCH</span>
              <span className="mono text-[8px] text-text-dim uppercase tracking-[0.4em]">Established.2026</span>
            </div>
          </div>
          <p className="mono text-[10px] text-text-dim uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Simulation & Modeling Society. All rights reserved.
          </p>
          <div className="flex gap-8 items-center">
             <Globe className="text-text-dim hover:text-signal-green transition-colors" size={24} />
             <span className="mono text-[10px] text-signal-green">ARCHIVE_ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
