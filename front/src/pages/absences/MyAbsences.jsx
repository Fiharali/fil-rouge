import React, { useEffect, useState } from 'react'
import { isAuth } from '../../roles/isAuth';
import AbsencesSkeleton from './components/AbsencesSkeleton';
import { getMyAbsences } from './functions/getMyAbsences';
import isApprenant, {checkApprenantAndNavigate} from "../../roles/isApprenant.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext.jsx";


export default function MyAbsences() {

  const [loadingPage, setLoadingPage] = useState(false);
  const [absences, setAbsences] = useState([]);

  const navigate = useNavigate()
  const UserContext = useUserContext();
  useEffect(() => {
    !isAuth() && navigate('/login')
    checkApprenantAndNavigate(UserContext, navigate)
    getAllAbsences();
  }, []);





  const getAllAbsences = async () => {
    setLoadingPage(true)
    const data = await getMyAbsences();
    setAbsences(data.data.absences)
    setLoadingPage(false)
  };

  const formatDate = (dateString) => {
    const createdAt = new Date(dateString);
    return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
  };


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
        <td>{absence.user.first_name}</td>
        <td><span className='text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400'>{formatDate(absence.created_at)}</span></td>
        <td> <a className='underline underline-offset-1' target='_blank' href={absence.file}>Link of file</a> </td>
      </tr >
    )
  }
  );

if (!isApprenant() ){
     return null
}


  return (
    <>
      <div className="overflow-x-auto  mt-5  ">
        <table className="table table-zebra w-full md:w-3/4 mx-auto mt-16">
          <thead>
            <tr>
              <td>Id</td>
              <td>type d'absence</td>
              <td>date d'absence</td>
              <td>Status</td>
              <td>Apprenant name</td>
              <td>Date creation</td>
              <td>file</td>
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
