import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { ClientPage } from "./pages/client/ClientPage";
import { Cards } from "./components/quiz/Cards";
import { QuizForm } from "./components/quiz/QuizForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/app" element={<ClientPage />}>
          <Route path="quiz" element={<Cards />} />
          <Route path="quiz/:id" element={<QuizForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
