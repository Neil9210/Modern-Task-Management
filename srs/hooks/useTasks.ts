import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task, TaskStatus, TaskPriority } from "@/types";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch tasks", variant: "destructive" });
    } else {
      setTasks(data as Task[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const createTask = async (task: { title: string; description: string; status: TaskStatus; priority: TaskPriority }) => {
    if (!user) return;
    const { error } = await supabase.from("tasks").insert({ ...task, user_id: user.id });
    if (error) {
      toast({ title: "Error", description: "Failed to create task", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Task created!" });
      fetchTasks();
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { error } = await supabase.from("tasks").update(updates).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update task", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Task updated!" });
      fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete task", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Task deleted!" });
      fetchTasks();
    }
  };

  return { tasks, loading, createTask, updateTask, deleteTask, refetch: fetchTasks };
};
