
import React from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { useStudents } from '@/context/StudentContext';
import StatCard from '@/components/Dashboard/StatCard';
import { Users, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import GradeDistributionChart from '@/components/Dashboard/GradeDistributionChart';
import RecentEnrollmentsTable from '@/components/Dashboard/RecentEnrollmentsTable';

const Dashboard = () => {
  const { students, courses, grades, enrollments } = useStudents();

  const activeEnrollments = enrollments.filter(e => e.status === 'Active').length;
  const averageGrade = grades.length > 0 
    ? (grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length).toFixed(1) 
    : 'N/A';

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of student management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Students" 
          value={students.length} 
          icon={Users} 
          description="Enrolled students"
        />
        <StatCard 
          title="Total Courses" 
          value={courses.length} 
          icon={BookOpen} 
          description="Available courses"
        />
        <StatCard 
          title="Active Enrollments" 
          value={activeEnrollments} 
          icon={CheckCircle} 
          description="Current semester"
        />
        <StatCard 
          title="Average Grade" 
          value={averageGrade} 
          icon={GraduationCap} 
          description="All courses"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GradeDistributionChart />
      </div>

      <RecentEnrollmentsTable />
    </Layout>
  );
};

export default Dashboard;
