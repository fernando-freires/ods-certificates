import { Typography } from "@mui/material";
import Card from "../../components/Card/Card";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Container, ScrollWrapper } from "./styles";
import TestPhoto from "./TestPhoto.jpg";
import { storage } from "@services/web3/web3Storage";

export function Home() {
  return (
    <Container>
      <Header />
      <Typography variant="h3" marginTop="2rem" paddingLeft="2rem">
        {`Olá, ${storage.getUserName()}! deseja continuar algum curso hoje?`}
      </Typography>
      <ScrollWrapper>
        <Card imageSrc={TestPhoto} title="Introdução ao Python" progress={50} />
        <Card imageSrc={TestPhoto} title="Desenvolvimento Web com React" progress={100} />
        <Card imageSrc={TestPhoto} title="Desenvolvimento de Aplicativos com Flutter" progress={50} />
        <Card imageSrc={TestPhoto} title="JavaScript Avançado" progress={90} />
        <Card imageSrc={TestPhoto} title="Desenvolvimento de APIs com Node.js" progress={99} />
        <Card imageSrc={TestPhoto} title="Machine Learning com Python" progress={100} />
      </ScrollWrapper>
      <Footer />
    </Container>
  );
}
