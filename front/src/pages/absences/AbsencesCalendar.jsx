import React, { useEffect, useState } from 'react';
import { getAbsences } from './functions/getAbsences';
import { isAuth } from '../../roles/isAuth';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import { useQuery } from 'react-query';
import {AbsenceFunctions} from "../../functions/absence.jsx";
import {Button} from "@material-tailwind/react";
import {addNewAbsence, addNewAbsenceWithCalendar, changeStatus} from "../../lib/validations/absence.js";
import Swal from "sweetalert2";

export default function AbsencesCalendar() {
    const [absences, setAbsences] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalEditStatus, setShowModalEditStatus] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [types, setTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        date: selectedDate,
        type: '',
        user: ''
    });

    const { isLoading, isError, data: absencesData } = useQuery('absences', getAbsences, {
        cacheTime: 60000,
    });

    useEffect(() => {
        !isAuth() && navigate('/login')
        getTypes()
        getUsers()
    }, []);

    useEffect(() => {
        if (!isLoading && !isError && absencesData) {
            const events = absencesData.data.absences.map(absence => ({
                id: absence.id,
                status: absence.status,
                title: (absence.user ? absence.user.first_name : 'null') + ' ' + (absence.status === 0 ? '(Not Confirmed)' :absence.status === 1 ? '(Confirmed)' :'(retard)' ),
                start: absence.date,
                end: absence.date,
                backgroundColor: 'blue',
                textColor: 'white'
            }));
            setAbsences(events);
        }
    }, [isLoading, isError, absencesData]);


    const loader = <span className="loading loading-ring loading-sm"></span>

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const getTypes = async () => {
        try {
            const data = await AbsenceFunctions.getTypes();
            //console.log(data.data);
            setTypes(data.data)
        } catch (error) {
            console.error('Error:', error);


        }
    }
    const getUsers = async () => {
        try {
            const data = await AbsenceFunctions.getUsersForAbsences();
            //console.log(data.data.);
            setUsers(data.data.users)
        } catch (error) {
            console.error('Error:', error);


        }
    }




    if (isLoading) {
        return (
            <div className="overflow-x-auto mt-5">
                loading ...
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }



    function handleDateClick(info) {
        setSelectedDate(info.dateStr); // Store the selected date
        setShowModal(true); // Show the modal
        setFormData({ ...formData, date: info.dateStr });
    }


    const handleEventClick = (info) => {
        const eventId = info.event.id;
        const status = info.event.extendedProps.status;
        console.log("Clicked event ID:", eventId ,'status : ',status);
        setShowModalEditStatus(true);
        setSelectedEvent({ id: eventId, status: status });

    }

    function handleCloseModal() {
        setShowModal(false); // Hide the modal
    }
    function handleCloseModalEditStatus() {
        setShowModalEditStatus(false); // Hide the modal
    }
   // console.log(formData)

    const handleSubmitEditStatus = async (e, id) => {
        e.preventDefault();
        setLoading(true)
        if (validateEditStatus()) {
            try {
                const data = await AbsenceFunctions.changeStatus(id, formData);
                //  console.log(data);
                setFormData({})
                setErrors()
                handleCloseModalEditStatus()
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setLoading(false)

        // console.log(formData, id)

    }
    const validateEditStatus = () => {
        try {
            changeStatus.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (validate()) {


            try {

                const data = await AbsenceFunctions.addNewAbsence(formData);
                console.log(data);
                setFormData({})
                setErrors()

                const { isLoading, isError, data: absencesData } = useQuery('absences', getAbsences, {
                    cacheTime: 60000,
                });
                Swal.fire({
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });

            } catch (error) {

                console.error('Error:', error);

            }
        }
        setLoading(false)
        handleCloseModal()


    }

    const validate = () => {
        try {
            addNewAbsenceWithCalendar.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    return (
        <div className="overflow-x-auto mt-5">
            <div className='md:w-2/3 mx-auto w-full'>
                <FullCalendar
                    className="mx-auto w-1/2"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={absences}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                />
                {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-10" >
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 ">
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date</label>
                                            <input type="date" name="date" id="date" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={selectedDate} onChange={handleChange}  />
                                            {errors?.date && <span className="text-red-500 text-left ms-5">{errors?.date ?? ''}</span>}
                                        </div>
                                        <div className="col-span-6 ">
                                            <label htmlFor="type" className="block mb-2 text-sm font-medium ">Type </label>
                                            <select name="type" id="type" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.type} onChange={handleChange} >
                                                <option value=""> choose type of absence </option>
                                                {
                                                    types.map(type => (
                                                        <option key={type.id} value={type.id}>
                                                            {type.name}
                                                        </option>

                                                    ))
                                                }
                                            </select>
                                            {errors?.type && <span className="text-red-500 text-left ms-5">{errors?.type ?? ''}</span>}
                                        </div>
                                        <div className="col-span-6 ">
                                            <label htmlFor="" className="block mb-2 text-sm font-medium ">users </label>



                                            <select name="user" id="user" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.user} onChange={handleChange}   >
                                                <option value=""> choose user </option>
                                                {
                                                    users.map(user => (
                                                        <>
                                                            <option key={user.id} value={user.id} className={`bg-[url('${user.image}')] `}>
                                                                <img src={user.image} className='' />
                                                                {user.first_name} {user.last_name}
                                                            </option>
                                                        </>
                                                    ))
                                                }
                                            </select>
                                            {errors?.user && <span className="text-red-500 text-left ms-5">{errors?.user ?? ''}</span>}
                                        </div>
                                        <div className="col-span-3 sm:col-6">
                                            <Button type="submit" fullWidth  color='white' onClick={handleCloseModal}  > cancel </Button>
                                        </div>
                                        <div className="col-span-3 sm:col-6">
                                            <Button type="submit" fullWidth disabled={loading}  > {loading ? loader : 'Save'} </Button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {showModalEditStatus && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <div className="bg-white  p-10 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                <form onSubmit={(e) => handleSubmitEditStatus(e, selectedEvent.id)} >
                                    <select name="status" id="status" className="shadow-sm  mt-5 border  sm:text-sm rounded-lg  block w-full p-2.5" onChange={(e) => handleChange(e)} >
                                        <option value=""> choose type of absence </option>
                                        <option value="0"  {...(selectedEvent.status === 0 ? { selected: true } : {})}   > Not Accepted</option>
                                        <option value="1"  {...(selectedEvent.status === 1 ? { selected: true } : {})}  > Accepted</option>
                                        <option value="2"  {...(selectedEvent.status === 2 ? { selected: true } : {})} > Retard </option>

                                    </select>
                                    {errors?.status && <span className="text-red-500 text-left ms-5">{errors?.status ?? ''}</span>}
                                    <div className="grid grid-cols-6 gap-6 mt-10">
                                    <div className="col-span-3 sm:col-6">
                                        <Button type="submit" fullWidth  color='white' onClick={handleCloseModalEditStatus}  > cancel </Button>
                                    </div>
                                    <div className="col-span-3 sm:col-6">
                                        <Button type="submit" fullWidth disabled={loading}  > {loading ? loader : 'Save'} </Button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                )}
            </div>
        </div>
    );
}
