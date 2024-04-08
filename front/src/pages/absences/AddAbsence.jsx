import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { isAuth } from '../../roles/isAuth';
import { AbsenceFunctions } from '../../functions/absence';
import { addAbsence, addNewAbsence } from '../../lib/validations/absence';
import Select from 'react-select';

export default function AddAbsence() {

    const [errors, setErrors] = useState({});
    const [types, setTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        type: '',
        user: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };





    useEffect(() => {
        !isAuth() && navigate('/login')
        getTypes()
        getUsers()
    }, []);


    const getTypes = async () => {
        try {
            const data = await AbsenceFunctions.getTypes();
            //console.log(data.data);
            setTypes(data.data)
        } catch (error) {
            console.error('Error:', error);


        }
    }
    const getUsers = async () => {
        try {
            const data = await AbsenceFunctions.getUsersForAbsences();
            //console.log(data.data.);
            setUsers(data.data.users)
        } catch (error) {
            console.error('Error:', error);


        }
    }


    const loader = <span className="loading loading-ring loading-sm"></span>
    const today = new Date().toISOString().split('T')[0];

    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (validate()) {


            try {

                const data = await AbsenceFunctions.addNewAbsence(formData);
                console.log(data);
                setFormData({})
                setErrors()
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });

            } catch (error) {

                console.error('Error:', error);

            }
        }
        setLoading(false)

    }
    const validate = () => {
        try {
            addNewAbsence.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };





    return (
        <div className='overflow-x-auto  mt-5 '>

            <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6  w-full md:w-1/2 mt-5 mx-auto ">
                <h3 className="mb-4 text-xl font-semibold  text-center">Demand of Absence </h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 ">
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date</label>
                            <input type="date" name="date" id="date" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={formData.date} onChange={handleChange} min={today} />
                             {errors?.date && <span className="text-red-500 text-left ms-5">{errors?.date ?? ''}</span>}
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="type" className="block mb-2 text-sm font-medium ">Type </label>
                            <select name="type" id="type" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.type} onChange={handleChange} >
                                <option value=""> choose type of absence </option>
                                {
                                    types.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>

                                    ))
                                }
                            </select>
                            {errors?.type && <span className="text-red-500 text-left ms-5">{errors?.type ?? ''}</span>}
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="" className="block mb-2 text-sm font-medium ">users </label>

                           

                            <select name="user" id="user" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.user} onChange={handleChange}   >
                                <option value=""> choose type of absence </option>
                                {
                                    users.map(user => (
                                        <>
                                            <option key={user.id} value={user.id} className={`bg-[url('${user.image}')] `}>
                                                <img src={user.image} className='' />
                                                {user.first_name} {user.last_name}
                                            </option>
                                        </>
                                    ))
                                }
                            </select>
                            {errors?.user && <span className="text-red-500 text-left ms-5">{errors?.user ?? ''}</span>}
                        </div>

                        <div className="col-span-6 sm:col-full">
                            <Button type="submit" fullWidth disabled={loading}  > {loading ? loader : 'Save'} </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}