import { Typography } from "@mui/material";
import { CardContent, CardImage, CardInfoContainer, CardTitle, CardWrapper, Percentage, ProgressBar } from "./styles";

export default function Card({ imageSrc, title, progress }) {
  return (
    <CardWrapper>
      <CardImage src={imageSrc} alt={title} />
      <CardContent>
        {progress < 100 && <Percentage>{progress}%</Percentage>}

        <CardInfoContainer>
          <CardTitle>{title}</CardTitle>
          <ProgressBar progress={progress} />
        </CardInfoContainer>
      </CardContent>
      {progress === 100 && (
        <Typography variant="body1" color="#008a00" fontWeight="bold">
          Curso finalizado!
        </Typography>
      )}
    </CardWrapper>
  );
}
