/* eslint-disable @typescript-eslint/no-explicit-any */
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";
import { useRef } from "react";

const CertificateGenerator = ({ userName, certificateHash, courseName, currentDate }: any) => {
  const certificateRef: any = useRef();

  const handleDownload = () => {
    if (certificateRef.current === null) {
      return;
    }

    toPng(certificateRef.current as any)
      .then(dataUrl => {
        saveAs(dataUrl, "certificado.png");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        ref={certificateRef}
        style={{
          width: "600px",
          height: "400px",
          border: "2px solid #000",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <h1 style={styles.title}>Certificado de Conclusão</h1>
        <p style={styles.text}>Certificamos que</p>
        <h2 style={styles.name}>{userName}</h2>
        <p style={styles.text}>concluiu com êxito o curso de</p>
        <h2 style={styles.course}>{courseName}</h2>
        <p style={styles.text}>{currentDate}</p>
        <p style={{ fontSize: "18px", position: "absolute", bottom: "20px", right: "20px" }}>{certificateHash}</p>
      </div>
      <button onClick={handleDownload} style={styles.button}>
        Download Certificado
      </button>
    </div>
  );
};

const styles = {
  certificate: {
    width: "600px",
    height: "400px",
    border: "2px solid #000",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fff",
    position: "relative",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    margin: "10px 0",
  },
  name: {
    fontSize: "22px",
    margin: "10px 0",
    fontWeight: "bold",
  },
  course: {
    fontSize: "22px",
    margin: "10px 0",
    fontWeight: "bold",
  },
  signature: {
    fontSize: "18px",
    position: "absolute",
    bottom: "20px",
    right: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default CertificateGenerator;
