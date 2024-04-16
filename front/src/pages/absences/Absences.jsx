import React, { useEffect, useRef, useState } from 'react'
import { getAbsences } from './functions/getAbsences';
import { isAuth } from '../../roles/isAuth';
import AbsencesSkeleton from './components/AbsencesSkeleton';
import { Button } from '@material-tailwind/react';
import { addNewAbsence, changeStatus } from '../../lib/validations/absence';
import { AbsenceFunctions } from '../../functions/absence';
import { deleteAbsence } from './functions/deleteAbsence';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { checkStaffAndNavigate } from '../../roles/isStaff';

export default function Absences() {

  const [loadingPage, setLoadingPage] = useState(false);
  const [absences, setAbsences] = useState([]);
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
    checkStaffAndNavigate(UserContext, navigate)
    getAllAbsences();
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
        const data = await AbsenceFunctions.changeStatus(id, formData);
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
        getAllAbsences()
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





  const getAllAbsences = async () => {
    setLoadingPage(true)
    const data = await getAbsences();
    setAbsences(data.data.absences)
    setLoadingPage(false)
  };

  const formatDate = (dateString) => {
    const createdAt = new Date(dateString);
    return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
  };

  const deleteAbsenceFunction = async (id) => {
    if (await deleteAbsence(id)) {
      await getAllAbsences()
    }
  }


  const listAbsences = absences.map(absence => {
    return (
      <tr key={absence.id}>
        <td>{absence.id}</td>
        <td>{absence.type.name}</td>
        <td>{absence.date}</td>
        <td>{absence.status == 0 ? (<span
          class="inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none bg-red-900  text-gray-50">
          Not Accepted
        </span>) : absence.status == 1 ? (<span
          class="inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none bg-blue-900  text-gray-50">
          Accepted
        </span>) : (<span
          class="inline-block whitespace-nowrap rounded-[0.27rem]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none bg-green-900  text-gray-50">
          retard
        </span>)}</td>
        <td>{absence.user?.first_name ?? 'Unknown'}</td>
        <td><span className='text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400'>{formatDate(absence.created_at)}</span></td>
        <td> <a className='underline underline-offset-1' target='_blank' href={absence.file}>Link of file</a> </td>
        <td className='flex p-3'>
          <button className="btn btn-sm" onClick={() => document.getElementById(`my_modal_${absence.id}`).showModal()}>change status</button>
          <button className='ms-1 ' onClick={() => deleteAbsenceFunction(absence.id)}  >
            <lord-icon
              src="https://cdn.lordicon.com/hjbrplwk.json"
              trigger="click"
              colors="primary:#646e78,secondary:#ff0000,tertiary:#ebe6ef,quaternary:#3a3347"
              style={{ 'width': '50px' }}>
            </lord-icon>
          </button>
        </td>


        <dialog id={`my_modal_${absence.id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={modalButtonRef}>✕</button>
            </form>
            <h3 className="font-bold text-lg">change status</h3>
            <form onSubmit={(e) => handleSubmit(e, absence.id)} >
              <select name="status" id="status" className="shadow-sm  mt-5 border  sm:text-sm rounded-lg  block w-full p-2.5" onChange={(e) => handleChange(e)} >
                <option value=""> choose type of absence </option>
                <option value="0"  {...(absence.status === 0 ? { selected: true } : {})}   > Not Accepted</option>
                <option value="1"  {...(absence.status === 1 ? { selected: true } : {})}  > Accepted</option>
                <option value="2"  {...(absence.status === 2 ? { selected: true } : {})} > Retard </option>

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
              <th>type d'absence</th>
              <th>date d'absence</th>
              <th>Status</th>
              <th>Apprenant name</th>
              <th>Date creation</th>
              <th>file</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingPage ? <AbsencesSkeleton /> : listAbsences}
          </tbody>
        </table>

      </div>
    </>
  );
}
