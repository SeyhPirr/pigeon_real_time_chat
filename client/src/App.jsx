import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./routes/Signup.jsx";
import { TableHead, Button, Container, Typography } from "@mui/material";
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
      <Container sx={{ bgcolor: "tomato", height: "500vh", width: "100vh" }}>
        <Header />

        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Typography sx={{ p: 60 }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          laborum nihil assumenda officiis, ipsum eum rem iure illum dolorum,
          aliquam laboriosam est cupiditate recusandae facilis id corrupti?
          Velit, non officiis? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ullam, ipsa. Laborum, exercitationem quas hic
          perferendis repellendus animi architecto debitis libero nam laboriosam
          fugiat reprehenderit veritatis beatae praesentium, cum eligendi
          minima! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
          repudiandae maxime quam? Odio, blanditiis. Similique, illum obcaecati,
          quae reiciendis laudantium eveniet quia deleniti neque impedit
          inventore iure laboriosam magni magnam! Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Cum repellat, alias fuga reprehenderit
          totam distinctio, eius tenetur accusamus at modi labore corrupti
          cumque in nulla animi veniam minima, deleniti Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Repudiandae, perspiciatis ea
          aliquam esse ipsa vel omnis in at expedita ullam quaerat velit eos
          officiis numquam quod itaque minima, repellendus voluptates!
        </Typography>
      </Container>
    </BrowserRouter>
  );
}
