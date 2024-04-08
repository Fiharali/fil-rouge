import { Button } from '@material-tailwind/react'
import React from 'react'

export default function AbsenceRequestForm(props) {
    return (
        <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6  w-full md:w-1/2 mt-5 mx-auto ">
            <h3 className="mb-4 text-xl font-semibold  text-center">Demand of Absence </h3>
            <form onSubmit={props.handleSubmit} encType="multipart/form-data" >
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 ">
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium ">Date</label>
                        <input type="date" name="date" id="date" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={props.formData.date} onChange={props.handleChange} min={props.today} />
                        {props?.errors?.date && <span className="text-red-500 text-left ms-5">{props?.errors?.date ?? ''}</span>}
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
                        {props?.errors?.type && <span className="text-red-500 text-left ms-5">{props?.errors?.type ?? ' '}</span>}
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="file" className="block mb-2 text-sm font-medium ">File approve</label>
                        <input type="file" name="file" id="file" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full " onChange={props.handleFileChange} accept='pdf' />
                        {props?.errors?.file && <span className="text-red-500 text-left ms-5">{props?.errors?.file ?? ''}</span>}
                    </div>
                    <div className="col-span-6 sm:col-full">
                        <Button type="submit" fullWidth disabled={props.loading}  > {props.loading ? props.loader : 'Save'} </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
