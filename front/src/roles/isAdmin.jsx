import { useUserContext } from "../context/UserContext";

console.log('UserContext.user.roles')
export const isAdmin = () => {
    const UserContext = useUserContext()
    console.log(UserContext.user.roles)
    console.log('UserContext.user.roles')
    if (UserContext.user.roles.includes('admin')) {
        return true
    }
    return false
}