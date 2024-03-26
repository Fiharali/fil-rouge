
import { ApiFunctions } from "../../../functions/Api";


export const getUser = async (id) => {

    try {
      const data = await ApiFunctions.getUser(id);
      //console.log(data)
      return data;

      

    } catch (error) {
      console.error('Error:', error);
    }
  };