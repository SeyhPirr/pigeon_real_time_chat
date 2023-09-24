import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import { Box, Container } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import ChatContext from "./components/chat/ChatContext.jsx";
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

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
        <ChatContext>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ChatContext>
      </Box>
    </BrowserRouter>
  );
}
