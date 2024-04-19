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
import ShowModal from "./components/ShowModal.jsx";
import ShowModalEditStatus from "./components/ShowModalEditStatus.jsx";
import {checkAdminAndNavigate} from "../../roles/isAdmin.jsx";
import {useUserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {checkStaffAndNavigate} from "../../roles/isStaff.jsx";

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

    const UserContext = useUserContext()
    const navigate = useNavigate()

    const { isLoading, isError, data: absencesData , refetch } = useQuery('absences', getAbsences, {
        cacheTime: 60000,
    });

    useEffect(() => {
        !isAuth() && navigate('/login')
        checkStaffAndNavigate(UserContext, navigate)
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
                backgroundColor:'#ff0000',
               // display:'background'
                // eventColor: '#ff0000',
                //textColor: 'white'
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
            <div className="overflow-x-auto mt-5 relative h-96">
                <div className="flex justify-center items-center h-full">
                    <div className="loading loading-ring loading-lg"></div>
                </div>
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
    
    const handleSubmitEditStatus = async (e, id) => {
        e.preventDefault();
        setLoading(true)
        if (validateEditStatus()) {
            try {
                const data = await AbsenceFunctions.changeStatus(id, formData);
                //  console.log(data);
                setFormData({})
                setErrors()
                refetch()
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
                //console.log(data);
                setFormData({})
                setErrors()
                refetch()
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
                    <ShowModal  handleSubmit={handleSubmit}  errors={errors}  types={types} formData={formData}
                                users={users} handleCloseModal={handleCloseModal} loader={loader}
                                loading={loading} selectedDate={selectedDate} handleChange={handleChange}
                    />
                )}
                {showModalEditStatus && (
                    <ShowModalEditStatus   handleSubmitEditStatus={handleSubmitEditStatus} selectedEvent={selectedEvent} loading={loading}
                                           handleChange={handleChange}  errors={errors} handleCloseModalEditStatus={handleCloseModalEditStatus}
                                           loader={loader} />
                )}
            </div>
        </div>
    );
}
