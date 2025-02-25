import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Score {
  id: number;
  score: number;
  total: number;
  percentage: number;
  result: string;
  quiz: Quiz;
  user: User;
}
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

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

export const AdminScore: React.FC = () => {
  const [adminScores, setAdminScores] = useState<Score[]>([]);

  useEffect(() => {
    axios
      .get<Score[]>("http://localhost:8080/score")
      .then((response) => {
        setAdminScores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8080/score/${id}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Xoá thành công",
        });
        // Sau khi xóa, cập nhật lại danh sách score
        setAdminScores(adminScores.filter((score) => score.id !== id));
      })
      .catch((error) => {
        console.error("Xoá không thành công: ", error);
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
              Điểm
            </th>
            <th scope="col" className="px-6 py-3">
              Điểm đạt
            </th>
            <th scope="col" className="px-6 py-3">
              Phần trăm đạt
            </th>
            <th scope="col" className="px-6 py-3">
              Quiz
            </th>
            <th scope="col" className="px-6 py-3">
              Người test
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {adminScores.map((score) => (
            <tr
              key={score.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${score.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${score.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {score.score}
              </td>
              <td className="px-6 py-4">{score.total}</td>
              <td className="px-6 py-4">{score.percentage}%</td>
              <td className="px-6 py-4">
                {score.quiz && <span>{score.quiz.title}</span>}
              </td>
              <td className="px-6 py-4">
                {score.user && (
                  <ul>
                    <li key={score.user.id}>{score.user.username}</li>
                  </ul>
                )}
              </td>
              <td className="flex items-center px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  onClick={() => handleDelete(score.id)}
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
