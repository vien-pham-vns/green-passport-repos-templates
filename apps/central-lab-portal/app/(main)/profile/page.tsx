import { getCurrentUser } from '@/app/actions/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your account details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || user.image} alt={user.name || user.email} />
                <AvatarFallback className="text-lg">
                  {getInitials(user.name || `${user.firstName} ${user.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {user.name || `${user.firstName} ${user.lastName}`}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.role && (
                  <Badge variant="secondary" className="mt-2">
                    {user.role}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm">{user.email}</p>
              </div>

              {user.phoneNumber && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{user.phoneNumber}</p>
                </div>
              )}

              {user.firstName && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-sm">{user.firstName}</p>
                </div>
              )}

              {user.lastName && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-sm">{user.lastName}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Account status and metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">User ID</label>
              <p className="text-sm font-mono">{user.id}</p>
            </div>

            {user.role && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-sm capitalize">{user.role}</p>
              </div>
            )}

            {user.permissions && user.permissions.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Permissions</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {user.createdAt && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="text-sm">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
