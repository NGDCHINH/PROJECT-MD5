import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import errorimg from "../../assets/quiz1.png";

interface CardProps {
  id: number;
  title: string;
  category: string;
  maxScore: number;
  image: string;
  passingPercentage: number;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  category: string;
  image: string;
  options: { [key: number]: string };
  correctOption: number;
}

export const QuizForm = () => {
  const location = useLocation();
  const Nav = useNavigate();
  const { card } = location.state as { card: CardProps };
  const questions = card.questions || [];

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(1200);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] =
    useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      if (timer === 0) {
        clearInterval(interval);
        showAlert("Hết giờ", "Bạn đã hết thời gian làm bài.", "info");
        Nav("/app/quiz", { state: { timeout: true } });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const answeredCount = selectedAnswers.filter(
      (answer) => answer !== ""
    ).length;
    setAnsweredQuestionsCount(answeredCount);
  }, [selectedAnswers]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[currentIndex] = option;
      return updatedAnswers;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const score = questions.reduce((acc, question, index) => {
        if (
          selectedAnswers[index] === question.options[question.correctOption]
        ) {
          return acc + 1;
        }
        return acc;
      }, 0);

      const totalScore = (score / questions.length) * card.maxScore;
      const passed =
        (totalScore / card.maxScore) * 100 >= card.passingPercentage;

      showAlert(
        "Kết quả",
        `Tổng điểm của bạn là: ${totalScore}. Bạn đã ${
          passed ? "đậu" : "rớt"
        }. Phần trăm: ${(totalScore / card.maxScore) * 100}%`,
        passed ? "success" : "error"
      );
      const scoreData = {
        score: totalScore,
        total: card.maxScore,
      };

      const jwt = Cookies.get("token");

      await axios.post(
        `http://localhost:8080/score/save/${card.id}`,
        scoreData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      Nav("/app/quiz", { state: { passed: passed } });
    } catch (error) {
      showAlert("Error", "Failed to save score.", "error");
      console.error("Error saving score:", error);
    }
  };

  const showAlert = (title: string, text: string, icon: any) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="bg-gray-200 h-screen w-screen flex items-center justify-center relative">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{card.title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-end">
          <div className="mb-4">
            <label
              htmlFor={`question${currentIndex + 1}`}
              className="block text-gray-700 font-semibold mb-2"
            >
              {questions[currentIndex].question}
            </label>
            <div>
              <img
                src={questions[currentIndex].image || errorimg}
                className="w-[350px] h-64 object-cover mb-4"
                alt={`Question ${currentIndex + 1}`}
              />
            </div>
            {Object.values(questions[currentIndex].options).map(
              (option, index) => (
                <div key={index} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      name={`question${currentIndex + 1}`}
                      value={option}
                      checked={selectedAnswers[currentIndex] === option}
                      onChange={() => handleOptionChange(option)}
                    />{" "}
                    {option}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="flex justify-between w-full">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
          <div className="mt-6 flex justify-center w-full">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="absolute top-0 right-0 m-8">
        <div className="flex items-center">
          <span className="rounded-full bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center">
            {answeredQuestionsCount}
          </span>
          <span className="ml-2">Đã trả lời</span>
        </div>
        <div className="mt-2">
          <span>Thời gian còn lại: {formatTime(timer)} phút</span>
        </div>
      </div>
    </div>
  );
};
