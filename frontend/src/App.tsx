import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header&etc/HeaderUser";
import { HomePage } from "./pages/home/HomePage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { SignInPage } from "./pages/auth/SignInPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { ClientPage } from "./pages/client/ClientPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/app" element={<ClientPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
