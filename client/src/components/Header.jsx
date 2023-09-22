import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import FlutterDashSharpIcon from "@mui/icons-material/FlutterDashSharp";

export default function Header(props) {
  return (
    <Box
      sx={{
        position: "sticky",
        bgcolor: "rgba(255, 255, 255, 0.4)",
        top: 0,
        width: "auto",
        color: "red",
        padding: "5px",
        borderRadius: "5px",
        zIndex: 10,
        height: "5vh",
      }}
    >
      <Link to="/">
        <FlutterDashSharpIcon sx={{ height: "100%", width: "4%" }} />
      </Link>
    </Box>
  );
}
