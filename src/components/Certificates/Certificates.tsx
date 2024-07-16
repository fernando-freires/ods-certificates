import { CardImage, CardTitle, Certificate, Container, ProgressBar } from "./styles";
import TestPhoto from "./TestPhoto.jpg";
import { Typography } from "@mui/material";

export const Certificates = () => {
  return (
    <Container>
      <Certificate>
        <CardImage src={TestPhoto} />
        <CardTitle>Curso 1</CardTitle>
        <ProgressBar progress={90} />
      </Certificate>
      <Certificate>
        <CardImage src={TestPhoto} />
        <CardTitle>Curso 2</CardTitle>
        <ProgressBar progress={90} />
      </Certificate>
      <Certificate>
        <CardImage src={TestPhoto} />
        <CardTitle>Curso 3</CardTitle>
        <ProgressBar progress={90} />
      </Certificate>
      <Certificate>
        <CardImage src={TestPhoto} />
        <CardTitle>Curso 4</CardTitle>
        <ProgressBar progress={90} />
      </Certificate>
    </Container>
  );
};
