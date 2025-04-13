
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudents } from '@/context/StudentContext';
import { format } from 'date-fns';

const RecentEnrollmentsTable = () => {
  const { enrollments, getStudentById, getCourseById } = useStudents();
  
  // Get the 5 most recent enrollments
  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="data-grid">
          <div className="grid grid-cols-3 data-grid-header">
            <div className="data-grid-cell">Student</div>
            <div className="data-grid-cell">Course</div>
            <div className="data-grid-cell">Enrollment Date</div>
          </div>
          
          {recentEnrollments.map((enrollment) => {
            const student = getStudentById(enrollment.studentId);
            const course = getCourseById(enrollment.courseId);
            
            return (
              <div key={enrollment.id} className="grid grid-cols-3 data-grid-row">
                <div className="data-grid-cell">
                  {student ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}
                </div>
                <div className="data-grid-cell">
                  {course ? `${course.code} - ${course.name}` : 'Unknown Course'}
                </div>
                <div className="data-grid-cell">
                  {format(new Date(enrollment.enrollmentDate), 'MMM d, yyyy')}
                </div>
              </div>
            );
          })}
          
          {recentEnrollments.length === 0 && (
            <div className="data-grid-row">
              <div className="data-grid-cell col-span-3 text-center py-6 text-muted-foreground">
                No recent enrollments found
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEnrollmentsTable;
