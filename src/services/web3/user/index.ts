import { IInitialRegistration } from "@interfaces/index";
import { getWeb3Obj } from "../login";
import { getUserContract } from "../users.contract";
import { NavigateFunction } from "react-router-dom";

export async function createUser(payload: IInitialRegistration, navigate: NavigateFunction) {
  const web3Obj = getWeb3Obj();
  const userContract = getUserContract(web3Obj);
  const accounts = await web3Obj.eth.getAccounts();

  userContract.events.UserRegistered().on("data", event => {
    console.log("Event UserRegistered:", event);
    const { userAddress, name, email } = event.returnValues;
    alert(`Usuário ${name} cadastrado [${userAddress}]`);
  });

  try {
    const userRegistered = await userContract?.methods
      .registerUser(accounts[0], payload.name, payload.email, payload.cpf)
      .send({ from: accounts[0] });
    console.log(userRegistered);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}
