/* eslint-disable @typescript-eslint/no-explicit-any */
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import { checkUserCertificate, createUserCertificate } from "@services/web3/certificate";
import { storage } from "@services/web3/web3Storage";
import { useState } from "react";
import { CardImage, CardTitle, Certificate, Container, ProgressBar } from "./styles";
import TestPhoto from "./TestPhoto.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "24px",
};

const confirmationStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "8px",
};

export const Certificates = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [candidateCert, setCandidateCert] = useState<any>(null);

  const handleOpen = (certificate: any) => {
    checkUserCertificate(certificate.id).then((response: any) => {
      if (response == false) {
        setCandidateCert(certificate);
        setConfirmOpen(true);
      } else {
        response.completionDate = convertDate(response.completionDate);
        setSelectedCertificate(response);
        setOpen(true);
      }
    });
  };

  const convertDate = (timestamp: Date) => {
    const date = new Date(Number(timestamp));

    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const ano = date.getFullYear();

    return `em ${dia} de ${mes} de ${ano}.`;
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmOpen(false);
    setSelectedCertificate(null);
  };

  const handleCertiticateGenerated = (cert: any) => {
    cert.completionDate = convertDate(cert.completionDate);
    setSelectedCertificate(cert);
    setConfirmOpen(false);
    setOpen(true);
  };

  const handleConfirm = () => {
    createUserCertificate(candidateCert.name, candidateCert.id, Date.now(), handleCertiticateGenerated);
  };

  const handleDownload = () => {
    // Lógica para download do certificado
    alert("Download iniciado");
  };

  return (
    <>
      <Container>
        {[
          { name: "Curso 1", id: "c1", completionDate: "22/01/2004" },
          { name: "Curso 2", id: "c2", completionDate: "22/01/2004" },
          { name: "Curso 3", id: "c3", completionDate: "22/01/2004" },
          { name: "Curso 4", id: "c4", completionDate: "22/01/2004" },
        ].map((course, index) => (
          <Certificate key={index} onClick={() => handleOpen(course)}>
            <CardImage src={TestPhoto} />
            <CardTitle>{course.name}</CardTitle>
            <ProgressBar progress={90} />
          </Certificate>
        ))}
      </Container>

      <Modal open={confirmOpen} onClose={handleClose}>
        <Box sx={confirmationStyle}>
          <Typography variant="h6">Deseja emitir certificado?</Typography>
          <Box mt={2} display="flex" justifyContent="space-evenly">
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Não
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Sim
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton onClick={handleDownload} sx={{ position: "absolute", top: 16, right: 16 }}>
            <DownloadIcon />
          </IconButton>
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mt: 2 }}>
            Certificado de Conclusão
          </Typography>
          <Grid height="65%" display="flex" flexDirection="column" justifyContent="space-evenly">
            <Typography variant="h5">Certificamos que</Typography>
            <Typography variant="h3">{storage.getUserName()}</Typography>
            <Typography variant="h5" sx={{ mt: 5 }}>
              concluiu com êxito o curso de
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {selectedCertificate == null ? "" : selectedCertificate.courseName}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {selectedCertificate == null ? "" : selectedCertificate.completionDate}
            </Typography>
          </Grid>
          <Typography sx={{ mt: 4, textAlign: "right" }}>
            {selectedCertificate == null ? "" : selectedCertificate.certificateHash}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
