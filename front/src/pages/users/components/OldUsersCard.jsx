import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function OldUsesCard(props) {
    const formatDate = (dateString) => {
        const createdAt = new Date(dateString);
        return `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
      };
    return (
        <div key={props.user.id} class="max-w-sm w-full  mx-auto  rounded-lg overflow-hidden shadow-lg ">
            <div class="border-b px-4 pb-6">
                <div class="text-center my-4">
                    <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                        src={props.user.image ? props.user.image : 'https://randomuser.me/api/portraits/women/21.jpg'} alt="" />

                    <div class="py-2">
                        <h3 class="font-bold text-2xl  mb-1">{props.user.first_name} {props.user.last_name}</h3>
                        <div class="inline-flex  items-center">
                            <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path class=""
                                    d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                            </svg>
                            {formatDate(props.user.deleted_at)}

                        </div>
                        <br />
                        {props.user.roles.join(', ')}
                    </div>
                </div>
                <div class="flex gap-2 justify-center">

                    <Button onClick={() => props.restoreUser(props.user.id)} >Restore</Button>

                </div>
            </div>
        </div>
    )
}
