import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ApiFunctions } from "../../functions/Api";
import { editUser } from "../../lib/validations/validation";
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from "./functions/getUser";
import { userUpdate } from "./functions/UserUpdate";
import UserFormSkeleton from "./components/UserFormSkeleton";
import UserEditForm from "./components/UserEditForm";
import { isAuth } from "../../roles/isAuth";
import  { useUserContext } from "../../context/UserContext";
import { checkAdminAndNavigate } from "../../roles/isAdmin";
export default function UserEdit() {

  const { id } = useParams();
  const navigate = useNavigate()
  const userContext = useUserContext();

  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [classNames, setClassNames] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
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
    role_id: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));


  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    setSelectedFile(file);
    setFormData(prevState => ({
      ...prevState,
      image: file
    }));

  };

  

  useEffect(() => {
    !isAuth() && navigate('/login')
    checkAdminAndNavigate(UserContext, navigate)
    getOneUser();
  }, [isAuth]);
  const getOneUser = async () => {
    setLoadingPage(true);
    const data = await getUser(id);
    // console.log(data)
    setData(data.user);
    setFormData(data.user);
    setCities(data.cities);
    setCampuses(data.campuses)
    setClassNames(data.class_names)
    setLevels(data.levels)
    setPromotions(data.promotions)
    setRoles(data.roles)
    setLoadingPage(false);
  };
  const getAuthUser = async () => {

    try {
      const data = await ApiFunctions.getAuthUser();
      //console.log(data.user);
      userContext.setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const submitUserEdit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const data = await userUpdate(id, formData).finally(() => setLoading(false));
      Swal.fire({
        title: data.success,
        icon: "success",
        timer: 2000,
      });
      getAuthUser()
    }



  };
  const validate = () => {
    try {
      editUser.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      setErrors(error.formErrors.fieldErrors);
      return false;
    }
  };

  //console.log(formData);

  if (loadingPage) {
    return <UserFormSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 px-4 pt-6 px-6  w-5/6 mx-auto">


      <div className="col-span-2">
        <div className="p-4 mb-4  border border-gray-200 rounded-lg shadow-sm w-full  dark:border-gray-700 sm:p-6  ">
          <div className="block flex  mx-auto w-fit flex-wrap flex-col  md:flex-row ">

            {
              selectedFile ? (
                <img src={URL.createObjectURL(selectedFile)} alt="Selected file" className=" mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" />
              ) :
                formData.image ?
                  (<img className="mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" src={formData.image} alt="Jese picture" />)
                  :
                  <img class="mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto" src="https://randomuser.me/api/portraits/women/21.jpg" alt="Jese picture" />
            }
            <div className="flex items-center justify-center   rounded-full col-span-2 ms-2 ">
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

          <UserEditForm handleChange={handleChange} submitUserEdit={submitUserEdit} formData={formData} errors={errors} loading={loading}
            setFormData={setFormData} cities={cities} campuses={campuses} promotions={promotions} levels={levels} classNames={classNames} roles={roles}
          />
        </div >
      </div >




    </div >
  )
}
