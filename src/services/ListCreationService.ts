import { sp } from '@pnp/sp';

export const ListCreationService = {
  createListIfNotExists: async (listName: string, columns: any[], records:any[]): Promise<void> => {
    // Check if the list already exists
    console.log(`Checking if list '${listName}' exists...`);
    const listExists = await sp.web.lists.getByTitle(listName).select('Id').get().then(
      () => true,
      () => false
    );

    if (!listExists) {
      // Create the list if it doesn't exist
      console.log(`List '${listName}' does not exist. Creating...`);
      await sp.web.lists.ensure(listName, '', 100);
      
      const list = await sp.web.lists.getByTitle(listName);
      const titleField = await list.fields.getByTitle("Title").get();
      titleField.Required  = await false;

      await ListCreationService.addColumnsToList(listName, columns, records);
      console.log(`List '${listName}' created successfully with columns.`);
    } else {
      console.log(`List '${listName}' already exists.`);
    }
  },


  addRecord: async (listName:string,records:any[]) :Promise<void> => {
   
    if(records.length > 0)
    {
      for (const record of records) {
        try {
          await sp.web.lists.getByTitle(listName).items.add(record);
          console.log(`Item added successfully.`);
        } catch (error) {
          console.error('Error adding item:', error);
        }
      }
    }
    }
  ,

  addColumnsToList: async (listName: string, columns: any[], records:any[]): Promise<void> => {
    const list = sp.web.lists.getByTitle(listName);

    if (columns.length > 0) {
      for (const column of columns) {
        switch (column.type) {
          case 'Text':
            console.log(`Adding Text column '${column.name}' to list '${listName}'...`);
            await list.fields.addText(column.name);
            break;
          case 'Number':
            console.log(`Adding Number column '${column.name}' to list '${listName}'...`);
            await list.fields.addNumber(column.name);
            break;
            case 'Boolean':
              console.log(`Adding Number column '${column.name}' to list '${listName}'...`);
              await list.fields.addBoolean(column.name,{'DefaultFormula':'0'});
              break;
          case 'Lookup':
            console.log(`Adding lookup column '${column.name}' to list '${listName}'...`);
            // Fetch the ID of the lookup list
            const lookupList = await sp.web.lists.getByTitle(column.lookupList).select('Id').get();
            const lookupListId = lookupList.Id;
            await list.fields.addLookup(column.name, lookupListId, column.lookupField);
            break;
        }
      };
      console.log(`Columns added to list '${listName}' successfully.`);
  
    }
    await ListCreationService.addRecord(listName, records);
  },

  createListWithColumns: async (listName: string, columns: any[],records:any[]): Promise<void> => {
    await ListCreationService.createListIfNotExists(listName, columns, records);
  },
};
