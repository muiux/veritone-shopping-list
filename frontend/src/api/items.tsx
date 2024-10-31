import { AxiosResponse } from "axios";
import { Item } from "../components/ItemsList";
import api from "./index";

type ItemResponse = {
  status: number;
  response: Item;
  message: string;
};

type ItemsResponse = {
  status: number;
  response: Item[];
  message: string;
};

type DeleteItemResponse = {
  status: number;
  response: number;
  message: string;
};

/**
 * Retrieves a list of items from the server.
 *
 * @returns {Promise<Item[]>} A promise that resolves to an array of Item objects.
 */
export const getItems = async (): Promise<Item[]> => {
  try {
    const response: AxiosResponse<ItemsResponse> = await api.get("item");

    return response.data.response;
  } catch (error) {
    throw new Error(`Failed to fetch items: ${error}`);
  }
};

/**
 * Updates an item, optionally modifying a specific property.
 *
 * @param {Item} item - The item object to be updated.
 * @param {keyof Item} [key] - The property to be modified.
 * @param {*} [value] - The new value to assign to the property.
 * @returns {Promise<Item>} A promise that resolves to the updated Item object.
 */
export async function updateItem<T extends keyof Item>(
  item: Item,
  key?: T,
  value?: Item[T]
): Promise<Item> {
  if (key !== undefined && value !== undefined) {
    item[key] = value;
  }

  try {
    const response: AxiosResponse<ItemResponse> = await api.put(
      `item/${item.id}`,
      {
        name: item.name,
        description: item.description,
        quantity: item.quantity,
      }
    );
    return response.data.response;
  } catch (error) {
    throw new Error(`Failed to update item: ${error}`);
  }
}

/**
 * Deletes an item with the specified id.
 *
 * @param {number} itemId - The id of the item to be deleted.
 * @returns {Promise<number>} A promise that resolves to the deleted item's id (number).
 */
export const deleteItem = async (itemId: number): Promise<number> => {
  try {
    const response: AxiosResponse<DeleteItemResponse> = await api.delete(
      `item/${itemId}`
    );
    return response.data.response;
  } catch (error) {
    throw new Error(`Failed to delete item: ${error}`);
  }
};

/**
 * Creates a new item on the server.
 *
 * @param {Item} item - The item object to be created.
 * @returns {Promise<Item>} A promise that resolves to the newly created Item object.
 */
export const createItem = async (item: Item): Promise<Item> => {
  try {
    const response: AxiosResponse<ItemResponse> = await api.post("item", {
      name: item.name,
      description: item.description,
      quantity: item.quantity,
    });
    return response.data.response;
  } catch (error) {
    throw new Error(`Failed to create item: ${error}`);
  }
};
