import { getCertificatesContract } from "../certificates.contract";
import { getWeb3Obj } from "../login";

export async function checkUserCertificate(courseId: string) {
  const web3Obj = getWeb3Obj();
  const accounts = await web3Obj.eth.getAccounts();
  const certificateContract = getCertificatesContract(web3Obj);
  try {
    const hasCertificate = await certificateContract?.methods.getCertificateByCourseId(accounts[0], courseId).call();
    return hasCertificate;
  } catch (error) {
    return false;
  }
}

export async function createUserCertificate(courseName: string, courseId: string, completionDate: number, callback) {
  const web3Obj = getWeb3Obj();
  const accounts = await web3Obj.eth.getAccounts();
  const certificateContract = getCertificatesContract(web3Obj);

  certificateContract.events.CertificateAdded().on("data", event => {
    console.log("Event CertificateAdded:", event);
    // const { userAddress, courseName, courseId, certificateHash, completionDate } = event.returnValues;
    alert("Certificado Gerado com sucesso!");
    callback(event.returnValues);
  });

  try {
    const certification = certificateContract?.methods
      .addCertificate(accounts[0], courseName, courseId, completionDate)
      .send({ from: accounts[0] });
  } catch (error) {
    return false;
  }
}
