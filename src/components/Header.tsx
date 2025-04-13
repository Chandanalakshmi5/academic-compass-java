
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Graduation, BookOpen, Award, UserSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-navy text-white py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Graduation className="h-8 w-8 text-gold" />
            <h1 className="ml-2 text-xl font-bold">Student Management System</h1>
          </div>
          
          <nav className="flex flex-wrap justify-center space-x-0 md:space-x-6">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'text-gold bg-navy-light' : 'hover:text-gold hover:bg-navy-light'
                }`
              }
            >
              <UserSquare className="mr-2 h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/students"
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'text-gold bg-navy-light' : 'hover:text-gold hover:bg-navy-light'
                }`
              }
            >
              <UserSquare className="mr-2 h-5 w-5" />
              <span>Students</span>
            </NavLink>
            
            <NavLink 
              to="/courses"
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'text-gold bg-navy-light' : 'hover:text-gold hover:bg-navy-light'
                }`
              }
            >
              <BookOpen className="mr-2 h-5 w-5" />
              <span>Courses</span>
            </NavLink>
            
            <NavLink 
              to="/grades"
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive ? 'text-gold bg-navy-light' : 'hover:text-gold hover:bg-navy-light'
                }`
              }
            >
              <Award className="mr-2 h-5 w-5" />
              <span>Grades</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
