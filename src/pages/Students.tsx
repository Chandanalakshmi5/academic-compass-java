
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
import { Pencil, MoreHorizontal, Trash, UserPlus, Search } from 'lucide-react';

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStudent, setCurrentStudent] = useState<any>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    enrollmentDate: '',
    gender: 'Male',
    address: '',
    phone: '',
  });

  const handleAddClick = () => {
    setCurrentStudent({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      gender: 'Male',
      address: '',
      phone: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (student: any) => {
    setCurrentStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (student: any) => {
    setCurrentStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = () => {
    addStudent(currentStudent);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = () => {
    updateStudent(currentStudent.id, currentStudent);
    setIsEditDialogOpen(false);
  };

  const handleDeleteSubmit = () => {
    deleteStudent(currentStudent.id);
    setIsDeleteDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const filteredStudents = students.filter(student => 
    `${student.firstName} ${student.lastName} ${student.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button onClick={handleAddClick} className="bg-navy hover:bg-navy-light">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(student)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(student)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName">First Name</label>
              <Input
                id="firstName"
                name="firstName"
                value={currentStudent.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName">Last Name</label>
              <Input
                id="lastName"
                name="lastName"
                value={currentStudent.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentStudent.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                name="phone"
                value={currentStudent.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                value={currentStudent.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={currentStudent.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="enrollmentDate">Enrollment Date</label>
              <Input
                id="enrollmentDate"
                name="enrollmentDate"
                type="date"
                value={currentStudent.enrollmentDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="address">Address</label>
              <Input
                id="address"
                name="address"
                value={currentStudent.address}
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

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Modify the student information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="edit-firstName">First Name</label>
              <Input
                id="edit-firstName"
                name="firstName"
                value={currentStudent.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-lastName">Last Name</label>
              <Input
                id="edit-lastName"
                name="lastName"
                value={currentStudent.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="edit-email">Email</label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={currentStudent.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-phone">Phone</label>
              <Input
                id="edit-phone"
                name="phone"
                value={currentStudent.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-gender">Gender</label>
              <select
                id="edit-gender"
                name="gender"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                value={currentStudent.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-dateOfBirth">Date of Birth</label>
              <Input
                id="edit-dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={currentStudent.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-enrollmentDate">Enrollment Date</label>
              <Input
                id="edit-enrollmentDate"
                name="enrollmentDate"
                type="date"
                value={currentStudent.enrollmentDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="edit-address">Address</label>
              <Input
                id="edit-address"
                name="address"
                value={currentStudent.address}
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

      {/* Delete Student Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentStudent.firstName} {currentStudent.lastName}? This action cannot be undone.
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

export default Students;
