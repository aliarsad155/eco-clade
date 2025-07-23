
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as React from 'react';

export default function LoginPage() {
  const [role, setRole] = React.useState('staff');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRoleChange = (value: string) => {
    setRole(value);
    setEmail('');
    setPassword('');
  };

  const dashboardUrl = role === 'admin' ? '/dashboard' : `/dashboard?role=${role}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access the EcoClade Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
                <Label>Role</Label>
                <RadioGroup value={role} onValueChange={handleRoleChange} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="staff" id="staff" />
                        <Label htmlFor="staff">Staff</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
           
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Link href={dashboardUrl} className="w-full">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
