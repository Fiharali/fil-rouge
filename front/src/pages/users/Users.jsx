import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ApiFunctions } from "../../functions/Api";
import { z } from "zod";
import { addUser } from "../../lib/validations/validation";
import UserCard from "./components/UserCard";
import UserCreate from "./components/UserCreate";
import SearchBar from "./components/SearchBar";
import { deleteUser } from "./functions/deleteUser";
import { createUser } from "./functions/createUser";
import { getUsers } from "./functions/getUsers";
import { UserStateContext, useUserContext } from "../../context/UserContext";
import { isAuth } from "../../roles/isAuth";
import { useNavigate } from "react-router-dom";





export function Users() {

    const UserContext = useUserContext()
   // console.log(UserContext)
   const navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [cities, setCities] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [levels, setLevels] = useState([]);
    const [classNames, setClassNames] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        number: '',
        password: '',
        level_id: '',
        class_name_id: '',
        promotion_id: '',
        campus_id: '',
        city_id: '',
        role: '',
        image: null,
    });


    const modalButtonRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const validate = () => {
        try {
            addUser.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
        setSelectedFile(file);

    };



    useEffect(() => {
        !isAuth() && navigate('/login')
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const data = await getUsers();
        //console.log(data);
        setUsers(data.users);
        setCities(data.cities);
        setCampuses(data.campuses)
        setClassNames(data.class_names)
        setLevels(data.levels)
        setPromotions(data.promotions)
        setRoles(data.roles)

    };


    const deleteUserFunction = async (id) => {
        if (await deleteUser(id)) {
            await getAllUsers()
        }
    };



    const submitUserCreate = async (e) => {
        // console.log('Submit')
        e.preventDefault();
        if (validate()) {

            const { success, data, error } = await createUser(formData);
            if (success) {
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    number: '',
                    password: '',
                    level_id: '',
                    class_name_id: '',
                    promotion_id: '',
                    campus_id: '',
                    city_id: '',
                    role: '',
                    image: null,
                });
                setSelectedFile(null);
                if (modalButtonRef.current) {
                    modalButtonRef.current.click();
                }
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });
                getAllUsers();
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    image: error.response?.data.error ?? error.response.data.message
                }));
            }





        }
    };

    const listUsers = users.map(user => {
        return (
            <UserCard user={user} key={user.id} deleteUser={deleteUserFunction} />
        )
    }
    );




    return (


        <>



            <div className=" grid grid-flow-col justify-stretch   items-end mt-5    ">
                <SearchBar />
                <Button color="blue" className=" py-3 min-w-2/6 mx-auto " data-modal-target="add-user" data-modal-toggle="add-user" type="button"  >Add New User </Button>

                <UserCreate
                    handleChange={handleChange} selectedFile={selectedFile} handleFileChange={handleFileChange}
                    errors={errors} formData={formData} cities={cities} campuses={campuses} promotions={promotions}
                    levels={levels} classNames={classNames} setFormData={setFormData} roles={roles}
                    submitUserCreate={submitUserCreate} modalButtonRef={modalButtonRef}
                />
            </div>


            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-2 mt-10 mx-5">
                {listUsers}
            </div>
        </>

    );
}