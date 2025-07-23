'use client';

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

const tasks = [
    { id: 1, name: 'Finalize foundation blueprints', assignee: 'Michael J.', due: '2024-08-01', priority: 'High', status: 'In Progress' },
    { id: 2, name: 'Conduct weekly safety inspection', assignee: 'Emily D.', due: '2024-07-29', priority: 'High', status: 'To Do' },
    { id: 3, name: 'Order steel beams for Phase 2', assignee: 'John D.', due: '2024-08-05', priority: 'Medium', status: 'To Do' },
    { id: 4, name: 'Client progress meeting', assignee: 'Jane S.', due: '2024-07-30', priority: 'Medium', status: 'In Progress' },
    { id: 5, name: 'Approve subcontractor invoices', assignee: 'Admin', due: '2024-07-28', priority: 'Low', status: 'Completed' },
    { id: 6, name: 'Update project timeline', assignee: 'John D.', due: '2024-08-02', priority: 'Medium', status: 'To Do' },
];

const priorityVariant = {
    High: 'destructive',
    Medium: 'secondary',
    Low: 'outline',
};

const statusVariant = {
    'To Do': 'outline',
    'In Progress': 'secondary',
    Completed: 'default',
};

export default function TasksPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Task
            </span>
          </Button>
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
          </CardHeader>
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
          </CardHeader>
          <CardContent>
            <TaskTable tasks={tasks.filter(t => t.status === 'Completed')} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function TaskTable({ tasks }: { tasks: typeof import('./page').tasks }) {
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
                        <Badge variant={priorityVariant[task.priority as keyof typeof priorityVariant]}>{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={statusVariant[task.status as keyof typeof statusVariant]}>{task.status}</Badge>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
