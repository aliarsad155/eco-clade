
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

const themes = [
    { name: 'Sunset', primary: '24 94% 52%', accent: '50 96% 62%', background: '20 40% 98%' },
    { name: 'EcoClade', primary: '142.1 76.2% 36.3%', accent: '47.9 95.8% 53.1%', background: '0 0% 100%' },
    { name: 'Forest', primary: '120 33% 30%', accent: '120 20% 65%', background: '120 10% 96%' },
    { name: 'Ocean', primary: '220 83% 59%', accent: '197 91% 64%', background: '210 40% 98%' },
    { name: 'Minimalist', primary: '0 0% 15%', accent: '0 0% 50%', background: '0 0% 100%' },
    { name: 'Vibrant', primary: '330 89% 55%', accent: '270 90% 65%', background: '300 20% 98%' },
];

export default function SettingsPage() {
    const [selectedTheme, setSelectedTheme] = React.useState('EcoClade');
    const searchParams = useSearchParams();
    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        const urlRole = searchParams.get('role');
        const sessionRole = sessionStorage.getItem('userRole');

        if (urlRole) {
            sessionStorage.setItem('userRole', urlRole);
            setRole(urlRole);
        } else if (sessionRole) {
            setRole(sessionRole);
        }
    }, [searchParams]);

    React.useEffect(() => {
        // Set default theme on mount
        handleThemeChange('EcoClade');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleThemeChange = (themeName: string) => {
        const theme = themes.find(t => t.name === themeName);
        if (theme) {
            setSelectedTheme(theme.name);
            const root = document.documentElement;
            root.style.setProperty('--primary', theme.primary);
            root.style.setProperty('--accent', theme.accent);
            root.style.setProperty('--background', theme.background);

            // sidebar colors derived from primary
            const [h, s, l] = theme.primary.split(' ').map(parseFloat);
            root.style.setProperty('--sidebar-background', `${h} ${s * 0.4}% ${l + (100-l) * 0.9}%`);
            root.style.setProperty('--sidebar-foreground', `${h} 33% 15%`);
            root.style.setProperty('--sidebar-primary', `${h} ${s}% ${l}%`);
            root.style.setProperty('--sidebar-primary-foreground', `${h} 50% 95%`);
            root.style.setProperty('--sidebar-accent', `${h} ${s * 0.4}% ${l + (100-l) * 0.8}%`);
            root.style.setProperty('--sidebar-accent-foreground', `${h} 33% 15%`);
            root.style.setProperty('--sidebar-border', `${h} ${s * 0.2}% ${l + (100-l) * 0.75}%`);
            root.style.setProperty('--sidebar-ring', `${h} ${s}% ${l}%`);

        }
    };

    if (role === null) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Please wait while we check your permissions.</p>
                </CardContent>
            </Card>
        )
    }

    if (role !== 'admin') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>You do not have permission to view this page.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Only administrators can change theme settings.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Label>Color Presets</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {themes.map((theme) => (
                            <div key={theme.name}>
                                <button
                                    onClick={() => handleThemeChange(theme.name)}
                                    className={cn(
                                        'rounded-lg border-2 p-4 w-full text-left transition-all',
                                        selectedTheme === theme.name ? 'border-primary' : 'border-transparent'
                                    )}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `hsl(${theme.primary})` }} />
                                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `hsl(${theme.accent})` }} />
                                        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: `hsl(${theme.background})` }} />
                                    </div>
                                    <span className="font-medium text-foreground">{theme.name}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
