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
import UserCardSkeleton from "./components/UserCardSkeleton";
import Pagination from "../../components/Pagination";
import { getSearchUsers } from "./functions/userSearch";





export function Users() {

    const UserContext = useUserContext()
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
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});
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
    const [formDataSearch, setFormDataSearch] = useState({
        role: '',
        query: '',
    });

    const modalButtonRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleChangeSearch = (e) => {
        const { name, value } = e.target;
        setFormDataSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const performSearch = async (page = 1) => {
        setLoadingPage(true);
        const data = await getSearchUsers(page, formDataSearch);
        console.log(data);
        setUsers(data.users);
        setPagination(data.pagination);
        setLoadingPage(false);
    };

    useEffect(() => {
        !isAuth() && navigate('/login')
        //getAllUsers();
        performSearch();
    }, [formDataSearch]);

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

    const getAllUsers = async (page = 1) => {
        setLoadingPage(true)
        const data = await getUsers(page);
        //console.log(data);
        setPagination(data.pagination);
        setUsers(data.users);
        setCities(data.cities);
        setCampuses(data.campuses)
        setClassNames(data.class_names)
        setLevels(data.levels)
        setPromotions(data.promotions)
        setRoles(data.roles)
        setLoadingPage(false)

    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getAllUsers(page);
    };

    const deleteUserFunction = async (id) => {
        if (await deleteUser(id)) {
            await getAllUsers()
        }
    };

    const submitUserCreate = async (e) => {
        // console.log('Submit')
        setLoading(true)
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


            setLoading(false)



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
                <SearchBar roles={roles} handleChangeSearch={handleChangeSearch} />
                <Button color="blue" className=" py-3 min-w-2/6 mx-auto " data-modal-target="add-user" data-modal-toggle="add-user" type="button"  >Add New User </Button>

                <UserCreate
                    handleChange={handleChange} selectedFile={selectedFile} handleFileChange={handleFileChange}
                    errors={errors} formData={formData} cities={cities} campuses={campuses} promotions={promotions}
                    levels={levels} classNames={classNames} setFormData={setFormData} roles={roles}
                    submitUserCreate={submitUserCreate} modalButtonRef={modalButtonRef} loading={loading}
                />
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-2 mt-10 mx-5">

                {loadingPage ? <UserCardSkeleton /> : listUsers}

            </div>

            <Pagination pagination={pagination} handlePageChange={handlePageChange} />
        </>

    );
}