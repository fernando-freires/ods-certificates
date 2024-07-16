import { Typography } from "@mui/material";
import { Container } from "./style";

export const Footer = () => {
  return (
    <Container>
      <Typography variant="caption" color="#000" sx={{ opacity: 0.6 }}>
        Direitos reservados a LearnPath &copy;
      </Typography>
    </Container>
  );
};
