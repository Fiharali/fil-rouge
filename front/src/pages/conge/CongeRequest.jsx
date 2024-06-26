import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { isAuth } from '../../roles/isAuth';
import { CongeFunctions } from '../../functions/conge';
import { addConge, addNewConge } from '../../lib/validations/conge';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { checkAdminAndNavigate } from '../../roles/isAdmin';
import {checkStaffAndNavigate} from "../../roles/isStaff.jsx";

export default function CongeRequest() {

    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate()
    const UserContext = useUserContext();

    useEffect(() => {
        !isAuth() && navigate('/login')
        checkStaffAndNavigate(UserContext, navigate)
        getUsers()
    }, []);



    const getUsers = async () => {
        try {
            const data = await CongeFunctions.getUsersForConges();
            console.log(data.data);
            setUsers(data.data.users)
        } catch (error) {
            console.error('Error:', error);


        }
    }


    const loader = <span className="loading loading-ring loading-sm"></span>
    const today = new Date().toISOString().split('T')[0];

    //console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (validate()) {

            if (formData.to <= formData.from) {
                setErrors({ to: 'Date to must be greater than Date from' });
                setLoading(false)

                return;
            }
            try {

                const data = await CongeFunctions.addConge(formData);
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
            addConge.parse(formData);
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
                <h3 className="mb-4 text-xl font-semibold  text-center">Demand of Conge </h3>
                <form onSubmit={handleSubmit}  >
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 ">
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date from </label>
                            <input type="date" name="from" id="from" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="" value={formData.from} onChange={handleChange} min={today} />
                            {errors?.from && <span className="text-red-500 text-left ms-5">{errors?.from ?? ''}</span>}
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date to </label>
                            <input type="date" name="to" id="to" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.to} onChange={handleChange}  min={today}/>
                            {errors?.to && <span className="text-red-500 text-left ms-5">{errors?.to ?? ''}</span>}
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