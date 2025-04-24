import { Route, Routes } from 'react-router-dom';
import CourseDetailPage from './curriculum';
import ExamPage from './exam';
import ExamHistoryPage from './history-exam';
import ClassesPage from './classes';

export default function EntitesRoutes() {
    return (
        <div>
            <Routes>
                <Route path="chi-tiet-khoa-hoc" element={<CourseDetailPage />} />
                <Route path="bai-thi" element={<ExamPage />} />
                <Route path="lich-su-thi" element={<ExamHistoryPage />} />
                <Route path="lop-hoc" element={<ClassesPage />} />
            </Routes>
        </div>
    );
};
