import React, { useEffect, useState } from 'react'
import { getAbsences } from './functions/getAbsences';
import { isAuth } from '../../roles/isAuth';
import AbsencesSkeleton from './components/AbsencesSkeleton';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import { useQuery } from 'react-query';

export default function AbsencesCalendar() {

    // const [loadingPage, setLoadingPage] = useState(false);
    const [absences, setAbsences] = useState([]);


    useEffect(() => {
        !isAuth() && navigate('/login')
        //getAllAbsences();
    }, []);



    const { isLoading, isError, data: absencesData } = useQuery('absences', getAbsences, {
        cacheTime: 60000, // Cache for 1 minute (adjust the value as needed)
    });

    if (isLoading) {
        return (
            <div className="overflow-x-auto  mt-5  ">
                loading ...

            </div>
        );
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }
    console.log(absencesData)



    const events = absencesData.data.absences.map(absence => ({
        id: absence.id,
        title: absence.user?.first_name ?? 'null',
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
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                    // dateClick={handleDateClick}
                    />
                </div>
            </div>


        </>
    );
}
