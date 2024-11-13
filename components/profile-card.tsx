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

    const formatDate = (dateString: string) => {
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
        <div className="w-full max-w-md bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>{fullName?.[0] || user.email?.[0]}</AvatarFallback>
                    </Avatar>
                    <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 p-1 bg-black/50 rounded-full cursor-pointer hover:bg-black/70"
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
                    <Label className="text-gray-300">Full Name</Label>
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
                            <p className="text-white">{fullName || 'Not set'}</p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-xs text-red-500 hover:text-red-400"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">Email</Label>
                    <p className="text-white">{user.email}</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">Account Created</Label>
                    <p className="text-white">{formatDate(user.created_at)}</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">Last Sign In</Label>
                    <p className="text-white">{formatDate(user.last_sign_in_at)}</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">Authentication Method</Label>
                    <p className="text-white capitalize">{user.app_metadata.provider}</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-300">Account Status</Label>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-white">Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 