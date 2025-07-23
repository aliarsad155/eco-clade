'use client';
import * as React from 'react';
import { PlusCircle, Search, File, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

const documents = [
  { name: 'Structural Blueprints Q2.pdf', type: 'PDF', uploadedBy: 'John Doe', date: '2023-05-15' },
  { name: 'Safety Protocols v3.docx', type: 'Word', uploadedBy: 'Jane Smith', date: '2023-05-12' },
  { name: 'Site Inspection Photos.zip', type: 'ZIP', uploadedBy: 'Michael Johnson', date: '2023-05-10' },
  { name: 'Material Order Form.xlsx', type: 'Excel', uploadedBy: 'Emily Davis', date: '2023-05-09' },
  { name: 'Client Contract Final.pdf', type: 'PDF', uploadedBy: 'Chris Lee', date: '2023-05-05' },
];

export default function DocumentsPage() {
    const [open, setOpen] = React.useState(false);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const handleGenerateTitle = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setTitle("AI Generated - Site Logistics Plan_2024-07-26.pdf");
            setIsGenerating(false);
        }, 1500);
    };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Document Repository</CardTitle>
            <CardDescription>
              Manage and access all project-related documents.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Add a new document to the repository. Use the AI generator for a consistent title.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <Input id="file" type="file" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" placeholder="e.g. Project Plan" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                        <div/>
                        <div className="col-span-3">
                        <Button variant="outline" size="sm" onClick={handleGenerateTitle} disabled={isGenerating}>
                            {isGenerating ? (
                                <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Generating...
                                </>
                            ) : (
                                "Generate Title with AI"
                            )}
                        </Button>
                        </div>
                   </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setOpen(false)}>Upload</Button>
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
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Uploaded By</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-muted-foreground" />
                    {doc.name}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
                <TableCell className="hidden md:table-cell">{doc.uploadedBy}</TableCell>
                <TableCell>{doc.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
