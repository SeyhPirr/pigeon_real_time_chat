import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import { Box } from "@mui/material";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import ChatContext from "./components/chat/ChatContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundImage: "linear-gradient(to right, #40b3c7 , #ffd6ed);",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <ChatContext>
                <Home />
              </ChatContext>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
