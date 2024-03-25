
import { ApiFunctions } from "../../../functions/Api";



export const deleteUser = async (id) => {

    const confirmationResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    if (confirmationResult.isConfirmed) {
        try {
            await ApiFunctions.deleteUser(id);

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete user",
                icon: "error"
            });
        }
    }
};