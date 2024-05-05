import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const Nav = useNavigate();

  interface Quiz {
    id: number;
    title: string;
    category: string;
    passingPercentage: number;
    questions: Question[];
  }

  interface Question {
    id: number;
    question: string;
    category: string;
    maxScore: number;
    image: string;
    options: string[];
    correctOption: string;
  }

  useEffect(() => {
    axios
      .get<Quiz[]>("http://localhost:8080/quizs")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleQuizSelect = (id: number) => {
    setSelectedQuizId(id);
    Nav(`/admin/edit-quiz/${id}`);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8080/quizs/${id}`)
      .then(() => {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz.id !== id)
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
              Quiz title
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Passing Percentage
            </th>
            <th scope="col" className="px-6 py-3">
              Questions
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${index}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${index}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {quiz.title}
              </td>
              <td className="px-6 py-4">{quiz.category}</td>
              <td className="px-6 py-4">{quiz.passingPercentage}%</td>
              <td className="px-6 py-4">
                {Array.isArray(quiz.questions) && quiz.questions.length > 0 ? (
                  <ul>
                    {quiz.questions.map((question, index) => (
                      <li key={`${quiz.id}-${index}`}>{question.question}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No questions available</span>
                )}
              </td>

              <td className="flex items-center px-6 py-4">
                <a
                  href=""
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleQuizSelect(quiz.id)}
                >
                  Sửa
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  onClick={() => handleDelete(quiz.id)}
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
