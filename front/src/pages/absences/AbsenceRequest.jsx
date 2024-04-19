import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { isAuth } from '../../roles/isAuth';
import { AbsenceFunctions } from '../../functions/absence';
import { addAbsence } from '../../lib/validations/absence';
import AbsenceRequestForm from './components/AbsenceRequestForm';
import isApprenant, {checkApprenantAndNavigate} from "../../roles/isApprenant.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext.jsx";
import {checkStaffAndNavigate} from "../../roles/isStaff.jsx";

export default function AbsenceRequest() {

    const [errors, setErrors] = useState({});
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        type: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            file: file
        }));

    };
    const navigate = useNavigate()
    const UserContext = useUserContext();

    useEffect(() => {
        !isAuth() && navigate('/login')
        checkApprenantAndNavigate(UserContext, navigate)
        getTypes()
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



    const loader = <span className="loading loading-ring loading-sm"></span>
    const today = new Date().toISOString().split('T')[0];


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (validate()) {
            try {

                const data = await AbsenceFunctions.addAbsence(formData);
                //console.log(data);
                setFormData({})
                setErrors()
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });

            } catch (error) {
                // Swal.fire({
                //     icon: "error",
                //     timer: 2000,
                // });
                console.error('Error:', error);

                setErrors(prevState => ({
                    ...prevState,
                    file: error.response?.data.error ?? error.response.data.message
                }));
            }
        }
        setLoading(false)

    }
    const validate = () => {
        try {
            addAbsence.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };



    return (
        <div className='overflow-x-auto  mt-5 '>
            <AbsenceRequestForm handleSubmit={handleSubmit} loader={loader} today={today} formData={formData}
                handleFileChange={handleFileChange} errors={errors} loading={loading} types={types} handleChange={handleChange} />
        </div>
    )
}
