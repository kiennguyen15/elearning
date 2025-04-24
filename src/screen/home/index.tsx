import React from 'react';
import Header from '../component/header';
import ListCourses from './component/item';
import CourseDetailPage from '../curriculum';
import ExamSchedule from '../exam-schedule'
import ExamPage from '../exam';
import CertificatePage from '../certificate';
import ExamHistoryPage from '../history-exam';
import Sidebar from '../component/sidebar';
export default function HomePage() {
  return (
    <div className="flex">
      
      <div className="flex-1">
        {/* Content ở đây */}
        <ExamSchedule />
        <ListCourses />
        
        {/* <ExamPage /> */}
        {/* <CertificatePage score={10} totalQuestions={10}/> */}
        {/* <ExamHistoryPage /> */}
      </div>
    </div>
  );
}
