
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import * as React from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [role, setRole] = React.useState('staff');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRoleChange = (value: string) => {
    setRole(value);
    setEmail('');
    setPassword('');
  };

  const dashboardUrl = `/dashboard`;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
      <Image
        src="https://placehold.co/1920x1080"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 object-cover brightness-[.25] dark:brightness-[0.2]"
        data-ai-hint="eco-friendly architecture"
      />
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo className="h-10 w-auto" />
            </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Select your role and enter your credentials to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
                <RadioGroup value={role} onValueChange={handleRoleChange} className="grid grid-cols-2 gap-4">
                    <Label
                        htmlFor="staff"
                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${role === 'staff' ? 'border-primary' : ''}`}
                    >
                        <RadioGroupItem value="staff" id="staff" className="sr-only" />
                        Staff Member
                    </Label>
                    <Label
                        htmlFor="admin"
                        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${role === 'admin' ? 'border-primary' : ''}`}
                    >
                        <RadioGroupItem value="admin" id="admin" className="sr-only" />
                        Administrator
                    </Label>
                </RadioGroup>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="#"
                            className="ml-auto inline-block text-sm text-primary/80 hover:text-primary underline"
                            prefetch={false}
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <Link href={dashboardUrl}>
                <Button type="submit" className="w-full">
                Login
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
