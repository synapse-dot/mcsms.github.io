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
  Users
} from 'lucide-react';

function App() {
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
              <a href="#about" className="text-slate-400">About</a>
              <a href="#projects" className="text-slate-400">Projects</a>
              <a href="#curriculum" className="text-slate-400">Curriculum</a>
            </div>
            <a 
              href="https://github.com" 
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
              The Art of <br />
              <span className="text-cyan-400">Computer Simulation</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8" style={{ maxWidth: '600px' }}>
              Explore complex systems through code. From projectile motion to climate change, we build, version, and document the world's most fascinating phenomena.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">
                Join the Pipeline <Rocket size={20} />
              </button>
              <button className="btn-secondary">
                Explore Projects
              </button>
            </div>
          </div>
        </div>
        <div className="absolute" style={{ top: '50%', right: '-10%', transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none' }}>
          <Terminal size={600} />
        </div>
      </header>

      {/* Projects Grid */}
      <section id="projects" className="bg-slate-800-half border-y">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Layers className="text-cyan-400" size={24} /> Core Projects
              </h2>
              <p className="text-slate-400">Our milestones: From mathematical foundations to complex systems.</p>
            </div>
            <div className="text-cyan-400 mono text-sm hide-mobile">
              ver_1.0.0_stable
            </div>
          </div>
          
          <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-6">
            {[
              { title: "Projectile Motion", desc: "Foundational kinematics and visualization of Newtonian physics.", icon: Rocket },
              { title: "Gravitational Lensing", desc: "Visualizing the curvature of space-time around massive bodies.", icon: Atom },
              { title: "Physics Engine", desc: "Developing a custom prototype for real-time particle interaction.", icon: Cpu },
              { title: "COVID-19 Spread", desc: "Modeling disease propagation using epidemiological algorithms.", icon: Users },
              { title: "Particle Collision", desc: "Simulating elastic and inelastic interactions at the micro-scale.", icon: Globe },
              { title: "Climate Change", desc: "Atmospheric modeling and long-term trend analysis.", icon: LineChart },
            ].map((p, i) => (
              <div key={i} className="card">
                <div className="icon-box">
                  <p.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 mb-4" style={{ fontSize: '0.875rem' }}>{p.desc}</p>
                <div className="flex items-center text-cyan-400 font-bold" style={{ fontSize: '0.875rem' }}>
                  View Repository <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Experience */}
      <section id="curriculum">
        <div className="container">
          <div className="grid lg-grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold mb-8">The Learning Pipeline</h2>
              <div className="flex flex-col gap-8">
                <div className="learning-step">
                  <div className="step-number">1</div>
                  <div>
                    <h3 className="font-bold mb-2">Beginner: Foundation</h3>
                    <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>Python & Git basics. Join a project and learn through peer interaction and expert guidance.</p>
                  </div>
                </div>
                <div className="learning-step">
                  <div className="step-number">2</div>
                  <div>
                    <h3 className="font-bold mb-2">Intermediate: Optimization</h3>
                    <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>Migrating critical paths to C++. Understanding performance bottlenecks and hardware utilization.</p>
                  </div>
                </div>
                <div className="learning-step">
                  <div className="step-number">3</div>
                  <div>
                    <h3 className="font-bold mb-2">Expertise: Legacy & Design</h3>
                    <p className="text-slate-400" style={{ fontSize: '0.875rem' }}>Exploring FORTRAN legacy systems and architecting multi-language simulation frameworks.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ background: 'rgba(30, 41, 59, 0.3)' }}>
              <h3 className="text-cyan-400 mb-6 mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stack_manifest.json</h3>
              <div className="grid md-grid-cols-2 gap-4">
                {[
                  { name: "Python", val: "Main entry point", icon: Code2 },
                  { name: "C++", val: "Performance", icon: Terminal },
                  { name: "FORTRAN", val: "Legacy Systems", icon: Database },
                  { name: "NumPy", val: "Mathematics", icon: Search },
                ].map((s, i) => (
                  <div key={i} className="stack-card">
                    <s.icon className="text-cyan-400 mb-2" size={20} />
                    <div className="font-bold" style={{ fontSize: '0.875rem' }}>{s.name}</div>
                    <div className="text-slate-500" style={{ fontSize: '0.75rem' }}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-y" style={{ borderBottom: 'none' }}>
                <div className="flex items-center gap-2 text-slate-400" style={{ fontSize: '0.875rem' }}>
                  <GraduationCap className="text-cyan-400" size={18} />
                  <span>Emphasis on growth mindset & open-source contribution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visibility Section */}
      <section className="visibility-cta">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="text-xl font-bold mb-4">Visible Science</h2>
            <p className="mb-8" style={{ fontWeight: 500 }}>
              "What has your club done?" — We answer with public repositories, interactive simulations, and a rigorous archive of documentation.
            </p>
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div style={{ background: 'var(--bg-dark)', color: 'var(--accent)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe size={24} />
                </div>
                <span className="mono" style={{ fontSize: '0.7rem', fontWeight: 700 }}>GITHUB</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div style={{ background: 'var(--bg-dark)', color: 'var(--accent)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe size={24} />
                </div>
                <span className="mono" style={{ fontSize: '0.7rem', fontWeight: 700 }}>DEMOS</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div style={{ background: 'var(--bg-dark)', color: 'var(--accent)', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Database size={24} />
                </div>
                <span className="mono" style={{ fontSize: '0.7rem', fontWeight: 700 }}>ARCHIVE</span>
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
            &copy; {new Date().getFullYear()} Simulation & Modeling Society. Crafted by Felix A. Wayne.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-cyan-400">
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
