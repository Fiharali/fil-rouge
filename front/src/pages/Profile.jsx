import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ApiFunctions } from "../functions/Api";
import { userEditProfile } from "../lib/validations/validation";






const Profile = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [levels, setLevels] = useState([]);
    const [classNames, setClassNames] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: ' ',
        last_name: '',
        email: '',
        number: '',
        password: '',
        level_id: null,
        class_name_id: '',
        promotion_id: '',
        campus_id: ' ',
        city_id: '',
        role: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // console.log(formData)
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));

    };

    useEffect(() => {
        getAuthUser();

    }, []);
    const getAuthUser = async () => {

        try {
            const data = await ApiFunctions.getAuthUser();
            //console.log(data.user.roles);

            setData(data.user);
            setFormData(data.user);
            setCities(data.cities);
            setCampuses(data.campuses)
            setClassNames(data.class_names)
            setLevels(data.levels)
            setPromotions(data.promotions)
            setRoles(data.roles)

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleSubmit = async (e) => {
        // console.log('Submit')
        e.preventDefault();
        if (validate()) {
            console.log('h')

            try {

                const data = await ApiFunctions.editAuthUser(formData);

                setSelectedFile(null)


                Swal.fire({
                    //position: "top",
                    title: data.success,
                    icon: "success",
                    timer: 2000,
                });
                getAuthUser();

            } catch (error) {
                console.error('Error:', error);

            }
        }


    };
    const validate = () => {
        try {
            userEditProfile.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };


    return (
        <>


            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 ">

                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 ">

                        <div className="block flex  mx-auto w-fit  ">

                            {selectedFile ? (
                                <img src={URL.createObjectURL(selectedFile)} alt="Selected file" className=" mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" />
                            ) :
                                formData.image ?
                                    (<img className="mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" src={formData.image} alt="Jese picture" />)
                                    :
                                    <img class="mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" src="https://randomuser.me/api/portraits/women/21.jpg" alt="Jese picture" />
                            }
                            <div className="flex items-center justify-center   rounded-full col-span-2 ms-2">
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
                        {/* <Button fullWidth className="mt-8">Save</Button> */}


                    </div>
                    <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 ">
                        <h3 className="mb-4 text-xl font-semibold ">Password information</h3>
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                                    <label for="current-password" className="block mb-2 text-sm font-medium ">Current password</label>
                                    <input type="text" name="current-password" id="current-password" className="shadow-sm  border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                                </div>
                                <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                                    <label for="password" className="block mb-2 text-sm font-medium ">New password</label>
                                    <input data-popover-placement="bottom" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" />

                                </div>
                                <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                                    <label for="confirm-password" className="block mb-2 text-sm font-medium ">Confirm password</label>
                                    <input type="text" name="confirm-password" id="confirm-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                                </div>
                                <div className="col-span-6 sm:col-full">
                                    <Button fullWidth>Save</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 ">
                        <h3 className="mb-4 text-xl font-semibold ">General information</h3>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" >
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="first_name" className="block mb-2 text-sm font-medium ">First Name</label>
                                    <input type="text" name="first_name" id="first_name" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="first name" value={formData.first_name} onChange={handleChange} />
                                    {errors.first_name && <span className="text-red-500 text-left ms-5">{errors.first_name}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="last_name" className="block mb-2 text-sm font-medium ">Last Name</label>
                                    <input type="text" name="last_name" id="last_name" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={formData.last_name} onChange={handleChange} />
                                    {errors.last_name && <span className="text-red-500 text-left ms-5">{errors.last_name}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="email" className="block mb-2 text-sm font-medium ">email</label>
                                    <input type="text" name="email" id="email" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="number" className="block mb-2 text-sm font-medium ">number</label>
                                    <input type="text" name="number" id="number" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="number" value={formData.number} onChange={handleChange} />
                                    {errors.number && <span className="text-red-500 text-left ms-5">{errors.number}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="city_id" className="block mb-2 text-sm font-medium ">city</label>
                                    <select
                                        name="city_id"
                                        id="city_id"
                                        className="shadow-sm border sm:text-sm rounded-lg block w-full p-2.5"
                                        value={formData.city_id}
                                        onChange={handleChange}
                                        disabled
                                    >
                                        <option value="">choose city </option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id} {...(city.id === formData.city.id ? { selected: true } : {})}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.city_id && <span className="text-red-500 text-left ms-5">{errors.city_id}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="campus_id" className="block mb-2 text-sm font-medium ">campus</label>
                                    <select name="campus_id" id="campus_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.campus_id} onChange={handleChange} disabled>
                                        <option value=""> choose campus </option>
                                        {
                                            campuses.map(campus => (
                                                <option key={campus.id} value={campus.id} {...(campus.id === formData.campus.id ? { selected: true } : {})}>
                                                    {campus.name}
                                                </option>

                                            ))
                                        }
                                    </select>
                                    {errors.campus_id && <span className="text-red-500 text-left ms-5">{errors.campus_id}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="promotion_id" className="block mb-2 text-sm font-medium ">promotion</label>
                                    <select name="promotion_id" id="promotion_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.promotion_id} onChange={handleChange} disabled >
                                        <option value=""> choose promotion </option>
                                        {
                                            promotions.map(promotion => (
                                                <option key={promotion.id} value={promotion.id} {...(promotion.id === formData.promotion.id ? { selected: true } : {})}>
                                                    {promotion.name}
                                                </option>

                                            ))
                                        }
                                    </select>
                                    {errors.promotion_id && <span className="text-red-500 text-left ms-5">{errors.promotion_id}</span>}
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label for="level_id" className="block mb-2 text-sm font-medium ">level</label>
                                    <select name="level_id" id="level_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.level_id} onChange={handleChange} disabled >
                                        <option value=""> choose level</option>
                                        {
                                            levels.map(level => (
                                                <option key={level.id} value={level.id} {...(level.id === formData.level.id ? { selected: true } : {})}>
                                                    {level.name}
                                                </option>

                                            ))
                                        }
                                    </select>
                                    {errors.level_id && <span className="text-red-500 text-left ms-5">{errors.level_id}</span>}
                                </div>
                                <div className="col-span-6 ">
                                    <label for="class_name_id" className="block mb-2 text-sm font-medium ">class name</label>
                                    <select name="class_name_id" id="class_name_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={formData.class_name_id} onChange={handleChange} disabled>
                                        <option value=""> choose class name</option>
                                        {
                                            classNames.map(classname => (
                                                <option key={classname.id} value={classname.id} {...(classname.id === formData.class_name.id ? { selected: true } : {})}>
                                                    {classname.name}
                                                </option>

                                            ))
                                        }
                                    </select>
                                    {errors.class_name_id && <span className="text-red-500 text-left ms-5">{errors.class_name_id}</span>}
                                </div>

                                <div className="col-span-6 sm:col-full">
                                    <Button type="submit" fullWidth>Save</Button>

                                </div>
                            </div>
                        </form>
                    </div>


                </div>

            </div>

        </>
    );
};

export default Profile;
