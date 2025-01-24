import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { LandingPage } from "./pages/LandingPage";
import { Page404 } from "./pages/Page404";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard/> : <Navigate to={"/signin"} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to={"/dashboard"} /> : <SignUp/>} />
        <Route path="/signin" element={isAuthenticated ? <Navigate to={"/dashboard"} /> : <SignIn/>} />
        <Route path="/*" element={<Page404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
