import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
// import * as XLSX from 'xlsx';
interface Option {
  label: string;
  value: string;
  isCorrect: boolean;
}
interface Question {
  _id?: string;
  questionText: string;
  type: string;
  answerKey: string;
  options: Option[];
}

export default function QLBankQuestion() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Question>({
    questionText: '',
    type: 'MULTIPLE_CHOICE',
    answerKey: '',
    options: [
      { label: '', value: '', isCorrect: false },
      { label: '', value: '', isCorrect: false },
    ],
  })
  const handleAnswerChange = (index: number, newValue: string) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      label: newValue,
      value: newValue,
      isCorrect: form.answerKey === newValue,
    };
    setForm({ ...form, options: updatedOptions });
  };

  function addAnswerField() {
    setForm(prevForm => ({
      ...prevForm,
      options: [...prevForm.options, { label: '', value: '', isCorrect: false }],
    }));
  }

  const handleSelectCorrect = (index: number) => {
    const selectedValue = form.options[index].value;
    const updatedOptions = form.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setForm({
      ...form,
      answerKey: selectedValue,
      options: updatedOptions,
    });
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // const reader = new FileReader();
    // reader.onload = (evt) => {
    //   const data = new Uint8Array(evt.target?.result as ArrayBuffer);
    //   const workbook = XLSX.read(data, { type: 'array' });
    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const parsed = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //   const importedQuestions = parsed.slice(1); // skip header
    //   setBulkQuestions(importedQuestions);
    //   setAllQuestions(prev => [...prev, ...importedQuestions]); // 👈 thêm vào danh sách chung
    // };
    // reader.readAsArrayBuffer(file);
  };
  const fetchQuizzs = async () => {
    try {
      const response = await api.get(`quizzes/getByCondition?page=${1}&limit=${99999999}`);
      setAllQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  useEffect(() => {
    fetchQuizzs();
  }, []);
  const handleManualSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.questionText.trim() || !form.answerKey) return;

    const validAnswer = form.options.find(opt => opt.value === form.answerKey);
    if (!validAnswer) {
      alert("Đáp án đúng không nằm trong các lựa chọn");
      return;
    }

    const submit = async () => {
      try {
        if (editingId) {
          await api.put(`quizzes/update?id=${editingId}`, form);
        } else {
          await api.post("quizzes/create", form);
        }
        fetchQuizzs();
        setShowForm(false);
        setForm({
          questionText: '',
          type: 'MULTIPLE_CHOICE',
          answerKey: '',
          options: [
            { label: '', value: '', isCorrect: false },
            { label: '', value: '', isCorrect: false },
          ],
        });
        setEditingId(null);
      } catch (error) {
        console.error("Error saving question", error);
      }
    };
    submit();
  };
  const handleEdit = (id: string) => {
    const questionToEdit = allQuestions.find(q => q._id === id);
    if (questionToEdit) {
      const fixedOptions = questionToEdit.options.map((opt: any) => ({
        label: opt.label || opt.value || '',
        value: opt.value || opt.label || '',
        isCorrect: opt.isCorrect || (questionToEdit.answerKey === opt.value),
      }));

      setForm({
        questionText: questionToEdit.questionText || '',
        type: questionToEdit.type || 'MULTIPLE_CHOICE',
        answerKey: questionToEdit.answerKey || '',
        options: fixedOptions.length ? fixedOptions : [
          { label: '', value: '', isCorrect: false },
          { label: '', value: '', isCorrect: false },
        ],
      });
      setEditingId(id);
      setShowForm(true);
    }
  };
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Bạn chắc chắn muốn xóa câu hỏi này?');
    if (!confirmed) return;
    try {
      await api.delete(`quizzes/delete?id=${id}`);
      fetchQuizzs();
    } catch (error) {
      console.error("Error deleting question", error);
    }
  };
  return (
    <div className="mx-auto p-6 space-y-8 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Ngân hàng Câu hỏi</h1>
        <div className='mx-2'>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-2"
          >
            Thêm câu hỏi
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Import Excel
          </button>
        </div>

      </div>
      {/* Tạo câu hỏi thủ công */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white relative shadow-lg rounded p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-center w-full">Tạo câu hỏi thủ công</h2>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleManualSubmit}>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">Nội dung câu hỏi</label>
                <input
                  name="questionText"
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Nội dung câu hỏi"
                  value={form.questionText}
                  onChange={(e) => setForm({ ...form, questionText: e.target.value })}
                />
              </div>
              <label className="block text-gray-700 font-bold mb-2">Đáp án</label>
              {form.options.map((opt, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={opt.isCorrect}
                    onChange={() => handleSelectCorrect(index)}
                  />
                  <input
                    type="text"
                    className="w-full border p-2 rounded-md"
                    placeholder={`Đáp án ${index + 1}`}
                    value={opt.value}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              ))}

              <div className="flex space-x-2 mt-4 justify-between">
                <button
                  type="button"
                  onClick={addAnswerField}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  + Thêm đáp án
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Lưu câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Hiển thị tất cả câu hỏi đã thêm */}

      <div className="bg-white shadow-md rounded-md p-4 space-y-4">
        <h2 className="text-lg font-semibold">Danh sách câu hỏi</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-center">STT</th>
              <th className="p-2 border">Tên câu hỏi</th>
              <th className="p-2 border">Đáp án đúng</th>
              <th className="p-2 border">Loại câu hỏi</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.map((s, index) => (
              <tr key={index}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{s.questionText}</td>
                <td className="p-2 border">{s.answerKey}</td>
                <td className="p-2 border text-center">
                  {s.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' : 'Không xác định'}
                </td>
                <td className="p-2 border space-x-3 text-center">
                  <button
                    onClick={() => handleEdit(s._id as string)}
                    className="text-yellow-600 hover:text-yellow-800">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id as string)}
                    className="text-red-600 hover:text-red-800">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
