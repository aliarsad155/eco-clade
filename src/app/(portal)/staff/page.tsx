
'use client';

import * as React from 'react';
import { PlusCircle, Search, MoreHorizontal } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const initialStaffData = [
  {
    name: 'John Doe',
    email: 'john.doe@ecoclade.ca',
    role: 'Project Manager',
    phone: '555-123-4567',
    avatar: 'https://placehold.co/100x100',
    avatarFallback: 'JD',
    dataAiHint: 'man face',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@ecoclade.ca',
    role: 'Site Superintendant',
    phone: '555-234-5678',
    avatar: 'https://placehold.co/100x100',
    avatarFallback: 'JS',
    dataAiHint: 'woman face',
  },
  {
    name: 'Michael Johnson',
    email: 'michael.j@ecoclade.ca',
    role: 'Lead Architect',
    phone: '555-345-6789',
    avatar: 'https://placehold.co/100x100',
    avatarFallback: 'MJ',
    dataAiHint: 'person face',
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@ecoclade.ca',
    role: 'Safety Officer',
    phone: '555-456-7890',
    avatar: 'https://placehold.co/100x100',
    avatarFallback: 'ED',
    dataAiHint: 'woman smiling',
  },
  {
    name: 'Chris Lee',
    email: 'chris.lee@ecoclade.ca',
    role: 'Foreman',
    phone: '555-567-8901',
    avatar: 'https://placehold.co/100x100',
    avatarFallback: 'CL',
    dataAiHint: 'man smiling',
  },
];

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [staffData, setStaffData] = React.useState(initialStaffData);
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newRole, setNewRole] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    if (newName && newEmail && newRole) {
      const newStaffMember = {
        name: newName,
        email: newEmail,
        role: newRole,
        phone: newPhone,
        avatar: 'https://placehold.co/100x100',
        avatarFallback: newName.split(' ').map(n => n[0]).join(''),
        dataAiHint: 'person face',
      };
      setStaffData([newStaffMember, ...staffData]);
      setNewName('');
      setNewEmail('');
      setNewRole('');
      setNewPhone('');
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>
              A list of all staff members at EcoClade.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={newName} onChange={(e) => setNewName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Role</Label>
                    <Input id="role" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <Input id="phone" type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStaff}>Add Staff</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => (
              <TableRow key={staff.email}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={staff.avatar} alt={staff.name} data-ai-hint={staff.dataAiHint} />
                      <AvatarFallback>{staff.avatarFallback}</AvatarFallback>
                    </Avatar>
                    {staff.name}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{staff.role}</TableCell>
                <TableCell className="hidden md:table-cell">{staff.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{staff.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
