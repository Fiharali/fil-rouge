
import { PromotionFunctions } from "../../../functions/promotion";



export const deletePromotion = async (id) => {

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
            await PromotionFunctions.deletePromotion(id);

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            return true;
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete Promotion",
                icon: "error"
            });
            return false;

        }
    }
};