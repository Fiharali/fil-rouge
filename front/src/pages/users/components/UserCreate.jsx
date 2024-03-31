import { Button } from "@material-tailwind/react";
export default function UserCreate(props) {
    const loader = <span className="loading loading-ring loading-sm"></span>

    return (
        <div id="add-user" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  max-h-full" ref={props.modalButtonRef}>

            <div class="relative p-4 pb-8 w-full md:w-3/5 max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Create New User
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="add-user">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form class="p-4 md:p-5 pb-8" onSubmit={props.submitUserCreate} encType="multipart/form-data">
                        <div class="grid gap-4 mb-4 grid-cols-2 pb-8">


                            <div className="flex items-center justify-center max-w-1/2 mx-auto rounded-full col-span-2 mt-5">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center max-w-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    {props.selectedFile ? (
                                        <div className="w-full h-64 overflow-hidden">
                                            <img src={URL.createObjectURL(props.selectedFile)} alt="Selected file" className="object-cover w-full h-full" />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-5">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    )}
                                    <input id="dropzone-file" type="file" className="hidden" name="image" onChange={props.handleFileChange} accept="image/png, image/jpeg ,image/jpg" />
                                </label>
                                {props.errors.image && <span className="text-red-500 text-left ms-5">{props.errors.image}</span>}
                            </div>

                            <div class="col-span-2 sm:col-span-1">
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" name="first_name" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="first name" onChange={props.handleChange} value={props.formData.first_name} />
                                {props.errors.first_name && <span className="text-red-500 text-left ms-5">{props.errors.first_name}</span>}
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="last name" onChange={props.handleChange} value={props.formData.last_name} />
                                {props.errors.last_name && <span className="text-red-500 text-left ms-5">{props.errors.last_name}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="email" onChange={props.handleChange} value={props.formData.email} />
                                {props.errors.email && <span className="text-red-500 text-left ms-5">{props.errors.email}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">number</label>
                                <input type="text" name="number" id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="number" onChange={props.handleChange} value={props.formData.number} />
                                {props.errors.number && <span className="text-red-500 text-left ms-5">{props.errors.number}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" onChange={props.handleChange} value={props.formData.password} />
                                {props.errors.password && <span className="text-red-500 text-left ms-5">{props.errors.password}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="city_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <select name="city_id" id="city_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={props.handleChange} >
                                    <option value=""> choose city</option>
                                    {
                                        props.cities.map(city => (
                                            <option value={city.id}> {city.name}</option>

                                        ))
                                    }
                                </select>
                                {props.errors.city_id && <span className="text-red-500 text-left ms-5">{props.errors.city_id}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="campus_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">campus</label>
                                <select name="campus_id" id="campus_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={props.handleChange} >
                                    <option value=""> choose campus </option>
                                    {
                                        props.campuses.map(campus => (
                                            <option value={campus.id}> {campus.name}</option>

                                        ))
                                    }
                                </select>
                                {props.errors.campus_id && <span className="text-red-500 text-left ms-5">{props.errors.campus_id}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="promotion_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promotion</label>
                                <select name="promotion_id" id="promotion_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={props.handleChange} >
                                    <option value=""> choose Promotion</option>
                                    {
                                        props.promotions.map(promotion => (
                                            <option value={promotion.id}> {promotion.name}</option>

                                        ))
                                    }
                                </select>
                                {props.errors.promotion_id && <span className="text-red-500 text-left ms-5">{props.errors.promotion_id}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="level_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                                <select name="level_id" id="level_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={props.handleChange} >
                                    <option value=""> choose Level</option>
                                    {
                                        props.levels.map(level => (
                                            <option value={level.id}> {level.name}</option>

                                        ))
                                    }
                                </select>
                                {props.errors.level_id && <span className="text-red-500 text-left ms-5">{props.errors.level_id}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="class_name_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                                <select name="class_name_id" id="class_name_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={props.handleChange} >
                                    <option value=""> choose Class Name </option>
                                    {
                                        props.classNames.map(className => (
                                            <option value={className.id}> {className.name}</option>

                                        ))
                                    }
                                </select>
                                {props.errors.class_name_id && <span className="text-red-500 text-left ms-5">{props.errors.class_name_id}</span>}

                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">roles</label>
                                <select name="role[]" id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" multiple size="1" onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                    props.setFormData(prevState => ({
                                        ...prevState,
                                        role: selectedOptions
                                    }));
                                }} >

                                    {
                                        props.roles.map(role => (
                                            <option value={role.id}> {role.name}</option>

                                        ))
                                    }
                                </select>
                                {props.errors.role && <span className="text-red-500 text-left ms-5">{props.errors.role}</span>}

                            </div>

                        </div>

                        <div class="col-span-2 sm:col-span-1">
                        <Button type="submit" fullWidth disabled={props.loading}  > {props.loading ? loader : 'Add'} </Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
