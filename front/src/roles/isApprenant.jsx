import { useUserContext } from '../context/UserContext'

export default function isApprenant() {
    const UserContext = useUserContext()
    if (UserContext?.user?.roles?.includes('apprenant') ?? false) {
        return true
    }
    return false
}


export const checkApprenantAndNavigate = (userContext, navigateFunction) => {
    //console.log(userContext.user)
    if (!userContext.user?.roles?.includes('apprenant')) {
        navigateFunction('/unauthorized');
    }
};