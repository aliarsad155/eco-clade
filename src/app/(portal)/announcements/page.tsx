'use client';

import * as React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const announcements = [
  {
    title: 'Q3 Safety Protocols Update',
    date: 'July 22, 2024',
    author: 'Emily Davis, Safety Officer',
    content: 'All staff are required to review the updated Q3 safety protocols by August 1st. The document is available in the repository. A mandatory briefing will be held next Friday.',
  },
  {
    title: 'New Project Kick-off: Northgate Mall',
    date: 'July 20, 2024',
    author: 'John Doe, Project Manager',
    content: 'We are excited to announce the kick-off of the Northgate Mall renovation project. The project team will be finalized by the end of this week. More details to follow.',
  },
  {
    title: 'Company Summer Picnic',
    date: 'July 15, 2024',
    author: 'HR Department',
    content: "Join us for our annual summer picnic on August 15th at Green Park. It's a great opportunity to relax and connect with colleagues. Please RSVP by August 5th.",
  },
];

export default function AnnouncementsPage() {
    const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">News & Announcements</h1>
                <p className="text-muted-foreground">Keep up to date with the latest company news.</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> New Announcement
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Create Announcement</DialogTitle>
                        <DialogDescription>
                            Post a new message for all staff members.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Announcement Title" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your announcement here." rows={5} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => setOpen(false)}>Post Announcement</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      <div className="grid gap-6">
        {announcements.map((announcement, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{announcement.title}</CardTitle>
              <CardDescription>
                Posted on {announcement.date} by {announcement.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
