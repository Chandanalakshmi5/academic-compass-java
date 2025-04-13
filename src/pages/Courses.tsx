
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useStudents } from '../context/StudentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pencil, MoreHorizontal, Trash, BookPlus, Search } from 'lucide-react';

const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useStudents();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCourse, setCurrentCourse] = useState<any>({
    id: '',
    code: '',
    name: '',
    credits: 3,
    instructor: '',
    department: '',
    description: '',
  });

  const handleAddClick = () => {
    setCurrentCourse({
      code: '',
      name: '',
      credits: 3,
      instructor: '',
      department: '',
      description: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (course: any) => {
    setCurrentCourse({ ...course });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (course: any) => {
    setCurrentCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = () => {
    addCourse(currentCourse);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = () => {
    updateCourse(currentCourse.id, currentCourse);
    setIsEditDialogOpen(false);
  };

  const handleDeleteSubmit = () => {
    deleteCourse(currentCourse.id);
    setIsDeleteDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: name === 'credits' ? parseInt(value, 10) : value });
  };

  const filteredCourses = courses.filter(course => 
    `${course.code} ${course.name} ${course.instructor}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button onClick={handleAddClick} className="bg-navy hover:bg-navy-light">
          <BookPlus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.department}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(course)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(course)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Enter the course information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="code">Course Code</label>
              <Input
                id="code"
                name="code"
                value={currentCourse.code}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="credits">Credits</label>
              <Input
                id="credits"
                name="credits"
                type="number"
                min="1"
                max="6"
                value={currentCourse.credits}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="name">Course Name</label>
              <Input
                id="name"
                name="name"
                value={currentCourse.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="instructor">Instructor</label>
              <Input
                id="instructor"
                name="instructor"
                value={currentCourse.instructor}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="department">Department</label>
              <Input
                id="department"
                name="department"
                value={currentCourse.department}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={currentCourse.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Modify the course information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="edit-code">Course Code</label>
              <Input
                id="edit-code"
                name="code"
                value={currentCourse.code}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-credits">Credits</label>
              <Input
                id="edit-credits"
                name="credits"
                type="number"
                min="1"
                max="6"
                value={currentCourse.credits}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="edit-name">Course Name</label>
              <Input
                id="edit-name"
                name="name"
                value={currentCourse.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-instructor">Instructor</label>
              <Input
                id="edit-instructor"
                name="instructor"
                value={currentCourse.instructor}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-department">Department</label>
              <Input
                id="edit-department"
                name="department"
                value={currentCourse.department}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                name="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={currentCourse.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentCourse.code} - {currentCourse.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteSubmit}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Courses;
