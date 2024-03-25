import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { ApiFunctions } from "../../functions/Api";
import { z } from "zod";
import { addUser } from "../../lib/validations/validation";











export function Users() {

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
        //console.log(file);
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
        setSelectedFile(file);

    };



    useEffect(() => {
        getAllUsers();
    }, []);
    const getAllUsers = async () => {

        try {
            const data = await ApiFunctions.getAllUsers();
            console.log(data.users);
            setUsers(data.users);
            setCities(data.cities);
            setCampuses(data.campuses)
            setClassNames(data.class_names)
            setLevels(data.levels)
            setPromotions(data.promotions)
            setRoles(data.roles)

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const deleteUser = async (id) => {

        const confirmationResult = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirmationResult.isConfirmed) {
            try {
                await ApiFunctions.deleteUser(id);

                getAllUsers();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete user",
                    icon: "error"
                });
            }
        }
    };



    const handleSubmit = async (e) => {
        // console.log('Submit')
        e.preventDefault();
        if (validate()) {

            try {

                const data = await ApiFunctions.addUser(formData);
                //console.log(data);

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
                setSelectedFile(null)
                if (modalButtonRef.current) {
                    modalButtonRef.current.click();
                }

                Swal.fire({
                    //position: "top",
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });
                getAllUsers();

            } catch (error) {
                console.error('Error:', error);
                setErrors(prevState => ({
                    ...prevState,
                    image: error.response?.data.error ?? error.response.data.message
                }));
            }
        }
    };

    const listUsers = users.map(user => {


        return (
            <div key={user.id} class="max-w-sm w-full  mx-auto  rounded-lg overflow-hidden shadow-lg ">
                <div class="border-b px-4 pb-6">
                    <div class="text-center my-4">
                        <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src={user.image ? user.image : 'https://randomuser.me/api/portraits/women/21.jpg'} alt="" />

                        <div class="py-2">
                            <h3 class="font-bold text-2xl  mb-1">{user.first_name} {user.last_name}</h3>
                            <div class="inline-flex  items-center">
                                <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path class=""
                                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                </svg>
                                {user.class_name.name}

                            </div>
                            <br />
                            {user.roles.join(', ')}
                        </div>
                    </div>
                    <div class="flex gap-2 justify-center">
                        <Button color="green">Edit</Button>
                        <Button color="red" onClick={() => deleteUser(user.id)} >Delete</Button>

                    </div>
                </div>
            </div>
        )
    }
    );




    return (


        <>



            <div className=" grid grid-flow-col justify-stretch   items-end mt-5    ">
                <form class="max-w-lg   ms-5 hidden md:inline">
                    <div class="flex">
                        <label for="search-dropdown" class="mb-2 text-sm font-medium  sr-only ">Your Email</label>
                        <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100  dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg></button>
                        <div id="dropdown" class="z-10 hidden  divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700  ">
                            <ul class="py-2 text-sm " aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                </li>
                            </ul>
                        </div>
                        <div class="relative w-full">
                            <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm  rounded-e-lg border-s-2 border " placeholder="Search with name" />
                            <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>
                <Button color="blue" className=" py-3 min-w-2/6 mx-auto " data-modal-target="add-user" data-modal-toggle="add-user" type="button"  >Add New User </Button>

                <div id="add-user" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  max-h-full" ref={modalButtonRef}>
                    <div class="relative p-4 pb-8 w-full md:w-3/5 max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New User
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="add-user">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form class="p-4 md:p-5 pb-8" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div class="grid gap-4 mb-4 grid-cols-2 pb-8">


                                    <div className="flex items-center justify-center max-w-1/2 mx-auto rounded-full col-span-2 mt-5">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center max-w-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            {selectedFile ? (
                                                <div className="w-full h-64 overflow-hidden">
                                                    <img src={URL.createObjectURL(selectedFile)} alt="Selected file" className="object-cover w-full h-full" />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-5">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                            )}
                                            <input id="dropzone-file" type="file" className="hidden" name="image" onChange={handleFileChange} accept="image/png, image/jpeg ,image/jpg" />
                                        </label>
                                        {errors.image && <span className="text-red-500 text-left ms-5">{errors.image}</span>}
                                    </div>

                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input type="text" name="first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="first name" onChange={handleChange} value={formData.first_name} />
                                        {errors.first_name && <span className="text-red-500 text-left ms-5">{errors.first_name}</span>}
                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                        <input type="text" name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="last name" onChange={handleChange} value={formData.last_name} />
                                        {errors.last_name && <span className="text-red-500 text-left ms-5">{errors.last_name}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="email" onChange={handleChange} value={formData.email} />
                                        {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">number</label>
                                        <input type="text" name="number" id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="number" onChange={handleChange} value={formData.number} />
                                        {errors.number && <span className="text-red-500 text-left ms-5">{errors.number}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" onChange={handleChange} value={formData.password} />
                                        {errors.password && <span className="text-red-500 text-left ms-5">{errors.password}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="city_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                        <select name="city_id" id="city_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} >
                                            <option value=""> choose city</option>
                                            {
                                                cities.map(city => (
                                                    <option value={city.id}> {city.name}</option>

                                                ))
                                            }
                                        </select>
                                        {errors.city_id && <span className="text-red-500 text-left ms-5">{errors.city_id}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="campus_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">campus</label>
                                        <select name="campus_id" id="campus_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} >
                                            <option value=""> choose campus </option>
                                            {
                                                campuses.map(campus => (
                                                    <option value={campus.id}> {campus.name}</option>

                                                ))
                                            }
                                        </select>
                                        {errors.campus_id && <span className="text-red-500 text-left ms-5">{errors.campus_id}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="promotion_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promotion</label>
                                        <select name="promotion_id" id="promotion_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} >
                                            <option value=""> choose Promotion</option>
                                            {
                                                promotions.map(promotion => (
                                                    <option value={promotion.id}> {promotion.name}</option>

                                                ))
                                            }
                                        </select>
                                        {errors.promotion_id && <span className="text-red-500 text-left ms-5">{errors.promotion_id}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="level_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                                        <select name="level_id" id="level_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} >
                                            <option value=""> choose Level</option>
                                            {
                                                levels.map(level => (
                                                    <option value={level.id}> {level.name}</option>

                                                ))
                                            }
                                        </select>
                                        {errors.level_id && <span className="text-red-500 text-left ms-5">{errors.level_id}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="class_name_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                                        <select name="class_name_id" id="class_name_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} >
                                            <option value=""> choose Class Name </option>
                                            {
                                                classNames.map(className => (
                                                    <option value={className.id}> {className.name}</option>

                                                ))
                                            }
                                        </select>
                                        {errors.class_name_id && <span className="text-red-500 text-left ms-5">{errors.class_name_id}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">roles</label>
                                        <select name="role[]" id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" multiple size="1" onChange={(e) => {
                                            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                            setFormData(prevState => ({
                                                ...prevState,
                                                role: selectedOptions
                                            }));
                                        }} >

                                            {
                                                roles.map(role => (
                                                    <option value={role.id}> {role.name}</option>

                                                ))
                                            }
                                        </select>
                                        {errors.role && <span className="text-red-500 text-left ms-5">{errors.role}</span>}

                                    </div>

                                </div>

                                <div class="col-span-2 sm:col-span-1">
                                    <Button type="submit" fullWidth>Add </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  gap-2 mt-10 mx-5">
                {listUsers}
            </div>
        </>

    );
}