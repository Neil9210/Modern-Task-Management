import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Save } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const [name, setName] = useState("");

  useEffect(() => {
    if (profile) setName(profile.display_name);
  }, [profile]);

  const handleSave = () => {
    if (name.trim()) updateProfile({ display_name: name.trim() });
  };

  const initials = (profile?.display_name || user?.email?.split("@")[0] || "U").slice(0, 2).toUpperCase();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-3">{profile?.display_name || "User"}</CardTitle>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Display Name
              </Label>
              <Input id="displayName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </Label>
              <Input value={user?.email || ""} disabled className="bg-muted" />
            </div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" disabled={loading}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
