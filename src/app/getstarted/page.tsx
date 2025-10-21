import type { ReactNode } from "react";
import { Lock, Share2, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth";

export default function GetStartedPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-24 text-slate-100 sm:px-12">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 -z-10 opacity-70 blur-3xl">
        <div className="mx-auto h-full max-w-5xl bg-[radial-gradient(circle_at_top,_#6366f1_0%,_transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur">
          <Lock className="h-4 w-4 text-indigo-300" />
          Private by default, share when you choose
        </span>

        <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Your personal gallery vault. <br className="hidden sm:block" /> A
          spotlight for the moments you share.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-200/80 sm:text-xl">
          Keep every shot safe, organized, and just for you—until you decide to
          publish it. Gallery gives you a private workspace with the freedom to
          share individual images publicly when the moment calls for it.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
          className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Button
            type="submit"
            size="lg"
            className="h-16 rounded-full bg-indigo-500 px-10 text-lg font-semibold text-white shadow-[0_20px_45px_-15px_rgba(99,102,241,0.6)] transition-transform hover:scale-105 hover:bg-indigo-400"
          >
            Get Started
          </Button>
          <div className="text-sm text-slate-300/80">
            Sign in to secure your space and start curating
          </div>
        </form>

        <div className="mt-16 grid w-full gap-6 text-left sm:grid-cols-3">
          <FeatureCard
            icon={<Lock className="h-6 w-6 text-indigo-300" />}
            title="Private vault"
            description="Every image lives in your personal gallery until you choose to share it."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6 text-indigo-300" />}
            title="Curated clarity"
            description="Organize projects, memories, or mood boards with lightning-fast search."
          />
          <FeatureCard
            icon={<Share2 className="h-6 w-6 text-indigo-300" />}
            title="Selective spotlight"
            description="Publish a single shot to the public feed and keep the rest tucked away."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard(props: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  const { icon, title, description } = props;

  return (
    <div className="group rounded-2xl border border-white/5 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)] transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-indigo-500/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10">
        {icon}
      </div>
      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-200/80">{description}</p>
    </div>
  );
}
