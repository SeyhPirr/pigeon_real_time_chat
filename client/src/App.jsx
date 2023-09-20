import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import { Container } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
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
      <Container
        sx={{
          display: "static",
          bgcolor: "rgba(30, 139, 195)",
          height: "100vh",
          width: "auto",
          justifyContent: "center",
          alignItems: "stretch",
          top: 0,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
