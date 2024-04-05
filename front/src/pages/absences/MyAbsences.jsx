import React, { useEffect, useState } from 'react'
import { isAuth } from '../../roles/isAuth';
import AbsencesSkeleton from './components/AbsencesSkeleton';
import { getMyAbsences } from './functions/getMyAbsences';


export default function MyAbsences() {

  const [loadingPage, setLoadingPage] = useState(false);
  const [absences, setAbsences] = useState([]);


  useEffect(() => {
    !isAuth() && navigate('/login')
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
        <td>{absence.status}</td>
        <td>{absence.user.first_name}</td>
        <td><span className='text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400'>{formatDate(absence.created_at)}</span></td>
        <td> <a className='underline underline-offset-1' target='_blank' href={absence.file}>Link of file</a> </td>
      </tr >
    )
  }
  );

  


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
