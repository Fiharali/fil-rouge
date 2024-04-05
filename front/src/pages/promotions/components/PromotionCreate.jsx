import { Button } from "@material-tailwind/react";
export default function PromotionCreate(props) {
    const loader = <span className="loading loading-ring loading-sm"></span>

    return (
        <div id="add-promotion" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  max-h-full" ref={props.modalButtonRef}>
            <div className="relative p-4 pb-8 w-full md:w-2/5 mt-10 max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create New Promotion
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="add-promotion">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5 pb-8" onSubmit={props.submitPromotionCreate} encType="multipart/form-data">
                        <div className="grid gap-4 mb-4 grid-cols-2 pb-8">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" name" onChange={props.handleChange} value={props.formData.name} />
                                {props.errors.name && <span promotion="text-red-500 text-left ms-5">{props.errors.name}</span>}
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <Button type="submit" fullWidth disabled={props.loading}  > {props.loading ? loader : 'Add'} </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
