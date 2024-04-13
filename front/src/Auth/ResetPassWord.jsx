import { useEffect, useState } from "react";
import { z } from 'zod';
import { axiosSetup } from "../api/axiosSetup.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import LoopIcon from '@mui/icons-material/Loop';
import { ApiFunctions } from "../functions/Api.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import { isAuth } from "../roles/isAuth.jsx";
import { isHasRole } from "../roles/isHasRole.jsx";
import queryString from 'query-string';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});;




export default function ResetPassWord() {

    const UserContext = useUserContext()
    const { token } = useParams(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        token: token
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isAuth() && navigate('/')

        const parsed = queryString.parse(window.location.search);
        const emailParam = parsed.email;
        if (emailParam) {
            setFormData({ ...formData, email: emailParam });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const validate = () => {
        try {
            schema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            setErrors(error.formErrors.fieldErrors);
            return false;
        }
    };

    //console.log(formData)


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {

                const data = await ApiFunctions.ResetPassWord(formData);
                setErrors(prevState => ({
                    ...prevState,
                    email: data.message ?? "Password reset  successfully" 
                }));
                navigate('/login')

            } catch (error) {
                console.error('Error:', error);
                setErrors(prevState => ({
                    ...prevState,
                    password: error.response?.data?.error ?? error?.response?.data?.[0]?.message ?? 'Something went wrong'
                }));
            } finally {
                setLoading(false);
            }
        }
    };

    if (isAuth()) {
        return null;
    }


    return (



        <>

            <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
                <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full lg:p-12">
                        <div className="flex items-center xl:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-2/5 md:mx-auto sm:mx-5 ">
                            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit}>
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Reset Password</h3>
                                <p className="mb-4 text-grey-700">Enter your password</p>

                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    <p className="mx-4 text-grey-600"></p>
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>
                                <label htmlFor="email" className=" text-sm text-start text-grey-900">Email*</label>
                                <input id="email" type="email" name="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} value={formData.email} disabled />
                                {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}
                                <label htmlFor="password" className={`mb-2 text-sm text-start text-grey-900 ${errors.email ? '' : 'mt-7'}`}>Password*</label>
                                <input id="password" type="password" name="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} value={formData.password} />
                                {errors.password && <span className="text-red-500 text-left ms-5">{errors.password}</span>}
                                <label htmlFor="password_confirmation" className={`mb-2 text-sm text-start text-grey-900 ${errors.password ? '' : 'mt-7'}`}>Password Confirmation*</label>
                                <input id="password_confirmation" type="password" name="password_confirmation" placeholder="Enter a password confirmation" className="flex items-center w-full px-5 py-4  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} value={formData.password_confirmation} />
                                {errors.password_confirmation && <span className="text-red-500 text-left ms-5">{errors.password_confirmation}</span>}
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="mt-10"
                                >
                                    {loading ? (
                                        <LoopIcon className="animate-spin" />
                                    ) : 'Confirm'}
                                </Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}








