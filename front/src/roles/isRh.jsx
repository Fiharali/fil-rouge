import { useUserContext } from "../context/UserContext";


//console.log('UserContext.user.roles')
export const isRh = () => {
    const UserContext = useUserContext()
    if (UserContext?.user?.roles?.includes('rh') ?? false) {
        // console.log('UserContext.user')
        return true
    }
    return false

}




export const checkRhAndNavigate = (userContext, navigateFunction) => {
    //console.log(userContext.user)
    if (!userContext.user?.roles?.includes('rh')) {
      navigateFunction('/unauthorized');
    }
};
