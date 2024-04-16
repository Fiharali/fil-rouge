import React, { useEffect, useState } from 'react'
import { getConge } from './functions/conge';
import { isAuth } from '../../roles/isAuth';
import CongesSkeleton from './components/CongesSkeleton';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import { useQuery } from 'react-query';
import {getMyConges} from "./functions/myConge.jsx";

export default function MyCongeCalendar() {


    const [conges, setConges] = useState([]);


    useEffect(() => {
        !isAuth() && navigate('/login')
    }, []);



    const { isLoading, isError, data: congesData } = useQuery('conges', getMyConges, {
        cacheTime: 60000,
    });

    if (isLoading) {
        return (
            <div className="overflow-x-auto  mt-5   ">
                <div className='md:w-2/3 mx-auto w-full blur-sm'>
                    <FullCalendar className="mx-auto w-1/2 "
                                  plugins={[dayGridPlugin, interactionPlugin]}
                                  initialView="dayGridMonth"
                    />
                </div>
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }




    const events = congesData.conges.map(conge => ({
        id: conge.id,
        title: conge.user?.first_name ?? 'null',
        start: conge.from,
        end: conge.to,
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
