import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../../assets/quiz2.png";
import { useNavigate } from "react-router-dom";

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
  options: string[];
  correctOption: string;
}

export const Cards = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const Nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/quizs")
      .then((response) => {
        setCards(response.data);
        console.log("cards data", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (cards.length === 0) {
    return null;
  }

  const handleStartQuiz = (card: CardProps) => {
    Nav(`${card.id}`, { state: { card } });
  };

  return (
    <div className="ml-10 mt-10 h-64 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#" onClick={() => handleStartQuiz(card)}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h5>
          </a>
          <div className="flex justify-center">
            {card.image ? (
              <img
                src={card.image}
                className="h-32 object-cover"
                alt={card.title}
              />
            ) : (
              <img
                src={defaultImage}
                className="h-32 object-cover"
                alt="Default Image"
              />
            )}
          </div>
          <p className="mt-2 mb-3 text-gray-700 dark:text-gray-400">
            {card.category}
          </p>
          <div
            onClick={() => handleStartQuiz(card)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Take Quiz
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
