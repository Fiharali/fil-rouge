import { useUserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

//console.log('UserContext.user.roles')
export const isAdmin = () => {
    const UserContext = useUserContext()
    if (UserContext?.user?.roles?.includes('admin') ?? false) {
        // console.log('UserContext.user')
        return true
    }
    return false

}




export const checkAdminAndNavigate = (userContext, navigateFunction) => {
    console.log(userContext.user)
    // if (!userContext.user?.roles?.includes('admin')) {
    //   navigateFunction('/unauthorized');
    // }
};
