import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./routes/Signup.jsx";
import { TableHead, Button, Container } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header.jsx";

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
      <Container sx={{bgcolor:}}>
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
