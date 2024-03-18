import { useState } from "react";
import { z } from 'zod';
import { axiosSetup } from "./../api/axiosSetup.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import LoopIcon from '@mui/icons-material/Loop';
import { ApiFunctions } from "../functions/Api.jsx";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
});

export default function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

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
       
        const csrf = await axiosSetup.get('/sanctum/csrf-cookie');
        const data = await ApiFunctions.Register(formData);
        console.log(data);
        // navigate('/')
      } catch (error) {
        console.error('Error:', error);
        // setErrors(prevState => ({
        //   ...prevState,
        //   email: error.response.data.error
        // }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10 w-full sm:w-3/4 md:w-1/2 lg:w-2/5 md:mx-auto sm:mx-5 ">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit}>
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
              <p className="mb-4 text-grey-700">Enter your name, email, and password</p>

              <label htmlFor="name" className="mb-2 text-sm text-start text-grey-900">Name*</label>
              <input id="name" type="text" name="name" placeholder="John Doe" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
              {errors.name && <span className="text-red-500 text-left ms-5">{errors.name}</span>}

              <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900 mt-4">Email*</label>
              <input id="email" type="email" name="email" placeholder="mail@example.com" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
              {errors.email && <span className="text-red-500 text-left ms-5">{errors.email}</span>}

              <label htmlFor="password" className={`mb-2 text-sm text-start text-grey-900 ${errors.email ? 'mt-2' : 'mt-7'}`}>Password*</label>
              <input id="password" type="password" name="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
              {errors.password && <span className="text-red-500 text-left ms-5">{errors.password}</span>}

              <label htmlFor="password_confirmation" className={`mb-2 text-sm text-start text-grey-900 ${errors.email ? 'mt-2' : 'mt-7'}`}>Confirm Password*</label>
              <input id="password_confirmation" type="password" name="password_confirmation" placeholder="Confirm your password" className="flex items-center w-full px-5 py-4  mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={handleChange} />
              {errors.password_confirmation && <span className="text-red-500 text-left ms-5">{errors.password_confirmation}</span>}

              <Button
                disabled={loading}
                type="submit"
                className="mt-6"
              >
                {loading ? (
                  <LoopIcon className="animate-spin" />
                ) : 'Sign Up'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
