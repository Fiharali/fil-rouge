import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import UserCard from "./components/UserCard";
import { deleteUser } from "./functions/deleteUser";
import { getUsers } from "./functions/getUsers";
import { useUserContext } from "../../context/UserContext";
import { isAuth } from "../../roles/isAuth";
import { useNavigate } from "react-router-dom";
import UserCardSkeleton from "./components/UserCardSkeleton";
import { oldUsers } from "./functions/oldUsers";
import OldUsesCard from "./components/OldUsersCard";
import { restoreUser } from "./functions/restore";





export function OldUsers() {

    const UserContext = useUserContext()
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [loadingPage, setLoadingPage] = useState(false);

    useEffect(() => {
        !isAuth() && navigate('/login')
        // checkAdminAndNavigate(UserContext, navigate)
        getOldUsers();
    }, []);


    const getOldUsers = async () => {
        setLoadingPage(true)
        const data = await oldUsers();
        setUsers(data.users);
        setLoadingPage(false)

    };

    const restoreUserFunction = async (id) => {
        if (await restoreUser(id)) {
            await getOldUsers()
        }
    };


    const listUsers = users.map(user => {
        return (
            <OldUsesCard user={user} key={user.id} restoreUser={restoreUserFunction} />
        )
    }
    );

    return (

        <>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-2 mt-10 mx-5">
                {loadingPage ? <UserCardSkeleton /> : listUsers}
            </div>
        </>

    );
}