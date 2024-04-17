import {Button} from "@material-tailwind/react";

export default function  ShowModalEditStatus(props){
    return (

        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white  p-10 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <form onSubmit={(e) => props.handleSubmitEditStatus(e, props.selectedEvent.id)} >
                        <select name="status" id="status" className="shadow-sm  mt-5 border  sm:text-sm rounded-lg  block w-full p-2.5" onChange={(e) => props.handleChange(e)} >
                            <option value=""> choose type of absence </option>
                            <option value="0"  {...(props.selectedEvent.status === 0 ? { selected: true } : {})}   > Not Accepted</option>
                            <option value="1"  {...(props.selectedEvent.status === 1 ? { selected: true } : {})}  > Accepted</option>
                            <option value="2"  {...(props.selectedEvent.status === 2 ? { selected: true } : {})} > Retard </option>

                        </select>
                        {props.errors?.status && <span className="text-red-500 text-left ms-5">{props.errors?.status ?? ''}</span>}
                        <div className="grid grid-cols-6 gap-6 mt-10">
                            <div className="col-span-3 sm:col-6">
                                <Button type="submit" fullWidth  color='white' onClick={props.handleCloseModalEditStatus}  > cancel </Button>
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