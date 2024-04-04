import React, { useEffect, useState } from 'react'
import { getAbsences } from './functions/getAbsences';
import { isAuth } from '../../roles/isAuth';
import AbsencesSkeleton from './components/AbsencesSkeleton';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" 

export default function AbsencesCalendar() {

    const [loadingPage, setLoadingPage] = useState(false);
    const [absences, setAbsences] = useState([]);


    useEffect(() => {
        !isAuth() && navigate('/login')
        getAllAbsences();
    }, []);

    const getAllAbsences = async () => {
        setLoadingPage(true)
        const data = await getAbsences();
        // console.log(data.data.absences);
        setAbsences(data.data.absences)
        setLoadingPage(false)
    };


    // const handleDateClick = (arg) => {
    //     alert(arg.dateStr)
    //     alert('ff')
    //     console.log("ssd")
    // }



    const events = absences.map(absence => ({
        id: absence.id,
        title: absence.user.first_name,
        start: absence.date,
        end: absence.date,
        backgroundColor: 'green',
        textColor: 'white'
    }));


    return (
        <>
            <div className="overflow-x-auto  mt-5  ">
                <div className='md:w-2/3 mx-auto w-full'>
                    <FullCalendar className="mx-auto w-1/2"
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        events={events}
                        // dateClick={handleDateClick}
                    />
                </div>
            </div>


        </>
    );
}