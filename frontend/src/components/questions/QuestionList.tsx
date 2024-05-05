import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const Nav = useNavigate();

  interface Question {
    id: number;
    question: string;
    category: string;
    image: string;
    options: string[];
    correctOption: string;
  }

  useEffect(() => {
    axios
      .get<Question[]>("http://localhost:8080/questions")
      .then((response) => {
        setQuestions(response.data);
        console.log("questions data", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleQuetionSelect = (id: number) => {
    setSelectedQuestionId(id);
    Nav(`/admin/edit-question/${id}`);
  };
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8080/quizs/${id}`)
      .then(() => {
        setQuestions((prevQuestion) =>
          prevQuestion.filter((questions) => questions.id !== id)
        );
        Swal.fire({
          icon: "success",
          title: "Xoá thành công",
        });
      })
      .catch((error) => {
        console.error("Error deleting quiz:", error);
        Swal.fire({
          icon: "error",
          title: "Xoá thất bại",
        });
      });
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg w-screen bg-gray-200 h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Câu hỏi
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Đáp án
            </th>
            <th scope="col" className="px-6 py-3">
              Đáp án đúng
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((questions) => (
            <tr
              key={questions.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${questions.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${questions.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {questions.question}
              </td>
              <td className="px-6 py-4">{questions.category}</td>
              <td className="px-6 py-4">
                {questions.image ? (
                  <img
                    src={questions.image}
                    alt={`Image for question ${questions.id}`}
                    className="w-20 h-20"
                  />
                ) : (
                  <span>No image available</span>
                )}
              </td>
              <td className="px-6 py-4">
                <ul>
                  {Array.isArray(questions.options) ? (
                    questions.options.length > 0 ? (
                      <ul>
                        {questions.options.map((option, index) => (
                          <li key={`${questions.id}-${index}`}>{option}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>No options available</span>
                    )
                  ) : (
                    <ul>
                      {Object.values(questions.options).map((option, index) => (
                        <li key={`${questions.id}-${index}`}>{option}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </td>
              <td className="flex items-center px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleQuetionSelect(questions.id)}
                >
                  Sửa
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  onClick={() => handleDelete(questions.id)}
                >
                  Xoá
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
