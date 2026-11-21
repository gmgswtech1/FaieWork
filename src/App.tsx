import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleHelp,
  HeartHandshake,
  House,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';

type DialogType = 'find' | 'hire' | 'login' | 'register' | 'contact' | null;

const CONTACT_EMAIL = 'guyo.gmgsw1@gmail.com';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Jobs', href: '#jobs' },
  { label: 'For Employers', href: '#employers' },
  { label: 'Contact', href: '#contact' },
];

const benefits = [
  { icon: BriefcaseBusiness, title: 'Find Trusted', detail: 'Opportunities', tone: 'blue' },
  { icon: ShieldCheck, title: 'Keep Employment', detail: 'Records', tone: 'teal' },
  { icon: UsersRound, title: 'Get Support &', detail: 'Report Concerns', tone: 'gold' },
];

const jobs = [
  { title: 'Housekeeper', location: 'Bole, Addis Ababa', type: 'Full-time', salary: 'ETB 5,500–7,000' },
  { title: 'Nanny & Childcare', location: 'Kazanchis, Addis Ababa', type: 'Live-out', salary: 'ETB 6,000–8,500' },
  { title: 'Home Cook', location: 'CMC, Addis Ababa', type: 'Part-time', salary: 'ETB 4,000–5,500' },
];

