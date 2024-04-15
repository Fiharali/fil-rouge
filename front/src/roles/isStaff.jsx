import { useUserContext } from "../context/UserContext";

export const isStaff = () => {
    const UserContext = useUserContext()
    if (UserContext?.user?.roles?.includes('staff') ?? false) {
        // console.log('UserContext.user')
        return true
    }
    return false

}




export const checkStaffAndNavigate = (userContext, navigateFunction) => {
    //console.log(userContext.user)
    if (!userContext.user?.roles?.includes('staff')) {
         navigateFunction('/unauthorized');
    }
};
