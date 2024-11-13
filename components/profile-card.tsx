'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { User } from "@supabase/supabase-js";
import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileCardProps {
    user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user.user_metadata.full_name || '');
    const [avatarUrl, setAvatarUrl] = useState(user.user_metadata.avatar_url);
    const [uploading, setUploading] = useState(false);

    const supabase = createClient();

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                return;
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            // Upload image to Supabase storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // Update user metadata with avatar URL
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            });

            if (updateError) throw updateError;

            setAvatarUrl(publicUrl);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        } finally {
            setUploading(false);
        }
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Never';
        return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    };

    const handleUpdateName = async () => {
        const { error } = await supabase.auth.updateUser({
            data: { full_name: fullName }
        });

        if (!error) {
            setIsEditing(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-card/30 p-8 rounded-xl backdrop-blur-sm border border-border">
            <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>{fullName?.[0] || user.email?.[0]}</AvatarFallback>
                    </Avatar>
                    <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 p-1 bg-background/50 rounded-full cursor-pointer hover:bg-background/70"
                    >
                        <Camera className="h-4 w-4" />
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Full Name</Label>
                    {isEditing ? (
                        <form className="flex gap-2" onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateName();
                        }}>
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="flex-1"
                                placeholder="Enter your full name"
                            />
                            <SubmitButton pendingText="Saving...">
                                Save
                            </SubmitButton>
                        </form>
                    ) : (
                        <div className="flex justify-between items-center">
                            <p className="text-foreground">{fullName || 'Not set'}</p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-xs text-primary hover:text-primary/80"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Email</Label>
                    <p className="text-foreground">{user.email}</p>
                </div>

                <div className="space-y-2">
                    <Label>Account Created</Label>
                    <p className="text-foreground">{formatDate(user.created_at)}</p>
                </div>

                <div className="space-y-2">
                    <Label>Last Sign In</Label>
                    <p className="text-foreground">{formatDate(user.last_sign_in_at)}</p>
                </div>

                <div className="space-y-2">
                    <Label>Authentication Method</Label>
                    <p className="text-foreground capitalize">{user.app_metadata.provider}</p>
                </div>

                <div className="space-y-2">
                    <Label>Account Status</Label>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-foreground">Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 