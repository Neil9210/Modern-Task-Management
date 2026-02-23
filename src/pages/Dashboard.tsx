import DashboardLayout from "@/components/DashboardLayout";
import { useTasks } from "@/hooks/useTasks";
import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const { tasks } = useTasks();
  const { profile } = useProfile();

  const stats = [
    { label: "Total Tasks", value: tasks.length, icon: ListTodo, color: "from-primary to-secondary" },
    { label: "In Progress", value: tasks.filter((t) => t.status === "in_progress").length, icon: Clock, color: "from-secondary to-primary" },
    { label: "Completed", value: tasks.filter((t) => t.status === "done").length, icon: CheckCircle2, color: "from-[hsl(var(--success))] to-secondary" },
    { label: "High Priority", value: tasks.filter((t) => t.priority === "high").length, icon: AlertTriangle, color: "from-accent to-destructive" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {profile?.display_name || "there"} 👋
          </h1>
          <p className="text-muted-foreground">Here's an overview of your tasks.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {tasks.length === 0 && (
          <Card className="py-12 text-center">
            <CardContent>
              <ListTodo className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 text-lg font-medium">No tasks yet</p>
              <p className="text-sm text-muted-foreground">Head over to the Tasks page to create your first task!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
