import { Button } from "@material-tailwind/react";
import { useState } from "react";


const SignIn = () => {

    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        setSelectedFile(file);

    };


    return (
        <>


            <div class="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 ">

                <div class="col-span-full xl:col-auto">
                    <div class="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 ">

                        <div class="block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4 ">
                            {selectedFile ? (
                                <img src={URL.createObjectURL(selectedFile)} alt="Selected file" className=" mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" />
                            ) :
                                <img class="mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" src="https://randomuser.me/api/portraits/women/21.jpg" alt="Jese picture" />
                            }
                            <div className="flex items-center justify-center   rounded-full col-span-2 ">
                                <label htmlFor="dropzone-file" className="flex  rounded-4 flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-2 cursor-pointer ">

                                    <div className="flex flex-col items-center justify-center p-5 rounded-2">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>

                                    <input id="dropzone-file" type="file" className="hidden" name="image" onChange={handleFileChange} accept="image/png, image/jpeg ,image/jpg" />
                                </label>

                            </div>

                        </div>
                        <Button fullWidth className="mt-8">Save</Button>


                    </div>
                    <div class="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 ">
                        <h3 class="mb-4 text-xl font-semibold ">Password information</h3>
                        <form action="#">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3 lg:col-span-6">
                                    <label for="current-password" class="block mb-2 text-sm font-medium ">Current password</label>
                                    <input type="text" name="current-password" id="current-password" class="shadow-sm  border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                                </div>
                                <div class="col-span-6 sm:col-span-3 lg:col-span-6">
                                    <label for="password" class="block mb-2 text-sm font-medium ">New password</label>
                                    <input data-popover-target="popover-password" data-popover-placement="bottom" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" />

                                </div>
                                <div class="col-span-6 sm:col-span-3 lg:col-span-6">
                                    <label for="confirm-password" class="block mb-2 text-sm font-medium ">Confirm password</label>
                                    <input type="text" name="confirm-password" id="confirm-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                                </div>
                                <div class="col-span-6 sm:col-full">
                                    <Button fullWidth>Save</Button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div class="col-span-2">
                    <div class="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 ">
                        <h3 class="mb-4 text-xl font-semibold ">General information</h3>
                        <form action="#">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="first-name" class="block mb-2 text-sm font-medium ">First Name</label>
                                    <input type="text" name="first-name" id="first-name" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="Bonnie" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="last-name" class="block mb-2 text-sm font-medium ">Last Name</label>
                                    <input type="text" name="last-name" id="last-name" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="Green" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="country" class="block mb-2 text-sm font-medium ">Country</label>
                                    <input type="text" name="country" id="country" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="United States" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="city" class="block mb-2 text-sm font-medium ">City</label>
                                    <input type="text" name="city" id="city" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="e.g. San Francisco" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="address" class="block mb-2 text-sm font-medium ">Address</label>
                                    <input type="text" name="address" id="address" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="e.g. California" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="email" class="block mb-2 text-sm font-medium ">Email</label>
                                    <input type="email" name="email" id="email" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="example@company.com" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="phone-number" class="block mb-2 text-sm font-medium ">Phone Number</label>
                                    <input type="number" name="phone-number" id="phone-number" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="e.g. +(12)3456 789" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="birthday" class="block mb-2 text-sm font-medium ">Birthday</label>
                                    <input type="number" name="birthday" id="birthday" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="15/08/1990" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="organization" class="block mb-2 text-sm font-medium ">Organization</label>
                                    <input type="text" name="organization" id="organization" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="Company Name" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="role" class="block mb-2 text-sm font-medium ">Role</label>
                                    <input type="text" name="role" id="role" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="React Developer" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="department" class="block mb-2 text-sm font-medium ">Department</label>
                                    <input type="text" name="department" id="department" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="Development" />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="zip-code" class="block mb-2 text-sm font-medium ">Zip/postal code</label>
                                    <input type="number" name="zip-code" id="zip-code" class="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="123456" />
                                </div>
                                <div class="col-span-6 sm:col-full">
                                    <Button fullWidth>Save</Button>

                                </div>
                            </div>
                        </form>
                    </div>


                </div>

            </div>

        </>
    );
};

export default SignIn;
