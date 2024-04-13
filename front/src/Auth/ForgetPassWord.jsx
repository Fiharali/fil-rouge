import { useEffect, useState } from "react";
import { z } from 'zod';
import { axiosSetup } from "./../api/axiosSetup.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import LoopIcon from '@mui/icons-material/Loop';
import { ApiFunctions } from "../functions/Api.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import { isAuth } from "../roles/isAuth.jsx";
import { isHasRole } from "../roles/isHasRole.jsx";

const schema = z.object({
    email: z.string().email(),
});




export default function ForgetPassword() {

    const UserContext = useUserContext()
    const [formData, setFormData] = useState({
        email: '',
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
                const data = await ApiFunctions.resetLink(formData);
                // console.log(data);
                setErrors(prevState => ({
                    ...prevState,
                    email: data.message ?? "Reset link sent to your email" 
                }));
            } catch (error) {
                console.error('Error:', error);
                setErrors(prevState => ({
                    ...prevState,
                    email: error.response?.data.error ?? error.response.data.message
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
                                <p className="mb-4 text-grey-700">Enter your email </p>

                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    <p className="mx-4 text-grey-600"></p>
                                    <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                </div>
                                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                                <input id="email" type="email" name="email" placeholder="mail@loopple.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
                                {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}
                                <div className="flex flex-row justify-between mb-8 mt-6">
                                    <Link to='/login' className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</Link>
                                </div>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className=""
                                >
                                    {loading ? (
                                        <LoopIcon className="animate-spin" />
                                    ) : 'Reset Password'}
                                </Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}








