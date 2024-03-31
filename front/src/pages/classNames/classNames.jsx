import React, { useEffect, useRef, useState } from 'react'
import { getClassNames } from './functions/getClassNames';
import { isAuth } from '../../roles/isAuth';
import { Button } from '@material-tailwind/react';
import ClassNameCreate from './components/ClassNameCreate';
import { addClassName } from '../../lib/validations/className';
import { createClassName } from './functions/createClassName';
import ClassNameSkeleton from './components/ClassNameSkeleton';
import { deleteClassName } from './functions/deleteClassName';


export default function ClassNames() {

    const [classNames, setClassNames] = useState([]);
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
            addClassName.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    useEffect(() => {
        !isAuth() && navigate('/login')
        getAllClassNames();
    }, []);

    const getAllClassNames = async () => {
        setLoadingPage(true)
        const data = await getClassNames();
        // console.log(data);
        setClassNames(data.classNames)
        setLoadingPage(false)
    };

    const formatDate = (dateString) => {
        const createdAt = new Date(dateString);
        return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
    };

    //console.log(classNames);


    const deleteClassNameFunction = async (id) => {
        if (await deleteClassName(id)) {
            await getAllClassNames()
        }
    };

    const submitClassNameCreate = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (validate()) {

            const { success, data, error } = await createClassName(formData);
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
                getAllClassNames();
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    name: error.response?.data.error ?? error.response.data.message
                }));
            }
        }
        setLoading(false);

    };

    const listClassNames = classNames.map(className => {
        return (
            <tr key={className.id}>
                <th>{className.id}</th>
                <td>{className.name}</td>
                <td ><span className=' text-xs font-medium me-2 px-2.5 py-0.5 rounded  border border-green-400'>{formatDate(className.created_at)}</span></td>
                <td className=''>
                    <button className="btn btn-outline btn-error btn-sm ms-2" onClick={() => deleteClassNameFunction(className.id)} >Delete</button>
                </td>
            </tr>
        )
    }
    );


    return (
        <>
            <div className="overflow-x-auto  mt-5 ">
                <Button color="blue" className=" py-3 min-w-2/6 me-44 float-end " data-modal-target="add-className" data-modal-toggle="add-className" type="button"  >Add New ClassName </Button>
                <ClassNameCreate errors={errors} submitClassNameCreate={submitClassNameCreate} formData={formData} modalButtonRef={modalButtonRef} handleChange={handleChange} loading={loading} />
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
                    {loadingPage ? <ClassNameSkeleton /> : listClassNames}
                    </tbody>
                </table>
            </div>
        </>
    );

}
