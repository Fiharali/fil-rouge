import { Button } from '@material-tailwind/react';
import React from 'react'

export default function UserEditForm(props) {
    return (
        <form onSubmit={props.submitUserEdit} encType="multipart/form-data" className="mt-5" >
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label for="first_name" className="block mb-2 text-sm font-medium ">First Name</label>
                    <input type="text" name="first_name" id="first_name" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="first name" value={props.formData.first_name} onChange={props.handleChange} />
                    {props.errors.first_name && <span className="text-red-500 text-left ms-5">{props.errors.first_name}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="last_name" className="block mb-2 text-sm font-medium ">Last Name</label>
                    <input type="text" name="last_name" id="last_name" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="last name" value={props.formData.last_name} onChange={props.handleChange} />
                    {props.errors.last_name && <span className="text-red-500 text-left ms-5">{props.errors.last_name}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="email" className="block mb-2 text-sm font-medium ">email</label>
                    <input type="text" name="email" id="email" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="email" value={props.formData.email} onChange={props.handleChange} />
                    {props.errors.email && <span className="text-red-500 text-left ms-5">{props.errors.email}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="number" className="block mb-2 text-sm font-medium ">number</label>
                    <input type="text" name="number" id="number" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" placeholder="number" value={props.formData.number} onChange={props.handleChange} />
                    {props.errors.number && <span className="text-red-500 text-left ms-5">{props.errors.number}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="city_id" className="block mb-2 text-sm font-medium ">city</label>
                    <select
                        name="city_id"
                        id="city_id"
                        className="shadow-sm border sm:text-sm rounded-lg block w-full p-2.5"
                        value={props.formData.city_id}
                        onChange={props.handleChange}

                    >
                        <option value="">choose city </option>
                        {props.cities.map(city => (
                            <option key={city.id} value={city.id} {...(city.id === props.formData.city_id ? { selected: true } : {})}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    {props.errors.city_id && <span className="text-red-500 text-left ms-5">{props.errors.city_id}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="campus_id" className="block mb-2 text-sm font-medium ">campus</label>
                    <select name="campus_id" id="campus_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={props.formData.campus_id} onChange={props.handleChange} >
                        <option value=""> choose campus </option>
                        {
                            props.campuses.map(campus => (
                                <option key={campus.id} value={campus.id} {...(campus.id === props.formData.campus.id ? { selected: true } : {})}>
                                    {campus.name}
                                </option>

                            ))
                        }
                    </select>
                    {props.errors.campus_id && <span className="text-red-500 text-left ms-5">{props.errors.campus_id}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="promotion_id" className="block mb-2 text-sm font-medium ">promotion</label>
                    <select name="promotion_id" id="promotion_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={props.formData.promotion_id} onChange={props.handleChange}  >
                        <option value=""> choose promotion </option>
                        {
                            props.promotions.map(promotion => (
                                <option key={promotion.id} value={promotion.id} {...(promotion.id === props.formData.promotion.id ? { selected: true } : {})}>
                                    {promotion.name}
                                </option>

                            ))
                        }
                    </select>
                    {props.errors.promotion_id && <span className="text-red-500 text-left ms-5">{props.errors.promotion_id}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label for="level_id" className="block mb-2 text-sm font-medium ">level</label>
                    <select name="level_id" id="level_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={props.formData.level_id} onChange={props.handleChange}  >
                        <option value=""> choose level</option>
                        {
                            props.levels.map(level => (
                                <option key={level.id} value={level.id} {...(level.id === props.formData.level.id ? { selected: true } : {})}>
                                    {level.name}
                                </option>

                            ))
                        }
                    </select>
                    {props.errors.level_id && <span className="text-red-500 text-left ms-5">{props.errors.level_id}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                    <label for="class_name_id" className="block mb-2 text-sm font-medium ">class name</label>
                    <select name="class_name_id" id="class_name_id" className="shadow-sm  border  sm:text-sm rounded-lg  block w-full p-2.5" value={props.formData.class_name_id} onChange={props.handleChange} >
                        <option value=""> choose class name</option>
                        {
                            props.classNames.map(classname => (
                                <option key={classname.id} value={classname.id} {...(classname.id === props.formData.class_name.id ? { selected: true } : {})}>
                                    {classname.name}
                                </option>

                            ))
                        }
                    </select>
                    {props.errors.class_name_id && <span className="text-red-500 text-left ms-5">{props.errors.class_name_id}</span>}
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                    <label for="role_id" className="block mb-2 text-sm font-medium ">class name</label>
                    <select
                        name="role_id[]"
                        id="role_id"
                        className="shadow-sm border sm:text-sm rounded-lg block w-full p-2.5"
                        multiple
                        size={1}
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                            console.log(selectedOptions);
                            props.setFormData(prevState => ({
                                ...prevState,
                                role_id: selectedOptions
                            }));
                        }}
                    >
                        {props.roles.map(role => (
                            <option
                                key={role.id}
                                value={role.id}
                                {...(props.formData.role_id.includes(role.id) ? { selected: true } : {})}
                            >
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {props.errors.role_id && <span className="text-red-500 text-left ms-5">{errors.role_id}</span>}
                </div>

                <div className="col-span-6 sm:col-full">
                    <Button type="submit" className="text-center" fullWidth loading={props.loading && true} >Save</Button>

                </div>
            </div>
        </form>
    )
}
