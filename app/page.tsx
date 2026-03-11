import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Wrapper */}
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        {/* HERO */}
        <section
          id="hero"
          className="flex flex-col gap-10 border-b border-slate-800 pb-12 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
              Portfolio
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Atharv <span className="text-sky-400">Joshi</span>
            </h1>
            <p className="text-lg font-medium text-slate-200">
              Aspiring Full-Stack Developer &amp; AI Enthusiast
            </p>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              I'm a third-year Computer Science student focused on full‑stack
              web development, cloud deployment, and AI/ML applications. I enjoy
              taking ideas from prototype to production, integrating modern
              tooling, and writing maintainable, well‑tested code.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-sky-400"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-500 hover:text-sky-300"
              >
                Contact Me
              </a>
              <a
                href="/Atharv-Joshi-Resume.pdf"
                className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                Download Resume
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 sm:text-sm">
              <span>Talsande, Maharashtra, India</span>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <span className="break-all">your.email@example.com</span>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/atharv348"
                  target="_blank"
                  className="underline-offset-2 hover:text-sky-300 hover:underline"
                >
                  GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/atharv-joshi-ai/"
                  target="_blank"
                  className="underline-offset-2 hover:text-sky-300 hover:underline"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="space-y-4 border-b border-slate-800 pb-12"
        >
          <h2 className="text-xl font-semibold text-slate-50">About</h2>
          <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
            I'm a Computer Science undergraduate with hands-on experience
            building full‑stack applications and deploying them using modern
            cloud platforms like Vercel and Render. My work spans REST APIs,
            responsive frontends, and AI/ML integrations, especially in
            health‑tech.
          </p>
          <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
            I enjoy reading documentation, debugging tricky production issues,
            and continuously improving code quality through version control and
            best practices. Currently, I'm exploring how AI and blockchain
            concepts can be combined with web technologies to build reliable,
            user‑centric products.
          </p>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="space-y-6 border-b border-slate-800 pb-12"
        >
          <h2 className="text-xl font-semibold text-slate-50">Skills</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {["JavaScript", "TypeScript", "Python", "C/C++", "Java"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Web &amp; Frameworks
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {["React", "Next.js", "Node.js", "Express", "REST APIs"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Databases
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {["MongoDB", "PostgreSQL", "SQL basics"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                DevOps &amp; Cloud
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {["Git", "GitHub", "Vercel", "Render", "Netlify", "CI/CD basics"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                AI / ML
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {[
                  "Python ML stack",
                  "Model training pipelines",
                  "Evaluation & experimentation",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Other
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {[
                  "Responsive design",
                  "Authentication & authorization",
                  "Debugging",
                  "Documentation",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-50">Projects</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Selected work
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Arogyamitra */}
            <article className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold text-slate-50">
                Arogyamitra – Health-Tech Web Application
              </h3>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
                Full‑stack · Health‑tech
              </p>
              <p className="text-sm text-slate-300">
                Arogyamitra is a full‑stack health‑tech platform that helps
                users manage health information and access relevant
                recommendations through an intuitive web interface. I implemented
                the frontend with React/Next.js and Tailwind CSS, created secure
                REST APIs, and deployed the application using Vercel (frontend)
                and Render (backend).
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>
                  Designed a responsive UI and integrated it with a Node/Express
                  backend.
                </li>
                <li>
                  Set up environment‑based configuration and cloud‑hosted
                  services.
                </li>
                <li>
                  Used GitHub for version control with a feature‑branch
                  workflow.
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "Vercel", "Render"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800 px-2 py-1 text-slate-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </article>

            {/* SehatSaathi */}
            <article className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-semibold text-slate-50">
                SehatSaathi – Disease Classification Models
              </h3>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
                Machine learning · Health‑tech
              </p>
              <p className="text-sm text-slate-300">
                SehatSaathi is an ML‑driven project for training disease
                classification models using custom datasets. Users prepare data
                in a structured data/ folder, configure hyperparameters in
                train.py, and run a single command to start training; models are
                automatically saved into a models/ directory for later
                inference.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>
                  Implemented a modular training pipeline in Python for
                  reproducible experiments.
                </li>
                <li>
                  Automated dataset loading, training, and model saving with
                  clear configuration.
                </li>
                <li>
                  Documented setup so others can retrain or extend the models
                  quickly.
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {["Python", "Machine Learning", "Training Pipelines", "Model Management"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800 px-2 py-1 text-slate-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </article>

            {/* Portfolio & Experiments */}
            <article className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-50">
                Portfolio &amp; Deployment Experiments
              </h3>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
                Full‑stack · Experiments
              </p>
              <p className="text-sm text-slate-300">
                I have built and deployed several experimental full‑stack apps
                to explore best practices in routing, authentication, and
                performance optimization. These include small tools deployed on
                Vercel/Netlify and backend services on Render, with GitHub as
                the central code hub.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
                <li>
                  Experimented with Next.js routing, dynamic pages, and API
                  routes.
                </li>
                <li>
                  Deployed multiple builds and debugged real‑world deployment
                  issues.
                </li>
                <li>
                  Refined UIs using Tailwind CSS and component‑based design.
                </li>
              </ul>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {["Next.js", "Tailwind CSS", "Vercel", "Netlify", "Render"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800 px-2 py-1 text-slate-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </article>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section
          id="achievements"
          className="space-y-4 border-t border-slate-800 pt-12"
        >
          <h2 className="text-xl font-semibold text-slate-50">Highlights</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              Built and deployed multiple full‑stack applications as a third‑year
              CS student, focusing on real production setups rather than only
              classroom demos.
            </li>
            <li>
              Developed ML pipelines for disease classification with reproducible
              training and model management.
            </li>
            <li>
              Regularly contribute to personal GitHub projects and keep
              codebases documented and version‑controlled.
            </li>
            <li>
              Active learner of AI/ML, cloud deployment, and modern JavaScript
              ecosystems.
            </li>
          </ul>
        </section>

        {/* CONTACT */}
        <section id="contact" className="space-y-4 border-t border-slate-800 pt-12">
          <h2 className="text-xl font-semibold text-slate-50">Contact</h2>
          <p className="max-w-2xl text-sm text-slate-300">
            If you'd like to discuss internships, collaborations, or freelance
            projects, feel free to reach out. I'm always open to working on
            challenging problems in web development and AI.
          </p>
          <div className="flex flex-col gap-2 text-sm text-slate-200">
            <span>Email: your.email@example.com</span>
            <span>Location: Talsande, Maharashtra, India</span>
            <span>
              GitHub:{" "}
              <Link
                href="https://github.com/atharv348"
                target="_blank"
                className="underline-offset-2 hover:text-sky-300 hover:underline"
              >
                github.com/atharv348
              </Link>
            </span>
            <span>
              LinkedIn:{" "}
              <Link
                href="https://www.linkedin.com/in/atharv-joshi-ai/"
                target="_blank"
                className="underline-offset-2 hover:text-sky-300 hover:underline"
              >
                linkedin.com/in/atharv-joshi-ai
              </Link>
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