function App() {
  const [dialog, setDialog] = useState<DialogType>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openDialog = (type: Exclude<DialogType, null>) => {
    setDialog(type);
    setSubmitted(false);
    setMenuOpen(false);
  };

  const closeDialog = () => setDialog(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfcfd] text-[#102b58]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Amana home">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#e6f7f5] text-[#008f87]">
              <House size={26} strokeWidth={2.2} />
              <div className="absolute bottom-2 h-2 w-2 rounded-full bg-[#f4b31b]" />
            </div>
            <div className="leading-none">
              <div className="text-[23px] font-extrabold tracking-[-0.05em] text-[#123b72]">Amana</div>
              <div className="mt-1 text-[19px] font-bold tracking-[-0.04em] text-[#058c87]">Ethiopia</div>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} onClick={(event) => { if (item.label === 'Contact') { event.preventDefault(); openDialog('contact'); } }} className={`rounded-full px-5 py-3 text-[15px] font-semibold transition ${index === 0 ? 'bg-[#e5efff] text-[#123f7b]' : 'text-[#1b3156] hover:bg-slate-100'}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button onClick={() => openDialog('login')} className="rounded-full border-2 border-[#123f7b] px-6 py-2.5 text-[15px] font-bold text-[#123f7b] transition hover:bg-[#123f7b] hover:text-white">Login</button>
            <button onClick={() => openDialog('register')} className="rounded-full bg-[#07978e] px-6 py-2.5 text-[15px] font-bold text-white shadow-[0_7px_16px_rgba(7,151,142,0.2)] transition hover:-translate-y-0.5 hover:bg-[#057e78]">Register</button>
          </div>

          <button className="rounded-lg p-2 text-[#123f7b] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden"><div className="flex flex-col gap-2">{navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => { setMenuOpen(false); if (item.label === 'Contact') { event.preventDefault(); openDialog('contact'); } }} className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50">{item.label}</a>)}<div className="mt-2 flex gap-3 border-t border-slate-100 pt-4"><button onClick={() => openDialog('login')} className="flex-1 rounded-full border border-[#123f7b] py-2 font-bold">Login</button><button onClick={() => openDialog('register')} className="flex-1 rounded-full bg-[#07978e] py-2 font-bold text-white">Register</button></div></div></div>}
      </header>

      <main>
        <section id="home" className="relative isolate overflow-hidden bg-white pt-[82px]">
          <div className="mx-auto grid min-h-[620px] max-w-[1240px] items-center gap-8 px-5 py-16 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-20">
            <div className="relative z-10 max-w-[660px]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9e8e2] bg-[#effcf9] px-4 py-2 text-sm font-bold text-[#058c87]"><Sparkles size={15} /> Fair work starts with trust</div>
              <h1 className="text-[clamp(3.5rem,7vw,6.35rem)] font-extrabold leading-[0.93] tracking-[-0.065em] text-[#123f7b]">Fair Work.<br />Safe Homes.<br /><span className="text-[#07978e]">A Better Future.</span></h1>
              <div className="mt-5 h-2 w-52 -rotate-2 rounded-full bg-[#f5b51b]" />
              <p className="mt-7 max-w-[590px] text-lg leading-8 text-[#4f607b]">Connecting domestic workers with meaningful opportunities while promoting fair employment and safety.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => openDialog('find')} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#124781] px-7 py-4 text-base font-bold text-white shadow-[0_10px_22px_rgba(18,71,129,0.2)] transition hover:-translate-y-1 hover:bg-[#0d3767]"><Search size={21} /> Find Work <ArrowRight size={17} className="transition group-hover:translate-x-1" /></button>
                <button onClick={() => openDialog('hire')} className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#124781] px-7 py-4 text-base font-bold text-[#124781] transition hover:bg-[#edf4ff]"><BriefcaseBusiness size={20} /> Hire a Worker</button>
              </div>
            </div>
            <div className="hero-visual relative mx-auto mt-4 h-[460px] w-full max-w-[530px] overflow-hidden rounded-[48%_48%_0_0] bg-[#e5f3f3] lg:mt-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_28%,#fff_0,transparent_23%),linear-gradient(145deg,#eef9f8_10%,#d2eeeb_55%,#b9ddd9)]" />
              <div className="absolute right-[14%] top-[12%] h-44 w-44 rounded-full bg-[#f6d4b7] shadow-[inset_-14px_-6px_0_rgba(183,110,68,0.1)]" />
              <div className="absolute right-[13%] top-[9%] h-20 w-48 -rotate-12 rounded-[50%] bg-[#123f7b] opacity-90" />
              <div className="absolute right-[8%] top-[27%] h-64 w-52 rounded-t-[46%] bg-[#f8f4ef] shadow-[-16px_0_0_#0d3767]" />
              <div className="absolute bottom-0 right-[8%] h-52 w-64 rounded-t-[50%] bg-[#123f7b]" />
              <div className="absolute bottom-0 left-[8%] h-48 w-48 rounded-full bg-[#f4b31b]/70 blur-3xl" />
              <div className="absolute bottom-8 left-7 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-xl backdrop-blur"><div className="flex items-center gap-2 text-sm font-bold text-[#123f7b]"><Check size={17} className="rounded-full bg-[#07978e] p-0.5 text-white" /> Verified opportunities</div></div>
            </div>
          </div>
          <div className="mx-auto grid max-w-[1240px] gap-4 px-5 pb-10 lg:grid-cols-3 lg:px-8">
            {benefits.map(({ icon: Icon, title, detail, tone }) => <div key={title} className="flex items-center gap-5 rounded-3xl border border-[#e2e9f2] bg-white p-5 shadow-[0_8px_30px_rgba(18,63,123,0.04)] transition hover:-translate-y-1 hover:shadow-lg"><div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${tone === 'blue' ? 'bg-[#e6f0ff] text-[#123f7b]' : tone === 'teal' ? 'bg-[#dcf7f4] text-[#07978e]' : 'bg-[#fff0d9] text-[#e98a00]'}`}><Icon size={29} /></div><div className="text-lg font-bold leading-7 text-[#123f7b]">{title}<br />{detail}</div></div>)}
          </div>
        </section>

        <section id="about" className="bg-[#f5f9fc] px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-[1100px] items-center gap-14 lg:grid-cols-2"><div><p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#07978e]">Why Amana</p><h2 className="text-4xl font-extrabold tracking-[-0.04em] text-[#123f7b] md:text-5xl">Work should feel fair for everyone.</h2><p className="mt-5 text-lg leading-8 text-[#576981]">We help domestic workers and families build respectful, transparent working relationships that last.</p><div className="mt-8 space-y-5"><div className="flex gap-4"><div className="mt-1 text-[#07978e]"><HeartHandshake /></div><div><h3 className="font-bold text-[#123f7b]">People-first support</h3><p className="mt-1 text-[#61728b]">Practical guidance before, during, and after placement.</p></div></div><div className="flex gap-4"><div className="mt-1 text-[#07978e]"><LockKeyhole /></div><div><h3 className="font-bold text-[#123f7b]">Safer by design</h3><p className="mt-1 text-[#61728b]">Clear expectations, records, and a trusted place to raise concerns.</p></div></div></div></div><div className="rounded-[32px] bg-[#123f7b] p-8 text-white shadow-xl"><CircleHelp className="mb-10 text-[#f5b51b]" size={40} /><p className="text-3xl font-extrabold leading-tight">“A good job can change a household. A fair job can change a life.”</p><div className="mt-8 h-px bg-white/20" /><p className="mt-5 text-sm font-semibold text-white/70">Our promise to workers and employers</p></div></div></section>

        <section id="jobs" className="bg-white px-5 py-24 lg:px-8"><div className="mx-auto max-w-[1100px]"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#07978e]">Opportunities</p><h2 className="text-4xl font-extrabold tracking-[-0.04em] text-[#123f7b]">Start your next chapter.</h2></div><button onClick={() => openDialog('find')} className="inline-flex items-center gap-2 font-bold text-[#07978e]">View all jobs <ArrowRight size={17} /></button></div><div className="mt-10 grid gap-4 md:grid-cols-3">{jobs.map((job) => <div key={job.title} className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-[#9dded8] hover:shadow-lg"><div className="flex items-start justify-between"><div className="rounded-xl bg-[#eaf7f5] p-3 text-[#07978e]"><BriefcaseBusiness size={21} /></div><span className="rounded-full bg-[#fff5db] px-3 py-1 text-xs font-bold text-[#a86b00]">{job.type}</span></div><h3 className="mt-5 text-xl font-bold text-[#123f7b]">{job.title}</h3><p className="mt-2 text-sm text-[#738197]">{job.location}</p><div className="mt-5 border-t border-slate-100 pt-4 text-sm font-bold text-[#123f7b]">{job.salary}</div></div>)}</div></div></section>

        <section id="employers" className="bg-[#eaf7f5] px-5 py-20 lg:px-8"><div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#07978e]">For employers</p><h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.04em] text-[#123f7b]">Find the right person for your home.</h2><p className="mt-4 max-w-xl leading-7 text-[#52697a]">Create a clear role, meet trusted candidates, and start with confidence.</p></div><button onClick={() => openDialog('hire')} className="rounded-full bg-[#07978e] px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#057e78]">Get started <ArrowRight className="ml-2 inline" size={17} /></button></div></section>
      </main>

      <footer id="contact" className="bg-[#0d2e59] px-5 py-12 text-white lg:px-8"><div className="mx-auto flex max-w-[1100px] flex-col justify-between gap-8 md:flex-row"><div><div className="text-2xl font-extrabold">Amana <span className="text-[#62d4cc]">Ethiopia</span></div><p className="mt-3 max-w-sm text-sm leading-6 text-white/65">Building safer homes and fairer opportunities, together.</p></div><div className="flex flex-col gap-3 text-sm text-white/75"><button onClick={() => openDialog('contact')} className="text-left transition hover:text-white">Contact our team</button><a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-white">{CONTACT_EMAIL}</a><span> Addis Ababa, Ethiopia</span></div></div><div className="mx-auto mt-10 max-w-[1100px] border-t border-white/15 pt-5 text-xs text-white/50">© 2026 Amana. Fair work starts with trust.</div></footer>

      {dialog && <Dialog type={dialog} submitted={submitted} onSubmit={() => setSubmitted(true)} onClose={closeDialog} />}
    </div>
  );
}

