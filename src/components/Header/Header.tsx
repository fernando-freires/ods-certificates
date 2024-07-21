import { Button, Grid } from "@mui/material";
import Logo from "./Logo.png";
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
        <CardImage src={Logo} onClick={() => navigate("/")} />
        <Button variant="text" color="inherit" onClick={() => navigate("/")}>
          Início
        </Button>
        <Button variant="text" color="inherit" onClick={() => navigate("/myCertificates")}>
          Meus certificados
        </Button>
      </HeaderFields>
      <Grid>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleLogout}
          sx={{ fontWeight: "bold", marginRight: "2rem" }}
        >
          Sair
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/profile")}
          sx={{ fontWeight: "bold", marginRight: "2rem" }}
        >
          Meu perfil
        </Button>
      </Grid>
    </Container>
  );
};
