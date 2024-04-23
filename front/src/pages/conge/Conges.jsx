import React, { useEffect, useRef, useState } from 'react'

import { isAuth } from '../../roles/isAuth';
import CongesSkeleton from './components/CongesSkeleton';
import { Button } from '@material-tailwind/react';
import { addNewConge, changeStatus } from '../../lib/validations/conge';
import { CongeFunctions } from '../../functions/conge';
import { deleteConge } from './functions/deleteConge';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { checkAdminAndNavigate, isAdmin } from '../../roles/isAdmin';
import { getConge } from './functions/conge';
import {checkRhAndNavigate} from "../../roles/isRh.jsx";

export default function Conges() {

  const [loadingPage, setLoadingPage] = useState(false);
  const [conges, setConges] = useState([]);
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: ''
  });

  const modalButtonRef = useRef(null);

  const navigate = useNavigate()
  const UserContext = useUserContext();

  useEffect(() => {
    !isAuth() && navigate('/login')
    checkRhAndNavigate(UserContext, navigate)
    getAllConges();
  }, []);



  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  //console.log(formData)

  const loader = <span className="loading loading-ring loading-sm"></span>


  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setLoading(true)
    if (validate()) {
      try {
        const data = await CongeFunctions.changeStatus(id, formData);
        //  console.log(data);
        setFormData({})
        setErrors()
        const modal = document.getElementById(`my_modal_${id}`);
        modal.close();
        Swal.fire({
          title: data.success,
          icon: "success",
          timer: 2000,
        });
        getAllConges()
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setLoading(false)

    // console.log(formData, id)

  }
  const validate = () => {
    try {
      changeStatus.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      setErrors(error.formErrors.fieldErrors);
      return false;
    }
  };





  const getAllConges = async () => {
    setLoadingPage(true)
    const data = await getConge();
   // console.log(data)
    setConges(data.conges)
    setLoadingPage(false)
  };

  const formatDate = (dateString) => {
    const createdAt = new Date(dateString);
    return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
  };

  const deleteCongeFunction = async (id) => {
    if (await deleteConge(id)) {
      await getAllConges()
    }
  }


  const listConges = conges.map(conge => {
    return (
      <tr key={conge.id}>
        <td>{conge.id}</td>
        <td>{conge.from}</td>
        <td>{conge.to}</td>
        <td>{conge.status == 0 ? (<span
          class="inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none bg-red-900  text-gray-50">
          Not Accepted
        </span>) : conge.status == 1 ? (<span
          class="inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none bg-blue-900  text-gray-50">
          Accepted
        </span>) : (<span
          class="inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none bg-green-900  text-gray-50">
          retard
        </span>)}</td>
        <td>{conge.user?.first_name ?? 'Unknown'}</td>
        <td><span className='text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400'>{formatDate(conge.created_at)}</span></td>
        <td className='flex p-3'>
          <button className="btn btn-sm" onClick={() => document.getElementById(`my_modal_${conge.id}`).showModal()}>change status</button>
          <button className='ms-1 ' onClick={() => deleteCongeFunction(conge.id)}  >
            <lord-icon
              src="https://cdn.lordicon.com/hjbrplwk.json"
              trigger="click"
              colors="primary:#646e78,secondary:#ff0000,tertiary:#ebe6ef,quaternary:#3a3347"
              style={{ 'width': '50px' }}>
            </lord-icon>
          </button>
        </td>

        <dialog id={`my_modal_${conge.id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={modalButtonRef}>✕</button>
            </form>
            <h3 className="font-bold text-lg">change status</h3>
            <form onSubmit={(e) => handleSubmit(e, conge.id)} >
              <select name="status" id="status" className="shadow-sm  mt-5 border  sm:text-sm rounded-lg  block w-full p-2.5" onChange={(e) => handleChange(e)} >
                <option value=""> choose type of conge </option>
                <option value="0"  {...(conge.status === 0 ? { selected: true } : {})}   > Not Accepted</option>
                <option value="1"  {...(conge.status === 1 ? { selected: true } : {})}  > Accepted</option>

              </select>
              {errors?.status && <span className="text-red-500 text-left ms-5">{errors?.status ?? ''}</span>}

              <Button className='mt-5' fullWidth type='submit' disabled={loading}  > {loading ? loader : 'Edit'} </Button>
            </form>
          </div>
        </dialog>
      </tr>
    )
  }
  );



  return (
    <>
      <div className="overflow-x-auto  mt-5   pb-16">
        <table className="table table-zebra w-full md:w-3/4 mx-auto mt-16 ">
          <thead>
            <tr>
              <th>Id</th>
              <th>date from de conge</th>
              <th>date to de conge</th>
              <th>Status</th>
              <th>Apprenant name</th>
              <th>Date creation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingPage ? <CongesSkeleton /> : listConges}
          </tbody>
        </table>

      </div>
    </>
  );
}
