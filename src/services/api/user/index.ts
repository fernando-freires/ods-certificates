import { IGetProducts, IInitialRegistration, IProducts } from "@interfaces/index";
import { client } from "../instance";

export async function createUser(payload: IInitialRegistration) {
  try {
    await client.createUser(payload);
  } catch (error) {
    return false;
  }
}

export async function getProductsByUserId(id: string): Promise<IGetProducts[]> {
  const { data } = await client.get(`products?userId=${id}`);
  return data;
}

export async function getProductById(productId: string): Promise<IGetProducts> {
  const { data } = await client.get(`products/${productId}`);
  return data;
}

export async function createProduct(payload: IProducts) {
  try {
    await client.createUserProduct(payload);
  } catch (error) {
    return false;
  }
}

export async function editUserProduct(payload: IProducts, productId: string) {
  try {
    await client.editProduct(payload, productId);
    return true;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    return false;
  }
}
