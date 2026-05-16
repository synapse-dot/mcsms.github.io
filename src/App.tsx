import React, { useState } from 'react';
import { 
  Atom, 
  Code2, 
  Cpu, 
  Globe, 
  GraduationCap, 
  Layers, 
  LineChart, 
  Rocket, 
  Terminal,
  ChevronRight,
  Database,
  Search,
  Users,
  X,
  ClipboardCheck,
  GitPullRequest,
  CheckCircle2,
  FileText,
  FlaskConical
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  desc: string;
  icon: any;
  status: 'stable' | 'research';
  version: string;
  objective: string;
  observation: string;
  conclusion: string;
  githubUrl: string;
}

const projects: Project[] = [
  { 
    id: 'projectile',
    title: "Projectile Motion", 
    desc: "Foundational kinematics and visualization of Newtonian physics.", 
    icon: Rocket,
    status: 'stable',
    version: '1.0.0',
    objective: "Simulate and visualize the trajectory of a particle under constant gravity.",
    observation: "Air resistance significantly alters the optimal launch angle from 45 degrees.",
    conclusion: "Numerical integration (Euler) matches analytical solutions for simple vacuum models.",
    githubUrl: "#"
  },
  { 
    id: 'lensing',
    title: "Gravitational Lensing", 
    desc: "Visualizing the curvature of space-time around massive bodies.", 
    icon: Atom,
    status: 'research',
    version: '0.8.2-beta',
    objective: "Model photon deflection using General Relativity approximations.",
    observation: "Multiple images (Einstein rings) form when alignment is precise.",
    conclusion: "Computational ray-tracing can accurately approximate light bending near black holes.",
    githubUrl: "#"
  },
  { 
    id: 'physics',
    title: "Physics Engine", 
    desc: "Developing a custom prototype for real-time particle interaction.", 
    icon: Cpu,
    status: 'stable',
    version: '1.0.0',
    objective: "Create a collision-detection system for N-bodies.",
    observation: "O(n²) complexity causes lag beyond 500 active particles.",
    conclusion: "Spatial partitioning (Quadtrees) is essential for high-performance simulation.",
    githubUrl: "#"
  },
  { 
    id: 'covid',
    title: "COVID-19 Spread", 
    desc: "Modeling disease propagation using epidemiological algorithms.", 
    icon: Users,
    status: 'stable',
    version: '1.1.0',
    objective: "Simulate SIR (Susceptible, Infectious, Recovered) model dynamics.",
    observation: "R0 value fluctuation directly correlates with agent mobility rates.",
    conclusion: "Herd immunity threshold is reached faster with localized lockdowns.",
    githubUrl: "#"
  },
  { 
    id: 'particle',
    title: "Particle Collision", 
    desc: "Simulating elastic and inelastic interactions at the micro-scale.", 
    icon: Globe,
    status: 'research',
    version: '0.9.5',
    objective: "Analyze energy conservation in multi-particle collisions.",
    observation: "Heat dissipation models require high-precision float calculation.",
    conclusion: "Elasticity coefficients determine the rate of kinetic energy loss in the system.",
    githubUrl: "#"
  },
  { 
    id: 'climate',
    title: "Climate Change", 
    desc: "Atmospheric modeling and long-term trend analysis.", 
    icon: LineChart,
    status: 'research',
    version: '0.4.0',
    objective: "Model feedback loops in CO2-induced warming.",
    observation: "Albedo decrease creates a self-reinforcing warming cycle.",
    conclusion: "Simulation reveals a non-linear relationship between carbon release and temp increase.",
    githubUrl: "#"
  },
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav sticky top-0 z-50">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Atom className="text-cyan-400" size={32} />
            <span className="text-xl font-bold mono">SMS</span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-8 hide-mobile">
              <a href="#onboarding" className="text-slate-400">Start Here</a>
              <a href="#projects" className="text-slate-400">Archive</a>
              <a href="#curriculum" className="text-slate-400">Pipeline</a>
            </div>
            <a 
              href="https://github.com/synapse-dot/mcsms.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <Globe size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="relative pt-20 pb-32">
        <div className="container relative z-10">
          <div style={{ maxWidth: '800px' }}>
            <div className="badge mb-6">Simulation & Modeling Society</div>
            <h1 className="text-5xl font-bold mb-6 hero-title">
              Operationalizing <br />
              <span className="text-cyan-400">System Exploration</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8" style={{ maxWidth: '600px' }}>
              We don't just write code. We build worlds, version our findings, and document the behavior of complex systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#onboarding" className="btn-primary">
                Start Onboarding <Rocket size={20} />
              </a>
              <a href="#join" className="btn-secondary">
                Join Society
              </a>
            </div>
          </div>
        </div>
        <div className="absolute" style={{ top: '50%', right: '-10%', transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none' }}>
          <Terminal size={600} />
        </div>
      </header>

      {/* NEW: Onboarding Section */}
      <section id="onboarding" className="bg-slate-800-half border-y">
        <div className="container">
          <h2 className="text-xl font-bold mb-12 flex items-center gap-3">
            <ClipboardCheck className="text-cyan-400" size={28} /> Onboarding Pipeline
          </h2>
          <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-8">
            <div className="onboarding-card">
              <div className="step-circle">1</div>
              <h3 className="font-bold mb-3">Initialize Interest</h3>
              <p className="text-slate-400 text-sm mb-4">Complete the society interest form to be assigned to a peer group and a technical advisor.</p>
              <a href="#join" className="text-cyan-400 text-sm font-bold flex items-center gap-1 hover:underline">
                Access Form <ChevronRight size={14} />
              </a>
            </div>
            <div className="onboarding-card" style={{ borderLeftColor: '#f59e0b' }}>
              <div className="step-circle" style={{ background: '#f59e0b' }}>2</div>
              <h3 className="font-bold mb-3">Clone First Lab</h3>
              <p className="text-slate-400 text-sm mb-4">Clone our 'Starter-Projectile' repository. Fix the intentional bug in the gravity calculation.</p>
              <div className="mono text-xs text-slate-500 bg-black/30 p-2 rounded">git clone mcsms/starter-lab</div>
            </div>
            <div className="onboarding-card" style={{ borderLeftColor: '#10b981' }}>
              <div className="step-circle" style={{ background: '#10b981' }}>3</div>
              <h3 className="font-bold mb-3">Commit Findings</h3>
              <p className="text-slate-400 text-sm mb-4">Submit your first Pull Request with documented observations. Achievement: Member Level 1.</p>
              <div className="flex items-center gap-2 text-xs font-bold text-success">
                <GitPullRequest size={14} /> FIRST_CONTRIBUTION_READY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid / Scientific Archive */}
      <section id="projects">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Database className="text-cyan-400" size={24} /> Research Archive
              </h2>
              <p className="text-slate-400">A rigorous record of our simulations, versions, and verified conclusions.</p>
            </div>
          </div>
          
          <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="card" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="icon-box" style={{ marginBottom: 0 }}>
                    <p.icon size={24} />
                  </div>
                  <span className={`status-tag status-${p.status}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 mb-4" style={{ fontSize: '0.875rem' }}>{p.desc}</p>
                <div className="flex justify-between items-center text-xs mono">
                  <span className="text-slate-500">REL: {p.version}</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    Open Lab <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box" style={{ marginBottom: 0 }}>
                <selectedProject.icon size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                <div className="mono text-xs text-slate-500">System_ID: {selectedProject.id} | Ver: {selectedProject.version}</div>
              </div>
            </div>

            <div className="grid md-grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 mono">Research_Objective</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.objective}</p>
              </div>
              <div>
                <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 mono">Simulation_State</h4>
                <div className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex-1 text-center">
                    <div className="text-xs text-slate-500 mb-1">Status</div>
                    <div className={`text-xs font-bold status-${selectedProject.status}`}>{selectedProject.status.toUpperCase()}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex-1 text-center">
                    <div className="text-xs text-slate-500 mb-1">License</div>
                    <div className="text-xs font-bold">MIT-OPEN</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 mono">Archive_Entry</h4>
              <div className="archive-entry">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical size={14} />
                  <span className="font-bold">OBSERVATION:</span>
                </div>
                <p className="mb-4">{selectedProject.observation}</p>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={14} />
                  <span className="font-bold">CONCLUSION:</span>
                </div>
                <p>{selectedProject.conclusion}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={selectedProject.githubUrl} className="btn-primary flex-1 justify-center">
                <Globe size={18} /> View Repository
              </a>
              <button className="btn-secondary flex-1 justify-center flex items-center gap-2">
                <FileText size={18} /> Lab Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Joining Section */}
      <section id="join" className="bg-cyan-500 text-slate-900">
        <div className="container">
          <div className="grid lg-grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Initialize Membership</h2>
              <p className="font-medium mb-8">
                Ready to daily drive Linux and master the art of simulation? Join the knowledge pipeline and start contributing to open-source science.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} />
                  <span className="font-bold">Growth Mindset Mandatory</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} />
                  <span className="font-bold">WSL/Linux Environment Required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} />
                  <span className="font-bold">Commitment to Scientific Rigor</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 text-white">
              <h3 className="text-xl font-bold mb-6">Manifest Interest</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid md-grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs mono text-slate-500">NAME</label>
                    <input type="text" className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none" placeholder="Felix Wayne" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs mono text-slate-500">GITHUB_USER</label>
                    <input type="text" className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none" placeholder="synapse-dot" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs mono text-slate-500">DOMAIN_OF_INTEREST</label>
                  <select className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none">
                    <option>Physics Simulation</option>
                    <option>Biological Systems</option>
                    <option>Financial Modeling</option>
                    <option>Climate Systems</option>
                  </select>
                </div>
                <button className="btn-primary w-full justify-center mt-4">
                  Submit Manifest
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum (The SMS Way) */}
      <section id="curriculum">
        <div className="container">
          <div className="grid lg-grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <GraduationCap className="text-cyan-400" size={24} /> The Knowledge Pipeline
              </h2>
              <div className="flex flex-col gap-8">
                <div className="learning-step">
                  <div className="step-number">1</div>
                  <div>
                    <h3 className="font-bold mb-2">Beginner: Logic & Git</h3>
                    <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>Mastering Python simulation basics and the branching workflow. Learning to document while coding.</p>
                  </div>
                </div>
                <div className="learning-step">
                  <div className="step-number">2</div>
                  <div>
                    <h3 className="font-bold mb-2">Intermediate: Hardware & C++</h3>
                    <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>Migrating to C++ for performance. Understanding memory management and spatial optimization (Quadtrees/Octrees).</p>
                  </div>
                </div>
                <div className="learning-step">
                  <div className="step-number">3</div>
                  <div>
                    <h3 className="font-bold mb-2">Expertise: Legacy Systems</h3>
                    <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>The FORTRAN challenge. Maintaining and migrating high-performance legacy code for modern architectures.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ background: 'rgba(30, 41, 59, 0.3)' }}>
              <h3 className="text-cyan-400 mb-6 mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Protocol_Handbook.md</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex gap-4">
                  <Terminal className="text-cyan-400" size={20} />
                  <div>
                    <div className="font-bold">AI Usage Policy</div>
                    <div className="text-slate-500 text-xs">Limited to debugging. No generated logic for core math modules.</div>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex gap-4">
                  <Globe className="text-cyan-400" size={20} />
                  <div>
                    <div className="font-bold">Daily Driving Linux</div>
                    <div className="text-slate-500 text-xs">All members encouraged to use WSL or Linux distros for parity.</div>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex gap-4">
                  <Code2 className="text-cyan-400" size={20} />
                  <div>
                    <div className="font-bold">Version Converge</div>
                    <div className="text-slate-500 text-xs">Project releases must converge to special numbers (&pi;, e).</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-y" style={{ borderBottom: 'none' }}>
        <div className="container flex flex-col md-flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Atom className="text-cyan-400" size={24} />
            <span className="font-bold mono">SMS</span>
          </div>
          <p className="text-slate-500" style={{ fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} Simulation & Modeling Society. Directed by Felix A. Wayne.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/synapse-dot/mcsms.github.io" className="text-slate-500 hover:text-cyan-400">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 767px) {
          .hide-mobile { display: none; }
          .text-5xl { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
