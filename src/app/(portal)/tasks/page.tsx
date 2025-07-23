
'use client';

import * as React from 'react';
import { PlusCircle } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialTasks = [
    { id: 1, name: 'Finalize foundation blueprints', assignee: 'Michael J.', due: '2024-08-01', priority: 'High' as const, status: 'To Do' as const },
    { id: 2, name: 'Conduct weekly safety inspection', assignee: 'Emily D.', due: '2024-07-29', priority: 'High' as const, status: 'To Do' as const },
    { id: 3, name: 'Order steel beams for Phase 2', assignee: 'John D.', due: '2024-08-05', priority: 'Medium' as const, status: 'To Do' as const },
    { id: 4, name: 'Client progress meeting', assignee: 'Jane S.', due: '2024-07-30', priority: 'Medium' as const, status: 'In Progress' as const },
    { id: 5, name: 'Approve subcontractor invoices', assignee: 'Admin', due: '2024-07-28', priority: 'Low' as const, status: 'Completed' as const },
    { id: 6, name: 'Update project timeline', assignee: 'John D.', due: '2024-08-02', priority: 'Medium' as const, status: 'To Do' as const },
];

type Task = typeof initialTasks[number];

const priorityVariant: { [key in Task['priority']]: 'destructive' | 'secondary' | 'outline' } = {
    High: 'destructive',
    Medium: 'secondary',
    Low: 'outline',
};

const statusVariant: { [key in Task['status']]: 'outline' | 'secondary' | 'default' } = {
    'To Do': 'outline',
    'In Progress': 'secondary',
    Completed: 'default',
};

function TaskTable({ tasks }: { tasks: Task[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className="hidden md:table-cell">Assignee</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={`https://placehold.co/40x40`} data-ai-hint="person face" />
                                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {task.assignee}
                        </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{task.due}</TableCell>
                    <TableCell>
                        <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default function TasksPage() {
    const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
    const [open, setOpen] = React.useState(false);
    const [newTaskName, setNewTaskName] = React.useState('');
    const [newAssignee, setNewAssignee] = React.useState('');
    const [newDueDate, setNewDueDate] = React.useState('');
    const [newPriority, setNewPriority] = React.useState<Task['priority']>('Medium');

    const handleAddTask = () => {
        if (newTaskName && newAssignee && newDueDate) {
            const newTask: Task = {
                id: tasks.length + 1,
                name: newTaskName,
                assignee: newAssignee,
                due: newDueDate,
                priority: newPriority,
                status: 'To Do',
            };
            setTasks([newTask, ...tasks]);
            setNewTaskName('');
            setNewAssignee('');
            setNewDueDate('');
            setNewPriority('Medium');
            setOpen(false);
        }
    };

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            New Task
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="taskName">Task Name</Label>
                            <Input id="taskName" value={newTaskName} onChange={e => setNewTaskName(e.target.value)} />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="assignee">Assignee</Label>
                            <Input id="assignee" value={newAssignee} onChange={e => setNewAssignee(e.target.value)} />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input id="dueDate" type="date" value={newDueDate} onChange={e => setNewDueDate(e.target.value)} />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label>Priority</Label>
                            <Select value={newPriority} onValueChange={(value) => setNewPriority(value as Task['priority'])}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        </div>
                        <DialogFooter>
                        <Button onClick={handleAddTask}>Add Task</Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                </div>
            </div>
            <TabsContent value="all">
                <Card>
                <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                    <CardDescription>
                    An overview of all tasks across projects.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TaskTable tasks={tasks} />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="my-tasks">
                <Card>
                <CardHeader>
                    <CardTitle>My Tasks</CardTitle>
                    <CardDescription>
                    Tasks assigned directly to you.
                    </CardDescription>
                </Header>
                <CardContent>
                    <TaskTable tasks={tasks.filter(t => ['John D.', 'Jane S.', 'Emily D.'].includes(t.assignee))} />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="completed">
                <Card>
                <CardHeader>
                    <CardTitle>Completed Tasks</CardTitle>
                    <CardDescription>
                    Recently completed tasks.
                    </CardDescription>
                </Header>
                <CardContent>
                    <TaskTable tasks={tasks.filter(t => t.status === 'Completed')} />
                </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

    