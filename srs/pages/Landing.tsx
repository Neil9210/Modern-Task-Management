import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Shield } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-32">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Zap className="h-4 w-4" /> Manage tasks like a pro
        </div>
        <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          Organize your work,{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            boost productivity
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          A modern task management app to create, track, and complete your tasks with a beautiful, intuitive interface.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8">
            <Link to="/register">Start Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: CheckCircle2, title: "Easy Task Management", desc: "Create, edit, and organize tasks with priorities and statuses.", color: "text-primary" },
            { icon: Zap, title: "Real-time Updates", desc: "Instant feedback with smooth animations and toast notifications.", color: "text-secondary" },
            { icon: Shield, title: "Secure & Private", desc: "Your data is protected with row-level security. Only you see your tasks.", color: "text-accent" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <f.icon className={`h-10 w-10 ${f.color} mb-4`} />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 TaskFlow. Built with ❤️ for PrimeTrade Assignment.
      </footer>
    </div>
  );
};

export default Landing;
