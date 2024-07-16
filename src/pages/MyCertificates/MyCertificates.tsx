import { Container } from "./styles";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Certificates } from "../../components/Certificates/Certificates";

export const MyCertificates = () => {
  return (
    <Container>
      <Header />
      <Certificates />
      <Footer />
    </Container>
  );
};
