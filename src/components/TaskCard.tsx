import { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

const statusStyles: Record<string, string> = {
  todo: "bg-warning/15 text-warning border-warning/30",
  in_progress: "bg-secondary/15 text-secondary border-secondary/30",
  done: "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
};

const statusLabels: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const priorityStyles: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/15 text-primary",
  high: "bg-destructive/15 text-destructive",
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-l-4" style={{ borderLeftColor: task.priority === "high" ? "hsl(var(--destructive))" : task.priority === "medium" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2">{task.title}</CardTitle>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(task)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={statusStyles[task.status]}>
            {statusLabels[task.status]}
          </Badge>
          <Badge variant="outline" className={priorityStyles[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {format(new Date(task.created_at), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
