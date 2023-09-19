import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

const StyledHeader = styled.div`
  & {
    position: sticky;
    top: 0;
    z-index: 10;

    padding: 1rem;

    /* Glassy background */
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(5px);
  }
`;
export default function Header(props) {
  return <StyledHeader>HELLO World</StyledHeader>;
}
