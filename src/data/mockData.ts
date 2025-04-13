
import { Student, Course, Grade, Enrollment } from '../models/Student';

// Sample Student Data
export const students: Student[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1998-05-15',
    enrollmentDate: '2020-09-01',
    gender: 'Male',
    address: '123 College St, University Town',
    phone: '(555) 123-4567',
    profileImage: '/placeholder.svg'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    dateOfBirth: '1999-02-20',
    enrollmentDate: '2021-09-01',
    gender: 'Female',
    address: '456 University Ave, College City',
    phone: '(555) 987-6543',
    profileImage: '/placeholder.svg'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    dateOfBirth: '1997-11-08',
    enrollmentDate: '2019-09-01',
    gender: 'Male',
    address: '789 Campus Rd, Academia',
    phone: '(555) 246-8101',
    profileImage: '/placeholder.svg'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.w@example.com',
    dateOfBirth: '2000-07-25',
    enrollmentDate: '2022-09-01',
    gender: 'Female',
    address: '321 Scholar Ln, Learning Heights',
    phone: '(555) 135-7924',
    profileImage: '/placeholder.svg'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.b@example.com',
    dateOfBirth: '1998-09-12',
    enrollmentDate: '2020-09-01',
    gender: 'Male',
    address: '654 Education St, Knowledge City',
    phone: '(555) 864-2097',
    profileImage: '/placeholder.svg'
  }
];

// Sample Course Data
export const courses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    credits: 3,
    instructor: 'Dr. Alan Turing',
    department: 'Computer Science',
    description: 'Fundamental concepts of computer science including algorithms, programming, and basic data structures.'
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Calculus I',
    credits: 4,
    instructor: 'Dr. Ada Lovelace',
    department: 'Mathematics',
    description: 'Introduction to differential and integral calculus with applications.'
  },
  {
    id: '3',
    code: 'ENG120',
    name: 'College Composition',
    credits: 3,
    instructor: 'Prof. William Shakespeare',
    department: 'English',
    description: 'Develops core writing skills with emphasis on organization, clarity, and grammar.'
  },
  {
    id: '4',
    code: 'BIO105',
    name: 'General Biology',
    credits: 4,
    instructor: 'Dr. Rosalind Franklin',
    department: 'Biology',
    description: 'Introduction to biological principles at molecular, cellular, and organismal levels.'
  },
  {
    id: '5',
    code: 'HIST150',
    name: 'World History',
    credits: 3,
    instructor: 'Prof. Howard Zinn',
    department: 'History',
    description: 'Survey of major historical events and developments across civilizations.'
  }
];

// Sample Grade Data
export const grades: Grade[] = [
  { id: '1', studentId: '1', courseId: '1', grade: 'A', score: 95, semester: 'Fall 2023', submissionDate: '2023-12-15' },
  { id: '2', studentId: '1', courseId: '2', grade: 'B', score: 85, semester: 'Fall 2023', submissionDate: '2023-12-16' },
  { id: '3', studentId: '2', courseId: '1', grade: 'A', score: 92, semester: 'Fall 2023', submissionDate: '2023-12-15' },
  { id: '4', studentId: '2', courseId: '3', grade: 'A', score: 94, semester: 'Fall 2023', submissionDate: '2023-12-17' },
  { id: '5', studentId: '3', courseId: '4', grade: 'C', score: 75, semester: 'Fall 2023', submissionDate: '2023-12-18' },
  { id: '6', studentId: '3', courseId: '5', grade: 'B', score: 88, semester: 'Fall 2023', submissionDate: '2023-12-19' },
  { id: '7', studentId: '4', courseId: '2', grade: 'A', score: 96, semester: 'Fall 2023', submissionDate: '2023-12-16' },
  { id: '8', studentId: '4', courseId: '4', grade: 'B', score: 87, semester: 'Fall 2023', submissionDate: '2023-12-18' },
  { id: '9', studentId: '5', courseId: '3', grade: 'C', score: 78, semester: 'Fall 2023', submissionDate: '2023-12-17' },
  { id: '10', studentId: '5', courseId: '5', grade: 'B', score: 82, semester: 'Fall 2023', submissionDate: '2023-12-19' }
];

// Sample Enrollment Data
export const enrollments: Enrollment[] = [
  { id: '1', studentId: '1', courseId: '1', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '2', studentId: '1', courseId: '2', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '3', studentId: '2', courseId: '1', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '4', studentId: '2', courseId: '3', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '5', studentId: '3', courseId: '4', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '6', studentId: '3', courseId: '5', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '7', studentId: '4', courseId: '2', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '8', studentId: '4', courseId: '4', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '9', studentId: '5', courseId: '3', enrollmentDate: '2023-09-01', status: 'Active' },
  { id: '10', studentId: '5', courseId: '5', enrollmentDate: '2023-09-01', status: 'Active' }
];
