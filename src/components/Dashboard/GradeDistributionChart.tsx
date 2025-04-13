
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStudents } from '@/context/StudentContext';

const GradeDistributionChart = () => {
  const { grades } = useStudents();
  
  const gradeDistribution = [
    { name: 'A', count: grades.filter(g => g.grade === 'A').length },
    { name: 'B', count: grades.filter(g => g.grade === 'B').length },
    { name: 'C', count: grades.filter(g => g.grade === 'C').length },
    { name: 'D', count: grades.filter(g => g.grade === 'D').length },
    { name: 'F', count: grades.filter(g => g.grade === 'F').length },
    { name: 'Inc', count: grades.filter(g => g.grade === 'Incomplete').length },
  ];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={gradeDistribution}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ffd700" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GradeDistributionChart;
