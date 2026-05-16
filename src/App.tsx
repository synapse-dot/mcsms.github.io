import { useState } from 'react';
import { 
  Atom, 
  Globe, 
  Terminal,
  ChevronRight,
  Database,
  Users,
  X,
  ClipboardCheck,
  GitPullRequest,
  CheckCircle2,
  FileText,
  FlaskConical,
  Box,
  Plus
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
    title: "3D Projectile Visualizer", 
    desc: "A comprehensive 3D simulation of kinematics in varying atmospheric conditions.", 
    status: 'stable',
    version: '1.0.0',
    objective: "Model and visualize projectile motion in 3D space with adjustable air resistance.",
    observation: "High-velocity simulations reveal significant deviations from parabolic paths.",
    conclusion: "Numerical integration remains accurate for sub-sonic speeds.",
    githubUrl: "https://github.com/synapse-dot/3DProjectiles"
  },
  { 
    id: 'physx',
    title: "PhysX Engine Prototype", 
    desc: "Custom physics engine exploring N-body interactions and collision manifolds.", 
    status: 'research',
    version: '0.5.0-alpha',
    objective: "Develop a modular physics engine for elastic collisions.",
    observation: "Narrow-phase collision detection is the primary bottleneck.",
    conclusion: "Spatial partitioning is required for scaling beyond 100 bodies.",
    githubUrl: "https://github.com/synapse-dot/PhysX"
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'lab'>('home');

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav sticky top-0 z-50">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <Atom className="text-cyan-400" size={32} />
            <span className="text-xl font-bold mono">SMS</span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-8 hide-mobile">
              <a href="#onboarding" onClick={() => setActiveTab('home')} className="text-slate-400">Start Here</a>
              <button onClick={() => setActiveTab('lab')} className={`mono text-sm ${activeTab === 'lab' ? 'text-cyan-400' : 'text-slate-400'} hover:text-cyan-400`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>[RESEARCH_LAB]</button>
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

      {activeTab === 'home' ? (
        <>
          {/* Hero Section */}
          <header id="about" className="relative pt-20 pb-32">
            <div className="container relative z-10">
              <div style={{ maxWidth: '800px' }}>
                <div className="badge mb-6">Simulation & Modeling Society</div>
                <h1 className="text-5xl font-bold mb-6 hero-title">
                  Scientific <br />
                  <span className="text-cyan-400">Software Engineering</span>
                </h1>
                <p className="text-xl text-slate-400 mb-8" style={{ maxWidth: '600px' }}>
                  A research-oriented student collective building high-fidelity simulations of complex systems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveTab('lab')} className="btn-primary">
                    Enter Research Lab <FlaskConical size={20} />
                  </button>
                  <a href="#onboarding" className="btn-secondary">
                    Onboarding Path
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute" style={{ top: '50%', right: '-10%', transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none' }}>
              <Terminal size={600} />
            </div>
          </header>

          {/* Onboarding Section */}
          <section id="onboarding" className="bg-slate-800-half border-y">
            <div className="container">
              <h2 className="text-xl font-bold mb-12 flex items-center gap-3">
                <ClipboardCheck className="text-cyan-400" size={28} /> Onboarding Pipeline
              </h2>
              <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-8">
                <div className="onboarding-card">
                  <div className="step-circle">1</div>
                  <h3 className="font-bold mb-3">Initialize Interest</h3>
                  <p className="text-slate-400 text-sm mb-4">Manifest your domain of interest and join a peer-learning group.</p>
                  <a href="#join" className="text-cyan-400 text-sm font-bold flex items-center gap-1 hover:underline">
                    Access Form <ChevronRight size={14} />
                  </a>
                </div>
                <div className="onboarding-card" style={{ borderLeftColor: '#f59e0b' }}>
                  <div className="step-circle" style={{ background: '#f59e0b' }}>2</div>
                  <h3 className="font-bold mb-3">Complete First Lab</h3>
                  <p className="text-slate-400 text-sm mb-4">Clone a starter simulation and solve the mathematical implementation challenge.</p>
                  <div className="mono text-xs text-slate-500 bg-black/30 p-2 rounded">git clone mcsms/starter-lab</div>
                </div>
                <div className="onboarding-card" style={{ borderLeftColor: '#10b981' }}>
                  <div className="step-circle" style={{ background: '#10b981' }}>3</div>
                  <h3 className="font-bold mb-3">Commit Research</h3>
                  <p className="text-slate-400 text-sm mb-4">Submit your PR and document your findings to achieve Member Level 1.</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-success">
                    <GitPullRequest size={14} /> SYSTEM_ACCESS_GRANTED
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Join Section */}
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
                  </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 text-white">
                  <h3 className="text-xl font-bold mb-6">Manifest Interest</h3>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const studentClass = formData.get('class');
                    const github = formData.get('github');
                    const domain = formData.get('domain');
                    
                    const body = `### New Member Manifest\n\n**Name:** ${name}\n**Class/Grade:** ${studentClass}\n**GitHub:** @${github}\n**Interest Area:** ${domain}\n\n---\n*Sent via mcsms.github.io portal*`;
                    const title = `Access Request: ${name} (@${github})`;
                    const url = `https://github.com/synapse-dot/mcsms.github.io/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
                    
                    window.open(url, '_blank');
                  }}>
                    <div className="grid md-grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs mono text-slate-500">NAME</label>
                        <input name="name" required type="text" className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none" placeholder="Felix Wayne" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs mono text-slate-500">CLASS / GRADE</label>
                        <input name="class" required type="text" className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none" placeholder="10-C" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs mono text-slate-500">GITHUB_USER</label>
                      <input name="github" required type="text" className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none" placeholder="synapse-dot" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs mono text-slate-500">DOMAIN_OF_INTEREST</label>
                      <select name="domain" className="bg-slate-800 border border-slate-700 rounded p-2 text-sm focus:border-cyan-400 outline-none">
                        <option>Physics Simulation</option>
                        <option>Biological Systems</option>
                        <option>Financial Modeling</option>
                        <option>Climate Systems</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center mt-4">
                      Submit Manifest <ChevronRight size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Research Lab View */
        <section id="projects" className="pt-12 pb-32">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Database className="text-cyan-400" size={32} /> Research Archive
                </h2>
                <p className="text-slate-400">Formal documentation of all society-approved simulations.</p>
              </div>
              <button 
                onClick={() => {
                  const title = "Propose New Project";
                  const body = "### Project Proposal\n\n**Project Name:**\n**Description:**\n**GitHub Repo URL:**\n**Research Objective:**\n\n---";
                  window.open(`https://github.com/synapse-dot/mcsms.github.io/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`, '_blank');
                }}
                className="btn-primary"
              >
                <Plus size={18} /> Propose Project
              </button>
            </div>
            
            <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-6">
              {initialProjects.map((p) => (
                <div key={p.id} className="card" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="icon-box" style={{ marginBottom: 0 }}>
                      <Box size={24} />
                    </div>
                    <span className={`status-tag status-${p.status}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-slate-400 mb-4" style={{ fontSize: '0.875rem' }}>{p.desc}</p>
                  <div className="flex justify-between items-center text-xs mono">
                    <span className="text-slate-500">VER: {p.version}</span>
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      Explore Lab <ChevronRight size={14} />
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
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box" style={{ marginBottom: 0 }}>
                <Box size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                <div className="mono text-xs text-slate-500">ID: {selectedProject.id} | Stable_Version: {selectedProject.version}</div>
              </div>
            </div>

            <div className="grid md-grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 mono">Objective</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.objective}</p>
              </div>
              <div>
                <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 mono">Status_Vector</h4>
                <div className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex-1 text-center">
                    <div className="text-xs text-slate-500 mb-1">State</div>
                    <div className={`text-xs font-bold status-${selectedProject.status}`}>{selectedProject.status.toUpperCase()}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex-1 text-center">
                    <div className="text-xs text-slate-500 mb-1">Source</div>
                    <div className="text-xs font-bold">GITHUB_OSS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 mono">Research_Findings</h4>
              <div className="archive-entry">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical size={14} />
                  <span className="font-bold">OBSERVATION_LOG:</span>
                </div>
                <p className="mb-4">{selectedProject.observation}</p>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={14} />
                  <span className="font-bold">VALIDATED_CONCLUSION:</span>
                </div>
                <p>{selectedProject.conclusion}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center">
                <Globe size={18} /> View Repository
              </a>
              <button className="btn-secondary flex-1 justify-center flex items-center gap-2">
                <FileText size={18} /> Lab Report
              </button>
            </div>
            
            {/* Discussion Section Placeholder */}
            <div className="mt-12 pt-8 border-y border-slate-700">
              <h4 className="text-xs font-bold text-slate-500 mb-4 mono uppercase">Society_Discussion</h4>
              <div className="bg-slate-900/50 p-6 rounded-xl text-center border border-dashed border-slate-700">
                <p className="text-sm text-slate-500 mb-4">Peer reviews and comments are managed via GitHub Issues.</p>
                <a 
                  href={`${selectedProject.githubUrl}/issues`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 text-sm font-bold flex items-center justify-center gap-2 hover:underline"
                >
                  <Users size={16} /> Open Peer Review Thread <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-y" style={{ borderBottom: 'none' }}>
        <div className="container flex flex-col md-flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Atom className="text-cyan-400" size={24} />
            <span className="font-bold mono">SMS</span>
          </div>
          <p className="text-slate-500" style={{ fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} Maliyadeva College Simulation & Modeling Society.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/synapse-dot/mcsms.github.io" className="text-slate-500 hover:text-cyan-400">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
