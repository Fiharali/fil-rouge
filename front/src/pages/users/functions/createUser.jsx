import { ApiFunctions } from "../../../functions/Api";
export const createUser = async (formData) => {
    // console.log('Submit')


    try {

        const data = await ApiFunctions.addUser(formData);
        //console.log(data);
        return { success: true, data };

    
        Swal.fire({
            title: data.success,
            icon: "success",
            timer: 2000,
        });
        

    } catch (error) {
        console.error('Error:', error);
        return error
        
    }
};