import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./routes/Signup.jsx";
import Header from "./Header.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
