import { useUserContext } from "../context/UserContext";

//console.log('UserContext.user.roles')
export const isAdmin = () => {
    const UserContext = useUserContext()
    // console.log(UserContext.user.roles)
    // console.log(UserContext.user.roles)

    if (UserContext?.user?.roles?.includes('admin') ?? false) {
        // console.log('UserContext.user')
        return true
    }
    return false

}