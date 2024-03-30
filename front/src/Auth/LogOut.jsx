import { useNavigate } from "react-router-dom";
import { ApiFunctions } from "../functions/Api";

export const submitLogout = async () => {

    


    try {

      const data = await ApiFunctions.Logout();
    //   console.log(data)
    

    localStorage.clear()

    } catch (error) {
      console.error('Error:', error);

    }
  }