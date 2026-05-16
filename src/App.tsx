import { useState } from 'react';
import { 
  Atom, 
  Globe, 
  ChevronRight,
  Users,
  X,
  CheckCircle2,
  FlaskConical,
  Box,
  Plus,
  ArrowRight,
  Code
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  desc: string;
  status: 'stable' | 'research';
  version: string;
  objective: string;
  observation: string;
  conclusion: string;
  githubUrl: string;
}

const initialProjects: Project[] = [
  { 
    id: '3d-projectiles',
    title: "3D Projectile Simulator", 
    desc: "A C++ program that simulates 3D projectile motion with gravity and air resistance, featuring OpenGL-based 3D animation.", 
    status: 'stable',
    version: '1.0.0',
    objective: "Model and visualize projectile motion in 3D space using Euler integration, incorporating air resistance and wind effects.",
    observation: "Air resistance significantly alters the optimal launch angle from 45 degrees, and wind vectors introduce non-parabolic lateral shifts.",
    conclusion: "Euler integration provides a robust numerical solution for real-time visualization, though high-drag scenarios require smaller time steps for stability.",
    githubUrl: "https://github.com/synapse-dot/3DProjectiles"
  },
  { 
    id: 'physx',
    title: "Interactive Gravitational Lensing", 
    desc: "An educational application simulating light-ray deflection by massive objects (black holes) using numerical integration.", 
    status: 'stable',
    version: '1.0.0',
    objective: "Simulate gravitational lensing by integrating small-angle light-ray deflections based on the point-mass formula: α = 4GM / (c² b).",
    observation: "Accumulated deflections produce recognizable lensing patterns and Einstein rings as light rays pass near massive objects.",
    conclusion: "Real-time integration of theoretical deflection formulas allows for interactive exploration of General Relativity effects in a pedagogical context.",
    githubUrl: "https://github.com/synapse-dot/PhysX"
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'lab'>('home');

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="container">
          <div className="nav-wrapper">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-emerald-500/10 p-2 rounded-xl">
                <Atom className="text-emerald-500" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">SMS</span>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex gap-8 hide-mobile">
                <button 
                  onClick={() => setActiveTab('home')} 
                  className={`nav-link bg-transparent border-none cursor-pointer ${activeTab === 'home' ? 'active font-bold text-emerald-500' : 'text-slate-400 font-medium'} hover:text-emerald-500 transition-colors`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setActiveTab('lab')} 
                  className={`nav-link bg-transparent border-none cursor-pointer ${activeTab === 'lab' ? 'active font-bold text-emerald-500' : 'text-slate-400 font-medium'} hover:text-emerald-500 transition-colors`}
                >
                  Research Lab
                </button>
              </div>
              <a 
                href="https://github.com/synapse-dot/mcsms.github.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button cta-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                <Globe size={18} />
                <span className="hide-mobile">Source</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'home' ? (
        <>
          {/* Hero Section */}
          <header className="hero-section">
            <div className="container relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-xs font-bold mb-8">
                SIMULATION & MODELING SOCIETY
              </div>
              <h1 className="hero-title">
                Engineering <br />
                <span className="text-emerald-500">Numerical Reality</span>
              </h1>
              <p className="hero-subtitle">
                A student research collective dedicated to the art of computer simulation, scientific rigor, and peer-to-peer software engineering.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setActiveTab('lab')} className="cta-button cta-primary">
                  Enter Research Lab <ArrowRight size={20} />
                </button>
                <a href="#onboarding" className="cta-button cta-secondary">
                  Membership Path
                </a>
              </div>
            </div>
          </header>

          {/* Onboarding Path */}
          <section id="onboarding" className="py-32 bg-slate-900/20">
            <div className="container">
              <div className="max-w-2xl mb-16">
                <h2 className="text-3xl font-bold mb-4">The Development Pipeline</h2>
                <p className="text-slate-400">Our structured progression from theoretical interest to verified research contributor.</p>
              </div>
              
              <div className="path-container">
                {[
                  { id: "01", title: "Initialize Identity", desc: "Join a peer group, pick your domain (Physics/Math/Bio), and set up your Linux/WSL development environment." },
                  { id: "02", title: "Implement Simulation", desc: "Clone a starter lab, solve numerical challenges, and optimize code for performance and stability." },
                  { id: "03", title: "Validate & Publish", desc: "Submit a Pull Request with documented conclusions. Achieve verified society research status." }
                ].map((step, i) => (
                  <div key={i} className="path-step">
                    <div className="step-id">{step.id}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Membership Form */}
          <section id="join" className="py-32">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Join the Scientific Workflow</h2>
                  <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                    We follow a strict open-source methodology. If you are ready to learn, document, and engineer high-fidelity simulations, manifest your interest here.
                  </p>
                  <div className="flex flex-col gap-6">
                    {[
                      { icon: Code, text: "Git-based research contributions" },
                      { icon: CheckCircle2, text: "Focus on numerical stability & precision" },
                      { icon: Users, text: "Peer-led learning pipeline" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm font-semibold">
                        <div className="bg-emerald-500/10 p-2 rounded-lg">
                          <item.icon size={20} className="text-emerald-500" />
                        </div>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bento-card" style={{ padding: '3rem' }}>
                  <h3 className="text-2xl font-bold mb-8">Request Society Access</h3>
                  <form className="flex flex-col gap-6" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const studentClass = formData.get('class');
                    const github = formData.get('github');
                    const domain = formData.get('domain');
                    
                    const body = `### New Member Manifest\n\n**Name:** ${name}\n**Class/Grade:** ${studentClass}\n**GitHub:** @${github}\n**Interest Area:** ${domain}\n\n---\n*Sent via SMS Portal*`;
                    const title = `Access Request: ${name} (@${github})`;
                    const url = `https://github.com/synapse-dot/mcsms.github.io/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
                    window.open(url, '_blank');
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Legal Name</label>
                        <input name="name" required type="text" className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all" placeholder="Felix Wayne" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Class / Grade</label>
                        <input name="class" required type="text" className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all" placeholder="10-A" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GitHub Username</label>
                      <input name="github" required type="text" className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all" placeholder="synapse-dot" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Research Domain</label>
                      <select name="domain" className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none appearance-none">
                        <option>Physics Simulation</option>
                        <option>Biological Modeling</option>
                        <option>Atmospheric Systems</option>
                        <option>Finance & Stochasticity</option>
                      </select>
                    </div>
                    <button type="submit" className="cta-button cta-primary w-full justify-center">
                      Submit Access Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Research Lab View */
        <section className="py-24 bg-slate-900/10 min-h-screen">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-4">Research Archive</h2>
                <p className="text-slate-400 text-lg">Formal documentation of society-approved simulations and verified models.</p>
              </div>
              <button 
                onClick={() => {
                  const title = "Propose New Project";
                  const body = "### Project Proposal\n\n**Project Name:**\n**Description:**\n**GitHub Repo URL:**\n**Research Objective:**\n\n---";
                  window.open(`https://github.com/synapse-dot/mcsms.github.io/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`, '_blank');
                }}
                className="cta-button cta-primary"
              >
                <Plus size={18} /> Propose Project
              </button>
            </div>
            
            <div className="bento-grid">
              {initialProjects.map((p) => (
                <div key={p.id} className="bento-card cursor-pointer" onClick={() => setSelectedProject(p)}>
                  <div className="flex justify-between items-start mb-10">
                    <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500">
                      <Box size={24} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${p.status === 'stable' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                  <p className="text-slate-400 text-sm mb-10 flex-1 leading-relaxed line-clamp-2">{p.desc}</p>
                  
                  <div className="flex justify-between items-center pt-8 border-t border-slate-800/50">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">REL: {p.version}</div>
                    <div className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                      Details <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="report-modal" onClick={() => setSelectedProject(null)}>
          <div className="report-container" onClick={e => e.stopPropagation()}>
            <button className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors border-none bg-transparent cursor-pointer" onClick={() => setSelectedProject(null)}>
              <X size={32} />
            </button>
            
            <div className="flex items-center gap-6 mb-16">
              <div className="bg-emerald-500/10 p-4 rounded-3xl text-emerald-500">
                <Box size={40} />
              </div>
              <div>
                <h2 className="text-4xl font-bold tracking-tight">{selectedProject.title}</h2>
                <div className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Archive ID: {selectedProject.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              <div>
                <div className="lab-section-title">Objective</div>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">{selectedProject.objective}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/50">
                  <div className="lab-section-title">State</div>
                  <div className={`text-lg font-black ${selectedProject.status === 'stable' ? 'text-emerald-500' : 'text-amber-500'}`}>{selectedProject.status.toUpperCase()}</div>
                </div>
                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/50">
                  <div className="lab-section-title">Version</div>
                  <div className="text-lg font-black text-white">{selectedProject.version}</div>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <div className="lab-section-title">Formal Findings</div>
              <div className="finding-box">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <FlaskConical size={20} />
                  <span className="text-sm font-black uppercase tracking-widest">Observation Log</span>
                </div>
                <p className="text-slate-200 mb-10 leading-relaxed">{selectedProject.observation}</p>
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-black uppercase tracking-widest">Validated Conclusions</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{selectedProject.conclusion}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="cta-button cta-primary flex-1 justify-center">
                <Globe size={20} /> Source Repository
              </a>
              <a 
                href={`${selectedProject.githubUrl}/issues`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button cta-secondary flex-1 justify-center"
              >
                <Users size={20} /> Peer Discussion
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-slate-800/50 bg-slate-950">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <Atom className="text-emerald-500" size={32} />
              <span className="text-2xl font-bold tracking-tighter">SMS</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Simulation & Modeling Society.
            </p>
            <div className="flex gap-8">
              <a href="https://github.com/synapse-dot/mcsms.github.io" className="text-slate-500 hover:text-emerald-500 transition-all">
                <Globe size={28} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
