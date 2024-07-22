/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from "web3";
import { storage } from "@services/web3/web3Storage";
import { sign } from "jsonwebtoken";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import { getUserContract } from "../users.contract";

export async function login(web3: Web3<RegisteredSubscription>) {
  if (window.ethereum) {
    try {
      const web3Obj = web3;
      const accounts = await web3Obj.eth.getAccounts();
      const userContract = getUserContract(web3Obj);
      const userRegistered = await userContract?.methods.isUserRegistered(accounts[0]).call();
      console.log(":)");
      console.log(userRegistered);
      console.log(accounts[0]);
      if (!userRegistered) {
        return false;
      }
      const userData = (await userContract?.methods.getUser(accounts[0]).call()) as any;
      const token = sign({ accountId: accounts[0] }, "secret", { expiresIn: "7d" });

      storage.setUserId(accounts[0]);
      storage.setToken(token);
      storage.setUserName(userData.name);
      return true;
    } catch (error) {
      console.error("User denied account access", error);
      return false;
    }
  } else {
    alert("MetaMask not installed, please install");
    return false;
  }
}

export function getWeb3Obj() {
  return new Web3(window.ethereum);
}
