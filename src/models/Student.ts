
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  enrollmentDate: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  phone: string;
  profileImage?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  department: string;
  description: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F' | 'Incomplete';
  score: number;
  semester: string;
  submissionDate: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'Active' | 'Completed' | 'Dropped';
}
