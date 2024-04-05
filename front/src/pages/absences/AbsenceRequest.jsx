import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { isAuth } from '../../roles/isAuth';
import { AbsenceFunctions } from '../../functions/absence';
import { addAbsence } from '../../lib/validations/absence';

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

    useEffect(() => {
        !isAuth() && navigate('/login')
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

    //console.log(formData)

    const loader = <span className="loading loading-ring loading-sm"></span>


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (validate()) {


            try {

                const data = await AbsenceFunctions.addAbsence(formData);
                console.log(data);
                setFormData({})
                setErrors()
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    timer: 2000,
                });
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




    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='overflow-x-auto  mt-5 '>

            <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6  w-full md:w-1/2 mt-5 mx-auto ">
                <h3 className="mb-4 text-xl font-semibold  text-center">Demand of Absence </h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 ">
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date</label>
                            <input type="date" name="date" id="date" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={formData.date} onChange={handleChange} min={today} />
                            {errors.date && <span className="text-red-500 text-left ms-5">{errors.date}</span>}
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
                            {errors.type && <span className="text-red-500 text-left ms-5">{errors.type}</span>}
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="file" className="block mb-2 text-sm font-medium ">File approve</label>
                            <input type="file" name="file" id="file" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full " onChange={handleFileChange} accept='pdf' />
                            {errors.file && <span className="text-red-500 text-left ms-5">{errors.file}</span>}
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
