import React, { useEffect, useRef, useState } from 'react'
import { getPromotions } from './functions/getPromotions';
import { isAuth } from '../../roles/isAuth';
import { Button } from '@material-tailwind/react';
import PromotionCreate from './components/PromotionCreate';
import { addPromotion } from '../../lib/validations/promotion';
import { createPromotion } from './functions/createPromotion';
import PromotionSkeleton from './components/PromotionSkeleton';
import { deletePromotion } from './functions/deletePromotion';
import { checkAdminAndNavigate } from '../../roles/isAdmin';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


export default function Promotions() {

    const [promotions, setPromotions] = useState([]);
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
            addPromotion.parse(formData);
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
        getAllPromotions();
    }, []);

    const getAllPromotions = async () => {
        setLoadingPage(true)
        const data = await getPromotions();
        // console.log(data);
        setPromotions(data.promotions)
        setLoadingPage(false)
    };

    const formatDate = (dateString) => {
        const createdAt = new Date(dateString);
        return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
    };

    //console.log(promotions);


    const deletePromotionFunction = async (id) => {
        if (await deletePromotion(id)) {
            await getAllPromotions()
        }
    };

    const submitPromotionCreate = async (e) => {
        // console.log('Submit')
        setLoading(true);

        e.preventDefault();
        if (validate()) {

            const { success, data, error } = await createPromotion(formData);
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
                getAllPromotions();
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    name: error.response?.data.error ?? error.response.data.message
                }));
            }
        }
        setLoading(false);

    };

    const listPromotions = promotions.map(promotion => {
        return (
            <tr key={promotion.id}>
                <th>{promotion.id}</th>
                <td>{promotion.name}</td>
                <td ><span className=' text-xs font-medium me-2 px-2.5 py-0.5 rounded  border border-green-400'>{formatDate(promotion.created_at)}</span></td>
                <td className=''>
                    {/* <button className="btn btn-outline btn-success  btn-sm" data-modal-target={`edit-promotion-${promotion.id}`} data-modal-toggle={`edit-promotion-${promotion.id}`} type="button" >Edit</button> */}
                    <button className="btn btn-outline btn-error btn-sm ms-2" onClick={() => deletePromotionFunction(promotion.id)} >Delete</button>
                </td>
                {/* <PromotionEdit errors={errors} submitPromotionCreate={submitPromotionCreate} formData={formData} modalButtonRef={modalButtonRef} handleChange={handleChange} id={promotion.id} /> */}
            </tr>
        )
    }
    );


    return (
        <>
            <div className="overflow-x-auto  mt-5 ">
                <Button color="blue" className=" py-3 min-w-2/6 me-44 float-end " data-modal-target="add-promotion" data-modal-toggle="add-promotion" type="button"  >Add New Promotion </Button>
                <PromotionCreate errors={errors} submitPromotionCreate={submitPromotionCreate} formData={formData} modalButtonRef={modalButtonRef} handleChange={handleChange} loading={loading} />
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
                        {loadingPage ? <PromotionSkeleton /> : listPromotions}
                    </tbody>
                </table>
            </div>
        </>
    );

}
