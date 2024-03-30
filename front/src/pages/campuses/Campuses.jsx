import React, { useEffect, useRef, useState } from 'react'
import { getCampuses } from './functions/getCampuses';
import { isAuth } from '../../roles/isAuth';
import SearchBar from '../users/components/SearchBar';
import { Button } from '@material-tailwind/react';
import CampusCreate from './components/CampusCreate';
import { addCampus } from '../../lib/validations/campus';
import { createCampus } from './functions/createCampus';
import UserFormSkeleton from '../users/components/UserFormSkeleton';
import CampusSkeleton from './components/CampusSkeleton';
import { deleteCampus } from './functions/deleteCampus';


export default function Campuses() {

    const [campuses, setCampuses] = useState([]);
    const [errors, setErrors] = useState({});
    const [loadingPage, setLoadingPage] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
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
            addCampus.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    useEffect(() => {
        !isAuth() && navigate('/login')
        getAllCampuses();
    }, []);

    const getAllCampuses = async () => {
        setLoadingPage(true)
        const data = await getCampuses();
        // console.log(data);
        setCampuses(data.campuses)
        setLoadingPage(false)
    };

    const formatDate = (dateString) => {
        const createdAt = new Date(dateString);
        return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
    };

    //console.log(campuses);


    const deleteCampusFunction = async (id) => {
        if (await deleteCampus(id)) {
            await getAllCampuses()
        }
    };

    const submitCampusCreate = async (e) => {
        // console.log('Submit')
        e.preventDefault();
        if (validate()) {

            const { success, data, error } = await createCampus(formData);
            if (success) {
                setFormData({
                    name: '',
                });

                if (modalButtonRef.current) {
                    modalButtonRef.current.click();
                }
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });
                getAllCampuses();
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    name: error.response?.data.error ?? error.response.data.message
                }));
            }
        }
    };

    const listCampuses = campuses.map(campus => {
        return (
            <tr key={campus.id}>
                <th>{campus.id}</th>
                <td>{campus.name}</td>
                <td ><span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>{formatDate(campus.created_at)}</span></td>
                <td className=''>
                    <button className="btn btn-outline btn-success  btn-sm">Edit</button>
                    <button className="btn btn-outline btn-error btn-sm ms-2" onClick={() => deleteCampusFunction(campus.id)} >Delete</button>
                </td>
            </tr>
        )
    }
    );

    // if (loadingPage) {
    //     return <CampusSkeleton />;
    // }

    return (
        <>
            <div className="overflow-x-auto  mt-5 ">
                <Button color="blue" className=" py-3 min-w-2/6 me-44 float-end " data-modal-target="add-campus" data-modal-toggle="add-campus" type="button"  >Add New Campus </Button>
                <CampusCreate errors={errors} submitCampusCreate={submitCampusCreate} formData={formData} modalButtonRef={modalButtonRef} handleChange={handleChange} />
                <table className="table table-zebra w-full md:w-3/4 mx-auto mt-16">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Date creation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCampuses}
                    </tbody>
                </table>
            </div>
        </>
    );

}
