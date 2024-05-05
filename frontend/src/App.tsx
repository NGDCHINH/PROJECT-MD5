import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { ClientPage } from "./pages/client/ClientPage";
import { Cards } from "./components/quiz/Cards";
import { QuizForm } from "./components/quiz/QuizForm";
import { QuizList } from "./components/quiz/QuizList";
import { CreateForm } from "./components/quiz/CreateForm";
import { QuestionList } from "./components/questions/QuestionList";
import { CreateFormQuestion } from "./components/questions/CreateFormQuestion";
import { UpdateForm } from "./components/quiz/UpdateForm";
import { UpdateFormQuestion } from "./components/questions/UpdateFormQuestion";
import { AdminScore } from "./components/score/AdminScore";
import { UserScore } from "./components/score/UserScore";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="quiz" element={<QuizList />} />
          <Route path="create-quiz" element={<CreateForm />} />
          <Route path="edit-quiz/:id" element={<UpdateForm />} />
          <Route path="questions" element={<QuestionList />} />
          <Route path="create-question" element={<CreateFormQuestion />} />
          <Route path="edit-question/:id" element={<UpdateFormQuestion />} />
          <Route path="score" element={<AdminScore />}></Route>
        </Route>

        <Route path="/app" element={<ClientPage />}>
          <Route path="quiz" element={<Cards />} />
          <Route path="quiz/:id" element={<QuizForm />} />
          <Route path="score" element={<UserScore />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
