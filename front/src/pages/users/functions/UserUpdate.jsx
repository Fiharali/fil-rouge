import { ApiFunctions } from "../../../functions/Api";

 export const userUpdate = async (id , formData) => {
   
      try {

        const data = await ApiFunctions.editUser(id, formData);
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
    

  };