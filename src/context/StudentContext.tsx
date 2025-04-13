
import React, { createContext, useState, useContext } from 'react';
import { Student, Course, Grade, Enrollment } from '../models/Student';
import { 
  students as initialStudents, 
  courses as initialCourses, 
  grades as initialGrades, 
  enrollments as initialEnrollments 
} from '../data/mockData';
import { toast } from '@/components/ui/use-toast';

interface StudentContextType {
  students: Student[];
  courses: Course[];
  grades: Grade[];
  enrollments: Enrollment[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  updateGrade: (id: string, grade: Partial<Grade>) => void;
  deleteGrade: (id: string) => void;
  addEnrollment: (enrollment: Omit<Enrollment, 'id'>) => void;
  updateEnrollment: (id: string, enrollment: Partial<Enrollment>) => void;
  deleteEnrollment: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  getCourseById: (id: string) => Course | undefined;
  getStudentGrades: (studentId: string) => Grade[];
  getStudentCourses: (studentId: string) => Course[];
  getStudentEnrollments: (studentId: string) => Enrollment[];
  getCourseStudents: (courseId: string) => Student[];
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = { ...student, id: generateId() };
    setStudents([...students, newStudent]);
    toast({
      title: 'Success',
      description: 'Student added successfully',
    });
  };

  const updateStudent = (id: string, studentData: Partial<Student>) => {
    setStudents(
      students.map((student) => 
        student.id === id ? { ...student, ...studentData } : student
      )
    );
    toast({
      title: 'Success',
      description: 'Student updated successfully',
    });
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
    setEnrollments(enrollments.filter((enrollment) => enrollment.studentId !== id));
    setGrades(grades.filter((grade) => grade.studentId !== id));
    toast({
      title: 'Success',
      description: 'Student deleted successfully',
    });
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: generateId() };
    setCourses([...courses, newCourse]);
    toast({
      title: 'Success',
      description: 'Course added successfully',
    });
  };

  const updateCourse = (id: string, courseData: Partial<Course>) => {
    setCourses(
      courses.map((course) => 
        course.id === id ? { ...course, ...courseData } : course
      )
    );
    toast({
      title: 'Success',
      description: 'Course updated successfully',
    });
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
    setEnrollments(enrollments.filter((enrollment) => enrollment.courseId !== id));
    setGrades(grades.filter((grade) => grade.courseId !== id));
    toast({
      title: 'Success',
      description: 'Course deleted successfully',
    });
  };

  const addGrade = (grade: Omit<Grade, 'id'>) => {
    const newGrade = { ...grade, id: generateId() };
    setGrades([...grades, newGrade]);
    toast({
      title: 'Success',
      description: 'Grade added successfully',
    });
  };

  const updateGrade = (id: string, gradeData: Partial<Grade>) => {
    setGrades(
      grades.map((grade) => 
        grade.id === id ? { ...grade, ...gradeData } : grade
      )
    );
    toast({
      title: 'Success',
      description: 'Grade updated successfully',
    });
  };

  const deleteGrade = (id: string) => {
    setGrades(grades.filter((grade) => grade.id !== id));
    toast({
      title: 'Success',
      description: 'Grade deleted successfully',
    });
  };

  const addEnrollment = (enrollment: Omit<Enrollment, 'id'>) => {
    const newEnrollment = { ...enrollment, id: generateId() };
    setEnrollments([...enrollments, newEnrollment]);
    toast({
      title: 'Success',
      description: 'Enrollment added successfully',
    });
  };

  const updateEnrollment = (id: string, enrollmentData: Partial<Enrollment>) => {
    setEnrollments(
      enrollments.map((enrollment) => 
        enrollment.id === id ? { ...enrollment, ...enrollmentData } : enrollment
      )
    );
    toast({
      title: 'Success',
      description: 'Enrollment updated successfully',
    });
  };

  const deleteEnrollment = (id: string) => {
    setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    toast({
      title: 'Success',
      description: 'Enrollment deleted successfully',
    });
  };

  const getStudentById = (id: string) => {
    return students.find((student) => student.id === id);
  };

  const getCourseById = (id: string) => {
    return courses.find((course) => course.id === id);
  };

  const getStudentGrades = (studentId: string) => {
    return grades.filter((grade) => grade.studentId === studentId);
  };

  const getStudentCourses = (studentId: string) => {
    const studentEnrollments = enrollments.filter((enrollment) => enrollment.studentId === studentId);
    return courses.filter((course) => 
      studentEnrollments.some((enrollment) => enrollment.courseId === course.id)
    );
  };

  const getStudentEnrollments = (studentId: string) => {
    return enrollments.filter((enrollment) => enrollment.studentId === studentId);
  };

  const getCourseStudents = (courseId: string) => {
    const courseEnrollments = enrollments.filter((enrollment) => enrollment.courseId === courseId);
    return students.filter((student) => 
      courseEnrollments.some((enrollment) => enrollment.studentId === student.id)
    );
  };

  const value = {
    students,
    courses,
    grades,
    enrollments,
    addStudent,
    updateStudent,
    deleteStudent,
    addCourse,
    updateCourse,
    deleteCourse,
    addGrade,
    updateGrade,
    deleteGrade,
    addEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getStudentById,
    getCourseById,
    getStudentGrades,
    getStudentCourses,
    getStudentEnrollments,
    getCourseStudents
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
