import { useNavigate } from "react-router-dom";
import { ApiFunctions } from "../functions/Api";

export const submitLogout = async () => {

  // const navigate = useNavigate()




  try {

    const data = await ApiFunctions.Logout();
    // console.log('daaata')
    localStorage.clear()
    // navigate('/login')

  } catch (error) {
    console.error('Error:', error);

  }
}