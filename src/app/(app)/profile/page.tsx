"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useHookstate } from '@hookstate/core';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, stateUser } = useAuth();
  const { toast } = useToast();

  // Use hookstate for reactive updates
  const currentUserState = useHookstate(user);

  const currentUser = currentUserState.get();

  const [dbUser, setDbUser] = useState<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile_pic: ''
  });

  useEffect(() => {
    // Fetch user details from DB using hookstate's getUser
    const fetchUser = async () => {
      if (currentUser?.email) {
        const userFromDb = await stateUser.fetchUserByEmail(currentUser.email);
        setDbUser(userFromDb);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email]);

  useEffect(() => {
    if (dbUser) {
      setFormData({
        name: dbUser.name || '',
        email: dbUser.email || '',
        phone: dbUser.phone || '',
        profile_pic: dbUser.profile_pic || ''
      });
    }
  }, [dbUser]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!dbUser?.id) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive"
      });
      return;
    }

    try {
      await stateUser.updateUser(dbUser.id, formData);
      setIsEditing(false);
      // Refetch user from DB after update
      if (stateUser.fetchUserById) {
        const updatedUser = await stateUser.fetchUserById(dbUser.id);
        setDbUser(updatedUser);
      }
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (dbUser) {
      setFormData({
        name: dbUser.name || '',
        email: dbUser.email || '',
        phone: dbUser.phone || '',
        profile_pic: dbUser.profile_pic || ''
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="size-16">
              <AvatarImage
                src={formData.profile_pic}
                alt="Profile"
              />
              <AvatarFallback className="text-lg">
                {formData.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle>{formData.name || 'User'}</CardTitle>
              <CardDescription>{formData.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={true}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile_pic">Profile Picture URL</Label>
              <Input
                id="profile_pic"
                value={formData.profile_pic}
                onChange={(e) => handleInputChange('profile_pic', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter profile picture URL"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Additional account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">User ID</p>
              <p className="font-mono text-xs">{dbUser?.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}