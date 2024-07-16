import { Button } from "@mui/material";
import TestPhoto from "./TestPhoto.jpg";
import { CardImage, Container, HeaderFields } from "./style";
import { useNavigate } from "react-router-dom";
import api from "@services/api";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (api.login.logout()) {
      return navigate("/login");
    }
  };
  return (
    <Container>
      <HeaderFields>
        <CardImage src={TestPhoto} />
        <Button variant="text" color="inherit" onClick={() => navigate("/")}>
          Início
        </Button>
        <Button variant="text" color="inherit" onClick={() => navigate("/myCertificates")}>
          Meus certificados
        </Button>
      </HeaderFields>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={handleLogout}
        sx={{ fontWeight: "bold", marginRight: "2rem" }}
      >
        Sair
      </Button>
    </Container>
  );
};
