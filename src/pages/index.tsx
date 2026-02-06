import { useRef, useEffect } from "react";
import { Link, Snippet, Card, CardBody } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { FormattedMessage } from 'react-intl';
import messages from '../locales/en/pages/index.json';
import "@/styles/globals.css";

export default function IndexPage() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorGlowRef.current;
    if (!el) return;
    const setPosition = (e: MouseEvent) => {
      el.style.setProperty("--mouse-x", `${e.clientX}px`);
      el.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    const setInitial = () => {
      el.style.setProperty("--mouse-x", `${typeof window !== "undefined" ? window.innerWidth / 2 : 0}px`);
      el.style.setProperty("--mouse-y", `${typeof window !== "undefined" ? window.innerHeight / 2 : 0}px`);
    };
    setInitial();
    window.addEventListener("mousemove", setPosition);
    window.addEventListener("resize", setInitial);
    return () => {
      window.removeEventListener("mousemove", setPosition);
      window.removeEventListener("resize", setInitial);
    };
  }, []);

  return (
    <DefaultLayout>
      {/* --- HERO SECTION --- */}
      <section
        ref={cursorGlowRef}
        className="relative flex flex-col lg:flex-row items-center justify-between gap-12 py-16 md:py-28 px-6 max-w-7xl mx-auto"
      >
        {/* Cursor-following glow (position set via CSS variables in effect) */}
        <div className="cursor-glow" aria-hidden />

        {/* Background glow orbs */}
        <div className="bg-glow-orb -top-20 -left-20" aria-hidden />
        <div className="bg-glow-orb-right top-1/2 -translate-y-1/2 -right-32 lg:right-0" aria-hidden />

        {/* Left Column: Messaging */}
        <div className="flex flex-col items-start text-left max-w-2xl gap-6 z-10">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              <span className="text-gradient-blue">
                <FormattedMessage id="resumatrix_title" defaultMessage="Resumatrix" />
              </span>
            </h1>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            <FormattedMessage id="build_resume_part1" defaultMessage="Craft Your " />
            <span className="text-gradient-violet">
              <FormattedMessage id="build_resume_part2" defaultMessage="Future " />
            </span>
            <br />
            <span className="text-white">Effortlessly.</span>
          </h1>

          <h4 className="text-lg md:text-xl text-default-500 max-w-md">
            <FormattedMessage id="react_ui_library" defaultMessage={messages.react_ui_library} />
          </h4>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
                size: "lg",
                class: "px-8 font-semibold button-glow"
              })}
              href="/editor"
            >
              Build My Resume
            </Link>
            <Link
              className={buttonStyles({
                variant: "bordered",
                radius: "full",
                size: "lg",
                class: "px-8 button-glow-border"
              })}
              href="/templates"
            >
              Explore Templates
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Preview Grid */}
        <div className="relative flex items-center justify-center p-4">
          <div className="relative z-10 grid grid-cols-2 gap-6 p-10 rounded-[40px] glass-card shadow-2xl">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-36 h-48 md:w-44 md:h-60 bg-black/40 rounded-2xl border border-white/5 p-5 flex flex-col gap-3"
              >
                {/* Placeholder content */}
                <div className="w-12 h-12 rounded-full bg-zinc-800/50 mb-2" />
                <div className="w-full h-2 bg-zinc-800/50 rounded-full" />
                <div className="w-4/5 h-2 bg-zinc-800/50 rounded-full" />
                <div className="mt-auto flex justify-between">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card hover:border-blue-500/50 transition-colors" shadow="none">
            <CardBody className="p-8 gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI Suggestions</h3>
              <p className="text-default-500 leading-relaxed">
                Smart content generation helps you describe your experience with professional impact.
              </p>
            </CardBody>
          </Card>

          <Card className="glass-card hover:border-violet-500/50 transition-colors" shadow="none">
            <CardBody className="p-8 gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">One-Click Styling</h3>
              <p className="text-default-500 leading-relaxed">
                Instantly switch between dozens of professional templates and color palettes.
              </p>
            </CardBody>
          </Card>

          <Card className="glass-card hover:border-pink-500/50 transition-colors" shadow="none">
            <CardBody className="p-8 gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Cloud Sync</h3>
              <p className="text-default-500 leading-relaxed">
                Save your progress and export to PDF or share your live portfolio link anywhere.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="flex flex-col items-center py-24 gap-8">
        <div className="flex flex-col items-center gap-4">
          <GithubIcon size={40} className="text-default-400" />
          <p className="text-default-500">Open source and community driven.</p>
        </div>
        <Snippet hideCopyButton hideSymbol variant="bordered" className="bg-transparent border-divider px-6 py-3">
          <span className="flex gap-2">
            <FormattedMessage id="get_started" defaultMessage={messages.get_started} />
            <Link href="https://github.com/ProtosAlen/resumatrix" isExternal className="font-bold text-blue-500">
              Check out the Repo
            </Link>
          </span>
        </Snippet>
      </section>
    </DefaultLayout>
  );
}