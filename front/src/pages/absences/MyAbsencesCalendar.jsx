import React, { useEffect, useState } from 'react'
import { getAbsences } from './functions/getAbsences';
import { isAuth } from '../../roles/isAuth';
import AbsencesSkeleton from './components/AbsencesSkeleton';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import { getMyAbsences } from './functions/getMyAbsences';
import {checkApprenantAndNavigate} from "../../roles/isApprenant.jsx";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext.jsx";

export default function MyAbsencesCalendar() {

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






    const absencesData = absences.map(absence => ({
        id: absence.id,
        title: absence.user.first_name,
        start: absence.date,
        end: absence.date,
        // backgroundColor: 'blue',
        // color: 'black',

        textColor: 'white'

    }));


    return (
        <>
            <div className="overflow-x-auto  mt-5  ">

                <div className='md:w-2/3 mx-auto w-full'>
                    <FullCalendar className="mx-auto w-1/2"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={absencesData}

                    />
                </div>
            </div>


        </>
    );
}
