import { Route, Routes } from 'react-router-dom';
import CourseDetailPage from './curriculum';
import ExamPage from './exam';
import ExamHistoryPage from './history-exam';
import ClassesPage from './classes';
import Dashboard from './dashboard';
import QLExams from './dashboard/exams';
import QLBankQuestion from './dashboard/bankquestion';
import QLCustomer from './dashboard/customer';
import QLSubject from './dashboard/subject';

export default function EntitesRoutes() {
    return (
        <div>
            <Routes>
                <Route path="chi-tiet-khoa-hoc" element={<CourseDetailPage />} />
                <Route path="bai-thi/:id" element={<ExamPage />} />
                <Route path="lich-su-thi" element={<ExamHistoryPage />} />
                <Route path="lop-hoc" element={<ClassesPage />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="dashboard/exams" element={<QLExams />} />
                <Route path="dashboard/bank-question" element={<QLBankQuestion />} />
                <Route path="dashboard/customer" element={<QLCustomer />} />
                <Route path="dashboard/subject" element={<QLSubject />} />
            </Routes>
        </div>
    );
};