function Dialog({ type, submitted, onSubmit, onClose }: { type: Exclude<DialogType, null>; submitted: boolean; onSubmit: () => void; onClose: () => void }) {
  const copy = { find: ['Find work', 'Tell us what kind of opportunity you are looking for.'], hire: ['Hire a worker', 'Share a few details and we will help you find a great match.'], login: ['Welcome back', 'Log in to manage your Amana journey.'], register: ['Join Amana', 'Create your account and take the next step.'], contact: ['Contact our team', 'Send us a message and we will get back to you soon.'] }[type];
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === 'contact') {
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get('name') ?? '');
      const message = String(formData.get('message') ?? '');
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Amana contact from ${name}`)}&body=${encodeURIComponent(message)}`;
    }
    onSubmit();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071c38]/60 px-5 backdrop-blur-sm" onMouseDown={onClose}><div className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#07978e]">Amana Ethiopia</p><h2 className="mt-2 text-3xl font-extrabold text-[#123f7b]">{copy[0]}</h2><p className="mt-2 text-sm leading-6 text-[#6a7890]">{copy[1]}</p></div><button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><X size={20} /></button></div>{submitted ? <div className="mt-8 rounded-2xl bg-[#eaf7f5] p-6 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#07978e] text-white"><Check /></div><h3 className="mt-4 font-bold text-[#123f7b]">Thanks, we received it.</h3><p className="mt-2 text-sm text-[#5b7180]">Your email app should open with the message ready to send.</p></div> : <form className="mt-7 space-y-4" onSubmit={handleSubmit}><input required name="name" type={type === 'login' ? 'email' : 'text'} placeholder={type === 'login' ? 'Email address' : 'Your name'} className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[#07978e] focus:ring-4 focus:ring-[#07978e]/10" />{type !== 'find' && type !== 'contact' && <input required type={type === 'login' ? 'password' : 'email'} placeholder={type === 'login' ? 'Password' : 'Email address'} className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[#07978e] focus:ring-4 focus:ring-[#07978e]/10" />}{type === 'find' && <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-600 outline-none"><option>Select an opportunity</option><option>Housekeeping</option><option>Childcare</option><option>Cooking</option></select>}{(type === 'hire' || type === 'contact') && <textarea required name={type === 'contact' ? 'message' : undefined} placeholder={type === 'hire' ? 'Tell us about the role' : 'How can we help?'} rows={3} className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-[#07978e] focus:ring-4 focus:ring-[#07978e]/10" />}<button className="w-full rounded-xl bg-[#123f7b] py-3.5 font-bold text-white transition hover:bg-[#0d3767]">Continue <ArrowRight className="ml-1 inline" size={16} /></button></form>}</div></div>;
}

export default App;
