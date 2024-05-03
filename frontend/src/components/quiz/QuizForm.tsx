import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface CardProps {
  id: number;
  title: string;
  category: string;
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
  const { card } = location.state as { card: CardProps };
  const questions = card.questions || [];

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    setTimer(60);
    setSelectedAnswers(Array(questions.length).fill(""));
  }, [currentIndex, questions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected answers:", selectedAnswers);
  };

  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{card.title}</h2>{" "}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor={`question${currentIndex + 1}`}
              className="block text-gray-700 font-semibold mb-2"
            >
              {questions[currentIndex].question}
            </label>
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="font-semibold">Time Remaining:</span>{" "}
            {timer > 0 ? timer : "Time's up!"}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
