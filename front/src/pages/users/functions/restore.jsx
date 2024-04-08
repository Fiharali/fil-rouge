
import { ApiFunctions } from "../../../functions/Api";



export const restoreUser = async (id) => {

    const confirmationResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, restore it!"
    });
    

    if (confirmationResult.isConfirmed) {
        try {
            await ApiFunctions.restoreUser(id);

            Swal.fire({
                title: "restored!",
                text: "Your file has been restored.",
                icon: "success"
            });
            return true;
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to restore user",
                icon: "error"
            });
            return false;

        }
    }
};