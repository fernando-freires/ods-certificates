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
    navigate("/login");
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

export async function getUserData() {
  const web3Obj = getWeb3Obj();
  const userContract = getUserContract(web3Obj);
  const accounts = await web3Obj.eth.getAccounts();

  try {
    const userData = await userContract?.methods.getUser(accounts[0]).call();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateUserData(payload: IInitialRegistration, navigate: NavigateFunction) {
  const web3Obj = getWeb3Obj();
  const userContract = getUserContract(web3Obj);
  const accounts = await web3Obj.eth.getAccounts();

  let eventListenned = false;

  userContract.events.UserUpdated().on("data", event => {
    if (!eventListenned) {
      console.log("Event UserUpdated:", event);
      const { userAddress, name, email } = event.returnValues;
      alert(`Usuário ${name} atualizado com sucesso [${userAddress}]`);
      navigate("/profile");
      eventListenned = true;
    }
  });

  userContract.events.UserUpdated().on("error", event => {
    console.log("Event UserUpdated:", event);
    alert("Erro na atualização do usuário");
  });

  try {
    const userRegistered = await userContract?.methods
      .updateUser(accounts[0], payload.name, payload.email, payload.cpf)
      .send({ from: accounts[0] });
    console.log(userRegistered);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}
