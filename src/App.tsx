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
  ArrowRight
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  desc: string;
  icon?: any;
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
      <nav className="nav">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <Atom className="text-emerald-500" size={28} />
            </div>
            <span className="text-lg font-bold tracking-tight">SMS</span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-8 hide-mobile">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`nav-link bg-transparent border-none cursor-pointer ${activeTab === 'home' ? 'active' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('lab')} 
                className={`nav-link bg-transparent border-none cursor-pointer ${activeTab === 'lab' ? 'active' : ''}`}
              >
                Research Lab
              </button>
            </div>
            <a 
              href="https://github.com/synapse-dot/mcsms.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Globe size={18} />
              <span className="hide-mobile">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {activeTab === 'home' ? (
        <>
          {/* Hero Section */}
          <header className="relative py-24 md:py-32 overflow-hidden">
            <div className="container relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                SIMULATION & MODELING SOCIETY
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1.1]">
                Engineering <span className="text-emerald-500">Numerical Reality</span>
              </h1>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                A student research collective dedicated to the art of computer simulation, scientific rigor, and peer-to-peer engineering.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setActiveTab('lab')} className="btn btn-primary px-10 py-4">
                  Explore Research <ArrowRight size={20} />
                </button>
                <a href="#onboarding" className="btn btn-secondary px-10 py-4">
                  Member Onboarding
                </a>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          </header>

          {/* Process Section */}
          <section id="onboarding" className="bg-slate-900/50">
            <div className="container">
              <div className="max-w-xl mb-16">
                <h2 className="text-3xl font-bold mb-4">The Development Pipeline</h2>
                <p className="text-slate-400">Our structured path from initial interest to verified research contributor.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    step: "01", 
                    title: "Initialize", 
                    desc: "Join a peer group, pick your domain (Physics/Math/Bio), and set up your Linux/WSL environment.",
                    color: "var(--accent)"
                  },
                  { 
                    step: "02", 
                    title: "Implement", 
                    desc: "Clone a starter lab, solve numerical challenges, and optimize code for performance.",
                    color: "#f59e0b"
                  },
                  { 
                    step: "03", 
                    title: "Validate", 
                    desc: "Submit a Pull Request with documented conclusions. Achieve verified research status.",
                    color: "#10b981"
                  }
                ].map((item, i) => (
                  <div key={i} className="card relative group overflow-hidden">
                    <div className="text-5xl font-black text-slate-800 absolute -top-2 -right-2 transition-colors group-hover:text-emerald-500/10">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Join Form Section */}
          <section id="join" className="border-y border-slate-800">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="badge mb-6">Membership</div>
                  <h2 className="text-4xl font-bold mb-8">Join the Scientific Workflow</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    We follow a strict open-source methodology. If you are ready to learn, document, and engineer high-fidelity simulations, manifest your interest here.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Peer-led learning pipeline",
                      "Focus on numerical stability & precision",
                      "Git-based research contributions",
                      "Linux-first development culture"
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <div className="bg-emerald-500/20 p-1 rounded">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-8 border-emerald-500/20 shadow-2xl">
                  <h3 className="text-xl font-bold mb-8">Request Society Access</h3>
                  <form className="space-y-6" onSubmit={(e) => {
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
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Legal Name</label>
                        <input name="name" required type="text" className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" placeholder="Felix Wayne" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Class / Grade</label>
                        <input name="class" required type="text" className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" placeholder="10-A" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GitHub Username</label>
                      <input name="github" required type="text" className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" placeholder="synapse-dot" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Domain of Research</label>
                      <select name="domain" className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none appearance-none">
                        <option>Physics Simulation</option>
                        <option>Biological Modeling</option>
                        <option>Atmospheric Systems</option>
                        <option>Finance & Stochasticity</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center py-4">
                      Submit Membership Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Research Lab View */
        <section className="py-20 bg-slate-900/30 min-h-screen">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-4">Research Archive</h2>
                <p className="text-slate-400">Formal documentation of society-approved simulations and models.</p>
              </div>
              <button 
                onClick={() => {
                  const title = "Propose New Project";
                  const body = "### Project Proposal\n\n**Project Name:**\n**Description:**\n**GitHub Repo URL:**\n**Research Objective:**\n\n---";
                  window.open(`https://github.com/synapse-dot/mcsms.github.io/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`, '_blank');
                }}
                className="btn btn-primary"
              >
                <Plus size={18} /> Propose Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialProjects.map((p) => (
                <div key={p.id} className="card group cursor-pointer border-emerald-500/10 hover:border-emerald-500/40" onClick={() => setSelectedProject(p)}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-colors">
                      <Box size={24} />
                    </div>
                    <span className={`badge ${p.status === 'stable' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-2">{p.desc}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                    <span className="lab-tag">Release: {p.version}</span>
                    <span className="text-emerald-500 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Details <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
                <Box size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{selectedProject.title}</h2>
                <div className="lab-tag">System Identifier: {selectedProject.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h4 className="lab-tag mb-4">Research Objective</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.objective}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="lab-tag mb-1">State</div>
                  <div className={`text-sm font-bold ${selectedProject.status === 'stable' ? 'text-emerald-500' : 'text-amber-500'}`}>{selectedProject.status.toUpperCase()}</div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="lab-tag mb-1">Version</div>
                  <div className="text-sm font-bold">{selectedProject.version}</div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="lab-tag mb-4">Archived Findings</h4>
              <div className="archive-entry">
                <div className="flex items-center gap-2 mb-3 text-emerald-500">
                  <FlaskConical size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Observations</span>
                </div>
                <p className="mb-8">{selectedProject.observation}</p>
                <div className="flex items-center gap-2 mb-3 text-emerald-500">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Validated Conclusions</span>
                </div>
                <p>{selectedProject.conclusion}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-slate-800">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 justify-center py-4">
                <Globe size={18} /> Source Repository
              </a>
              <a 
                href={`${selectedProject.githubUrl}/issues`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary flex-1 justify-center py-4"
              >
                <Users size={18} /> Peer Discussion
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 border-t border-slate-800 bg-slate-950">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <Atom className="text-emerald-500" size={32} />
            <span className="text-xl font-bold tracking-tighter">SMS</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Simulation & Modeling Society.
          </p>
          <div className="flex gap-8">
            <a href="https://github.com/synapse-dot/mcsms.github.io" className="text-slate-500 hover:text-emerald-500 transition-colors">
              <Globe size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
