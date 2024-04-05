import { useEffect, useState } from "react";
import { z } from 'zod';
import { axiosSetup } from "./../api/axiosSetup.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import LoopIcon from '@mui/icons-material/Loop';
import { ApiFunctions } from "../functions/Api.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import { isAuth } from "../roles/isAuth.jsx";
import { isHasRole } from "../roles/isHasRole.jsx";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});




export default function Login() {

    const UserContext = useUserContext()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        isAuth() && navigate('/')
    });

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {

                // const csrf = await axiosSetup.get('/sanctum/csrf-cookie');
                const data = await ApiFunctions.Login(formData);
                //console.log(data);
                UserContext.setUser(data.user)
                UserContext.setIsAuth(true)
                UserContext.setToken(data.token)
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('isAuth', true);
                localStorage.setItem('token', JSON.stringify(data.token));

                //console.log(data.user.roles)
                isHasRole(data.user.roles)
                // navigate('/users')

            } catch (error) {
                console.error('Error:', error);
                setErrors(prevState => ({
                    ...prevState,
                    email: error.response?.data.error //?? error.response.data.message
                }));
            } finally {
                setLoading(false);
            }
        }
    };
    return (



        <>

            <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
                <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full lg:p-12">
                        <div className="flex items-center xl:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-2/5 md:mx-auto sm:mx-5 ">
                            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit}>
                                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
                                <p className="mb-4 text-grey-700">Enter your email and password</p>

                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    <p className="mx-4 text-grey-600"></p>
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>
                                <label htmlhtmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                                <input id="email" type="email" name="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
                                {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}
                                <label htmlhtmlFor="password" className={`mb-2 text-sm text-start text-grey-900 ${errors.email ? 'mt-2' : 'mt-7'}`}>Password*</label>
                                <input id="password" type="password" name="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
                                {errors.password && <span className="text-red-500 text-left ms-5">{errors.password}</span>}
                                <div className="flex flex-row justify-between mb-8 mt-6">
                                    <a href="javascript:void(0)" className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</a>
                                </div>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className=""
                                >
                                    {loading ? (
                                        <LoopIcon className="animate-spin" />
                                    ) : 'Sign In'}
                                </Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}








