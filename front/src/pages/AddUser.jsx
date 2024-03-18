import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { ApiFunctions } from "../functions/Api";
import { z } from "zod";

//import { Toaster, toast } from 'sonner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
    first_name: z.string().min(4),
    last_name: z.string().min(4),
    email: z.string().email(),
    number: z.string().refine(value => /^\d{10,}$/.test(value), {
        message: 'Number must be an integer with  length of 10 digits'
    }),
    password: z.string().min(8),
    level: z.string().min(4),
    class_name: z.string().min(4),
    promotion: z.string().min(4),
    campus: z.string().min(4),
});






export function AddUser() {

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        number: '',
        password: '',
        level: '',
        class_name: '',
        promotion: '',
        campus: '',
    });


    const modalButtonRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // console.log(formData)
    };

    const validate = () => {
        try {
            schema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };
    const notify = () => toast("Wow so easy!");


    useEffect(() => {
        toast("Wow so easy!")
        getAllUsers();
    }, []);
    const getAllUsers = async () => {

        try {
            const data = await ApiFunctions.getAllUsers();
            //console.log(data.users);
            setData(data.users);

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSubmit = async (e) => {
        // console.log('Submit')
        e.preventDefault();
        if (validate()) {

            try {

                const data = await ApiFunctions.addUser(formData);
                console.log(data);
                toast.success('User Added Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                if (modalButtonRef.current) {
                    modalButtonRef.current.click();
                }



            } catch (error) {
                console.error('Error:', error);
                setErrors(prevState => ({
                    ...prevState,
                    email: error.response?.data.error ?? error.response.data.message
                }));
            }
        }
    };

    const listUsers = data.map(user => {


        return (
            <div key={user.id} class="max-w-sm w-full  mx-auto  rounded-lg overflow-hidden shadow-lg ">
                <div class="border-b px-4 pb-6">
                    <div class="text-center my-4">
                        <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src="https://randomuser.me/api/portraits/women/21.jpg" alt="" />
                        <div class="py-2">
                            <h3 class="font-bold text-2xl  mb-1">{user.first_name} {user.last_name}</h3>
                            <div class="inline-flex  items-center">
                                <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path class=""
                                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                </svg>
                                New York, NY
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2 px-2">
                        <button
                            class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                            Follow
                        </button>
                        <button
                            class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold  px-4 py-2">
                            Message
                        </button>
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
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form class="p-4 md:p-5 pb-8" onSubmit={handleSubmit} >
                                <div class="grid gap-4 mb-4 grid-cols-2 pb-8">

                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                        <input type="text" name="first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="first name" onChange={handleChange} />
                                        {errors.first_name && <span className="text-red-500 text-left ms-5">{errors.first_name}</span>}
                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                        <input type="text" name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="last name" onChange={handleChange} />
                                        {errors.last_name && <span className="text-red-500 text-left ms-5">{errors.last_name}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="email" onChange={handleChange} />
                                        {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">number</label>
                                        <input type="text" name="number" id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="number" onChange={handleChange} />
                                        {errors.number && <span className="text-red-500 text-left ms-5">{errors.number}</span>}

                                    </div>
                                    <div class="col-span-2">
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" value="12345678" onChange={handleChange} />
                                        {errors.password && <span className="text-red-500 text-left ms-5">{errors.password}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                                        <input type="text" name="level" id="level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="level" onChange={handleChange} />
                                        {errors.level && <span className="text-red-500 text-left ms-5">{errors.level}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="class_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                                        <input type="text" name="class_name" id="class_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="class name" onChange={handleChange} />
                                        {errors.class_name && <span className="text-red-500 text-left ms-5">{errors.class_name}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="promotion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promotion</label>
                                        <input type="text" name="promotion" id="promotion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="promotion" onChange={handleChange} />
                                        {errors.promotion && <span className="text-red-500 text-left ms-5">{errors.promotion}</span>}

                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="campus" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Campus</label>
                                        <input type="text" name="campus" id="campus" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="campus" onChange={handleChange} />
                                        {errors.campus && <span className="text-red-500 text-left ms-5">{errors.campus}</span>}
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