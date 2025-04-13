
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
import { Pencil, MoreHorizontal, Trash, FilePlus2, Search } from 'lucide-react';

const Grades = () => {
  const { 
    grades, 
    students, 
    courses, 
    addGrade, 
    updateGrade, 
    deleteGrade, 
    getStudentById, 
    getCourseById 
  } = useStudents();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentGrade, setCurrentGrade] = useState<any>({
    id: '',
    studentId: '',
    courseId: '',
    grade: 'A',
    score: 95,
    semester: '',
    submissionDate: new Date().toISOString().split('T')[0],
  });

  const handleAddClick = () => {
    setCurrentGrade({
      studentId: students[0]?.id || '',
      courseId: courses[0]?.id || '',
      grade: 'A',
      score: 95,
      semester: 'Spring 2025',
      submissionDate: new Date().toISOString().split('T')[0],
    });
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (grade: any) => {
    setCurrentGrade({ ...grade });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (grade: any) => {
    setCurrentGrade(grade);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = () => {
    addGrade(currentGrade);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = () => {
    updateGrade(currentGrade.id, currentGrade);
    setIsEditDialogOpen(false);
  };

  const handleDeleteSubmit = () => {
    deleteGrade(currentGrade.id);
    setIsDeleteDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentGrade({ 
      ...currentGrade, 
      [name]: name === 'score' ? parseInt(value, 10) : value
    });
  };

  const filteredGrades = grades.filter(grade => {
    const student = getStudentById(grade.studentId);
    const course = getCourseById(grade.courseId);
    
    if (!student || !course) return false;
    
    const searchText = `${student.firstName} ${student.lastName} ${course.code} ${course.name} ${grade.grade}`
      .toLowerCase();
      
    return searchText.includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Grades</h1>
        <Button onClick={handleAddClick} className="bg-navy hover:bg-navy-light">
          <FilePlus2 className="mr-2 h-4 w-4" />
          Add New Grade
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search grades..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.map((grade) => {
              const student = getStudentById(grade.studentId);
              const course = getCourseById(grade.courseId);
              
              return (
                <TableRow key={grade.id}>
                  <TableCell>
                    {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                  </TableCell>
                  <TableCell>
                    {course ? `${course.code} - ${course.name}` : 'Unknown Course'}
                  </TableCell>
                  <TableCell className="font-medium">
                    {grade.grade}
                  </TableCell>
                  <TableCell>{grade.score}</TableCell>
                  <TableCell>{grade.semester}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(grade)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(grade)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredGrades.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No grades found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Grade Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Grade</DialogTitle>
            <DialogDescription>
              Enter the grade information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label htmlFor="studentId">Student</label>
              <select
                id="studentId"
                name="studentId"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={currentGrade.studentId}
                onChange={handleChange}
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="courseId">Course</label>
              <select
                id="courseId"
                name="courseId"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={currentGrade.courseId}
                onChange={handleChange}
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="grade">Letter Grade</label>
              <select
                id="grade"
                name="grade"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={currentGrade.grade}
                onChange={handleChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="score">Score</label>
              <Input
                id="score"
                name="score"
                type="number"
                min="0"
                max="100"
                value={currentGrade.score}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="semester">Semester</label>
              <Input
                id="semester"
                name="semester"
                value={currentGrade.semester}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="submissionDate">Submission Date</label>
              <Input
                id="submissionDate"
                name="submissionDate"
                type="date"
                value={currentGrade.submissionDate}
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

      {/* Edit Grade Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Grade</DialogTitle>
            <DialogDescription>
              Modify the grade information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label htmlFor="edit-studentId">Student</label>
              <select
                id="edit-studentId"
                name="studentId"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={currentGrade.studentId}
                onChange={handleChange}
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label htmlFor="edit-courseId">Course</label>
              <select
                id="edit-courseId"
                name="courseId"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={currentGrade.courseId}
                onChange={handleChange}
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-grade">Letter Grade</label>
              <select
                id="edit-grade"
                name="grade"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={currentGrade.grade}
                onChange={handleChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-score">Score</label>
              <Input
                id="edit-score"
                name="score"
                type="number"
                min="0"
                max="100"
                value={currentGrade.score}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-semester">Semester</label>
              <Input
                id="edit-semester"
                name="semester"
                value={currentGrade.semester}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-submissionDate">Submission Date</label>
              <Input
                id="edit-submissionDate"
                name="submissionDate"
                type="date"
                value={currentGrade.submissionDate}
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

      {/* Delete Grade Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this grade record? This action cannot be undone.
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

export default Grades;
