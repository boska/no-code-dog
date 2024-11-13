import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile-card";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background mt-16">
            <ProfileCard user={user} />
        </div>
    );
} 