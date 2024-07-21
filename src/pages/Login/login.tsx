import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "@services/web3/login";
import { storage } from "@services/web3/web3Storage";
import Web3 from "web3";
import { getUserContract } from "@services/web3/users.contract";

export function Login() {
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Obj = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error: any) {
        alert(error.message);
        return;
      }
      const userLogged = await login(web3Obj);

      if (!userLogged) {
        navigate("/register");
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <Grid
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      marginTop="2rem"
    >
      <Typography variant="h4" fontWeight="600">
        Login
      </Typography>
      <Card
        elevation={9}
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "3em auto",
          padding: "1rem",
        }}
      >
        <button onClick={connectWallet}>
          {storage.getUserId() ? `Conectado: ${storage.getUserId()}` : "Connect Wallet"}
        </button>
      </Card>
    </Grid>
  );
}
