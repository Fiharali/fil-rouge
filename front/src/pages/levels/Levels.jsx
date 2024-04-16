import React, { useEffect, useRef, useState } from 'react'
import { getLevels } from './functions/getLevels';
import { isAuth } from '../../roles/isAuth';
import { Button } from '@material-tailwind/react';
import LevelCreate from './components/LevelCreate';
import { addLevel } from '../../lib/validations/level';
import { createLevel } from './functions/createLevel';
import LevelSkeleton from './components/LevelSkeleton';
import { deleteLevel } from './functions/deleteLevel';
import { checkAdminAndNavigate } from '../../roles/isAdmin';
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext.jsx";


export default function Levels() {

    const [levels, setLevels] = useState([]);
    const [errors, setErrors] = useState({});
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);

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
            addLevel.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    const navigate = useNavigate()
    const UserContext = useUserContext();

    useEffect(() => {
        !isAuth() && navigate('/login')
        checkAdminAndNavigate(UserContext, navigate)
        getAllLevels();
    }, []);

    const getAllLevels = async () => {
        setLoadingPage(true)
        const data = await getLevels();
        // console.log(data);
        setLevels(data.levels)
        setLoadingPage(false)
    };

    const formatDate = (dateString) => {
        const createdAt = new Date(dateString);
        return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
    };

    //console.log(levels);


    const deleteLevelFunction = async (id) => {
        if (await deleteLevel(id)) {
            await getAllLevels()
        }
    };

    const submitLevelCreate = async (e) => {
        // console.log('Submit')
        setLoading(true);
        e.preventDefault();
        if (validate()) {


            const { success, data, error } = await createLevel(formData);
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

                getAllLevels();
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    name: error.response?.data.error ?? error.response.data.message
                }));
            }

        }
        setLoading(false);
    };

    const listLevels = levels.map(level => {
        return (
            <tr key={level.id}>
                <th>{level.id}</th>
                <td>{level.name}</td>
                <td ><span className=' text-xs font-medium me-2 px-2.5 py-0.5 rounded  border border-green-400'>{formatDate(level.created_at)}</span></td>
                <td className=''>
                    {/* <button className="btn btn-outline btn-success  btn-sm" data-modal-target={`edit-level-${level.id}`} data-modal-toggle={`edit-level-${level.id}`} type="button" >Edit</button> */}
                    <button className="btn btn-outline btn-error btn-sm ms-2" onClick={() => deleteLevelFunction(level.id)} >Delete</button>
                </td>
                {/* <LevelEdit errors={errors} submitLevelCreate={submitLevelCreate} formData={formData} modalButtonRef={modalButtonRef} handleChange={handleChange} id={level.id} /> */}
            </tr>
        )
    }
    );


    return (
        <>
            <div className="overflow-x-auto  mt-5 ">
                <Button color="blue" className=" py-3 min-w-2/6 me-44 float-end " data-modal-target="add-level" data-modal-toggle="add-level" type="button"  >Add New Level </Button>
                <LevelCreate errors={errors} submitLevelCreate={submitLevelCreate} formData={formData} modalButtonRef={modalButtonRef} handleChange={handleChange} loading={loading} />
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
                        {loadingPage ? <LevelSkeleton /> : listLevels}
                    </tbody>
                </table>
            </div>
        </>
    );

}
