import { Box } from "@mui/material";
import { green } from "@mui/material/colors";

export default function Header(props) {
  return (
    <Box
      sx={{
        position: "sticky",
        bgcolor: "green",
        top: 0,

        padding: "15px",
      }}
    >
      HELLO WORLD
    </Box>
  );
}
