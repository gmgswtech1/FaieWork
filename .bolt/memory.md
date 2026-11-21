# Project memory

## Product intent & audience

- FairWork Ethiopia — a job/freelance marketplace landing page connecting Ethiopian workers with employers.
- Dual audience: job seekers ("Find Work") and employers/businesses ("Hire a Worker").
- Core value props: trust, safety, fair work, and support.

## Brand personality & voice

- Professional, trustworthy, socially-conscious tone.
- Emphasis on fairness, safety, and opportunity in the Ethiopian labor market.
- Accessible and clear; production-quality polish over novelty.

## Visual design & UX direction

- Responsive layout: desktop nav + mobile nav; smooth scrolling.
- Sections: hero (with CTA actions), trust/safety/support feature cards, about/values, featured job cards, employer CTA, contact footer.
- Lucide React icons for all iconography and logos.
- Tailwind CSS utility classes for styling; hover effects and transitions on interactive elements.
- Accessible form controls throughout.
- Real stock photography used for hero imagery (relevant, non-generic).
- Footer displays owner's Gmail as a clickable email link.

## Decisions, constraints & rationale

- Framework: vite-react with JSX, Tailwind CSS, Lucide React. No extra UI/icon/theme packages installed unless explicitly requested.
- Path alias `@/` → `src/` used for all project imports; deep relative paths avoided.
- Working interactive forms implemented: find work, hire a worker, contact, login, registration — wired as visible navigation/action flows.
- Owner contact email: `guyo.gmgsw1@gmail.com`. Contact form submissions open a pre-filled `mailto:` message to that address (includes visitor name and message).
- Project builds cleanly and passes type checks and code-quality checks.

## Open questions & assumptions

- Reference image was the source of required functions/features; specific image details were interpreted from assistant's build, not directly available in text.
- Login/registration forms are front-end only; no backend/auth integration confirmed.
- Job listings are static/sample data; no job board data source confirmed.
- Contact uses `mailto:` only; no backend form handler or SMTP integration confirmed.
- Content copy (values, job titles) was inferred — may need review against actual brand messaging.