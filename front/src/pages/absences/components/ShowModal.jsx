import {Button} from "@material-tailwind/react";
import React from "react";

export default  function ShowModal(props){

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <form onSubmit={props.handleSubmit} encType="multipart/form-data" className="p-10" >
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 ">
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date</label>
                                <input type="date" name="date" id="date" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={props.selectedDate} onChange={props.handleChange}  />
                                {props.errors?.date && <span className="text-red-500 text-left ms-5">{props.errors?.date ?? ''}</span>}
                            </div>
                            <div className="col-span-6 ">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium ">Type </label>
                                <select name="type" id="type" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={props.formData.type} onChange={props.handleChange} >
                                    <option value=""> choose type of absence </option>
                                    {
                                        props.types.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>

                                        ))
                                    }
                                </select>
                                {props.errors?.type && <span className="text-red-500 text-left ms-5">{props.errors?.type ?? ''}</span>}
                            </div>
                            <div className="col-span-6 ">
                                <label htmlFor="" className="block mb-2 text-sm font-medium ">users </label>



                                <select name="user" id="user" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={props.formData.user} onChange={props.handleChange}   >
                                    <option value=""> choose user </option>
                                    {
                                        props.users.map(user => (
                                            <>
                                                <option key={user.id} value={user.id} className={`bg-[url('${user.image}')] `}>
                                                    <img src={user.image} className='' />
                                                    {user.first_name} {user.last_name}
                                                </option>
                                            </>
                                        ))
                                    }
                                </select>
                                {props.errors?.user && <span className="text-red-500 text-left ms-5">{props.errors?.user ?? ''}</span>}
                            </div>
                            <div className="col-span-3 sm:col-6">
                                <Button type="submit" fullWidth  color='white' onClick={props.handleCloseModal}  > cancel </Button>
                            </div>
                            <div className="col-span-3 sm:col-6">
                                <Button type="submit" fullWidth disabled={props.loading}  > {props.loading ? props.loader : 'Save'} </Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}