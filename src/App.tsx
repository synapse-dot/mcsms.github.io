import { useState } from 'react';
import { 
  Atom, 
  Globe, 
  ChevronRight,
  Users,
  X,
  FlaskConical,
  Box,
  Plus,
  ArrowRight,
  Code,
  Binary,
  Cpu,
  FileText,
  Activity,
  Lightbulb,
  ClipboardCheck
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

const initialProjects: Project[] = [
  { 
    id: '3d-projectiles',
    title: "3D Projectile Simulator", 
    desc: "A C++ program that simulates 3D projectile motion with gravity and air resistance, featuring OpenGL-based 3D animation.", 
    status: 'stable',
    version: '1.0.0',
    problemStatement: "Modeling accurate 3D kinematics for high-velocity objects where air resistance and wind vectors cannot be ignored.",
    mathModel: "Second-order ODEs including Drag force F_d = -1/2 * ρ * v^2 * C_d * A and Magnus effect for spinning bodies.",
    simulationApproach: "Numerical solution via Euler Integration with a variable time-step to ensure stability in high-drag regions.",
    observations: "Lateral wind components create non-parabolic displacement; drag significantly shortens terminal range vs vacuum models.",
    conclusion: "Numerical integration matches analytical models for low speeds but is essential for capturing non-linear atmospheric effects.",
    githubUrl: "https://github.com/synapse-dot/3DProjectiles"
  },
  { 
    id: 'physx',
    title: "Interactive Gravitational Lensing", 
    desc: "An educational application simulating light-ray deflection by massive objects (black holes) using numerical integration.", 
    status: 'stable',
    version: '1.0.0',
    problemStatement: "Visualizing the non-intuitive bending of light rays as they pass through the curved space-time of massive stellar objects.",
    mathModel: "Point-mass deflection angle α = 4GM / (c² b), where G is gravitational constant, M is mass, and b is impact parameter.",
    simulationApproach: "Accumulating infinitesimal deflections along the light-ray path using a 4th-order Runge-Kutta integrator for high precision.",
    observations: "Formation of Einstein rings and multiple imaging occurs when the source, lens, and observer are perfectly aligned.",
    conclusion: "Computational models successfully reproduce the optical phenomena predicted by General Relativity in a real-time environment.",
    githubUrl: "https://github.com/synapse-dot/PhysX"
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'lab'>('home');

  return (
    <div className="min-h-screen">
      <nav className="nav">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <Atom className="text-emerald-500" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter">SMS</span>
          </div>
          
          <div className="flex gap-8 items-center">
            <div className="flex gap-8 hide-mobile">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`mono text-xs uppercase tracking-widest bg-transparent border-none cursor-pointer ${activeTab === 'home' ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}
              >
                // Home
              </button>
              <button 
                onClick={() => setActiveTab('lab')} 
                className={`mono text-xs uppercase tracking-widest bg-transparent border-none cursor-pointer ${activeTab === 'lab' ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}
              >
                // Research Lab
              </button>
            </div>
            <a 
              href="https://github.com/synapse-dot/mcsms.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
            >
              <Globe size={14} /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {activeTab === 'home' ? (
        <>
          <header className="container pt-40 pb-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-md text-[10px] font-bold mb-6 border border-emerald-500/20 uppercase tracking-widest">
                System_Status: Operational
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                The Art of <br />
                <span className="text-emerald-500">Computer Simulation</span>
              </h1>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
                A research collective modeling the world's most fascinating phenomena through numerical integration, mathematical rigor, and open-source collaboration.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setActiveTab('lab')} className="btn btn-primary">
                  Access Research Archive <ArrowRight size={18} />
                </button>
                <a href="#onboarding" className="btn btn-ghost">
                  Explore Onboarding
                </a>
              </div>
            </div>
          </header>

          <section id="onboarding" className="container py-24 border-t border-white/5">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 tracking-tight">Onboarding Membership</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                      <Binary className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Growth Mindset</h3>
                      <p className="text-slate-400 text-sm">Be ready to master Python, C++, and legacy FORTRAN to keep the engine room of simulation science running.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                      <Cpu className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Linux Environment</h3>
                      <p className="text-slate-400 text-sm">We daily drive Linux and WSL for parity. Master the command line to master the machine.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="video-container">
                <video controls poster="/public/icons.svg">
                  <source src="/mcsms.github.io/Simulation_Society_Intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>

          <section className="container py-24 border-t border-white/5">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-4xl font-bold mb-8 tracking-tight">The SMS Workflow</h2>
                <p className="text-slate-400 text-lg mb-12">We follow the strict scientific method for every project artifact.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Lightbulb, title: "Hypothesis", text: "Identify the problem" },
                    { icon: Code, title: "Math Model", text: "Define the equations" },
                    { icon: Activity, title: "Simulation", text: "Numerical execution" },
                    { icon: ClipboardCheck, title: "Observation", text: "Record the results" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <item.icon className="text-emerald-500 mb-4" size={24} />
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card border-emerald-500/20 shadow-2xl">
                <h3 className="text-2xl font-bold mb-8 tracking-tight">Society Access Request</h3>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="mono text-[10px] text-slate-500 uppercase">Member_Name</label>
                      <input name="name" required placeholder="Felix Wayne" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="mono text-[10px] text-slate-500 uppercase">Class_Grade</label>
                      <input name="class" required placeholder="10-C" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="mono text-[10px] text-slate-500 uppercase">Github_Handle</label>
                    <input name="github" required placeholder="synapse-dot" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="mono text-[10px] text-slate-500 uppercase">Research_Interest</label>
                    <select name="domain">
                      <option>Physics Simulation</option>
                      <option>Biological Modeling</option>
                      <option>Stochastic Finance</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-full justify-center">
                    Submit Access Request
                  </button>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="container pt-32 pb-24">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black mb-4 tracking-tighter">Research Archive</h2>
              <p className="text-slate-400 text-lg">Formal peer-reviewed simulation documentation.</p>
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
          
          <div className="bento-grid">
            {initialProjects.map((p) => (
              <div key={p.id} className="card group cursor-pointer" onClick={() => setSelectedProject(p)}>
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500">
                    <Box size={24} />
                  </div>
                  <div className={`mono text-[10px] font-bold px-2 py-1 rounded border ${p.status === 'stable' ? 'border-emerald-500/50 text-emerald-500' : 'border-amber-500/50 text-amber-500'}`}>
                    {p.status.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-emerald-500 transition-colors">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-12 line-clamp-3">{p.desc}</p>
                <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
                  <div className="mono text-[10px] text-slate-500 font-bold uppercase tracking-widest">Release: {p.version}</div>
                  <span className="text-emerald-500 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Lab Report <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedProject && (
        <div className="report-overlay" onClick={() => setSelectedProject(null)}>
          <div className="report-modal" onClick={e => e.stopPropagation()}>
            <div className="report-header">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-6">
                  <div className="bg-emerald-500/10 p-4 rounded-3xl text-emerald-500 border border-emerald-500/20">
                    <Box size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter mb-1">{selectedProject.title}</h2>
                    <div className="mono text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Lab_Report // ID: {selectedProject.id}</div>
                  </div>
                </div>
                <button className="bg-white/5 p-2 rounded-full text-slate-500 hover:text-white transition-colors border-none cursor-pointer" onClick={() => setSelectedProject(null)}>
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="report-body">
              <div className="method-step">
                <div className="method-label"><Lightbulb size={12}/> Problem Statement</div>
                <p className="method-content">{selectedProject.problemStatement}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="method-step">
                  <div className="method-label"><Code size={12}/> Mathematical Model</div>
                  <p className="method-content mono text-sm bg-black/40 p-4 rounded-xl border border-white/5">{selectedProject.mathModel}</p>
                </div>
                <div className="method-step">
                  <div className="method-label"><Activity size={12}/> Simulation Approach</div>
                  <p className="method-content">{selectedProject.simulationApproach}</p>
                </div>
              </div>

              <div className="method-step">
                <div className="method-label"><FlaskConical size={12}/> Research Findings</div>
                <div className="finding-box">
                  <div className="text-[10px] font-bold text-emerald-500 mb-2 uppercase tracking-widest">Observations</div>
                  <p className="text-slate-300 mb-6">{selectedProject.observations}</p>
                  <div className="text-[10px] font-bold text-emerald-500 mb-2 uppercase tracking-widest">Verified Conclusion</div>
                  <p className="text-emerald-50/90 font-medium">{selectedProject.conclusion}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-12 border-t border-white/5">
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 justify-center">
                  <Globe size={18} /> View Source Code
                </a>
                <a href={`${selectedProject.githubUrl}/issues`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 justify-center">
                  <Users size={18} /> Peer Discussion
                </a>
                <button className="btn btn-ghost flex-1 justify-center">
                  <FileText size={18} /> Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="container py-24 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <Atom className="text-emerald-500" size={24} />
            <span className="font-bold tracking-tighter">SMS</span>
          </div>
          <p className="text-slate-500 text-sm mono">
            &copy; {new Date().getFullYear()} Simulation & Modeling Society. // RESEARCH_LEVEL_01
          </p>
          <div className="flex gap-8">
            <a href="https://github.com/synapse-dot/mcsms.github.io" className="text-slate-500 hover:text-emerald-500">
              <Globe size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
