import { Web } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import LoggerService from "../../../services/LoggerService";


//To Add New Record in Sharepoint List...

 const addItem = async (webUrl: string, listName: string, item: any): Promise<number> => {
  try {
    const web = Web(webUrl);
    const response = await web.lists.getByTitle(listName).items.add(item);

    if (response.data) {
      LoggerService.log(`Added Sucessufully ${response}`);
      return response.data.Id as number;
    } else {
      alert('Failed to add. Please try again.');
      throw new Error('Failed to add item.');
    }
  } catch (error) {
    LoggerService.error(`Error Adding Record ${error}`)
    throw error;
  }
};



//To Get All Records From Sharepoint List...
const getItems = async (webUrl: string, listName: string): Promise<any[]> => {
  try {
    const web = Web(webUrl);
    const response = await web.lists.getByTitle(listName).items.getAll();
    return response;
  } catch (error) {
    LoggerService.error(`Error retrieving items: ${error}`);
    throw error; 
  }
};





//To Get Specific Record From Sharepoint List...
const getItem = async (webUrl: string, listName: string, itemId: number): Promise<any> => {
  try {
    const web = Web(webUrl);
    const response = await web.lists.getByTitle(listName).items.getById(itemId).get();
    return response;
  } catch (error) {
    LoggerService.error('Error retrieving item:');
    throw error; 
  }
};


export { addItem, getItems, getItem };



 






 