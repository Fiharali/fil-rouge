import { Button } from "@material-tailwind/react";
import { School, Trash2, UserRoundCog, UserX } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserCard(props) {
    return (
        <div key={props.user.id} class="max-w-sm w-full  mx-auto  rounded-lg overflow-hidden shadow-lg ">
            <div class=" px-4 pb-6">
                <div class="text-center my-4">
                    <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                        src={props.user.image ? props.user.image : 'https://randomuser.me/api/portraits/women/21.jpg'} alt="" />

                    <div class="py-2">
                        <h3 class="font-bold text-2xl  mb-1">{props.user.first_name} {props.user.last_name}</h3>
                        <div class="inline-flex  items-center">
                            <School className="me-2" />
                            {props.user.class_name.name}
                        </div>
                        <br />
                        {props.user.roles.join(', ')}
                    </div>
                </div>
                <hr />
                <div class="flex gap-2 justify-center mt-2">
                    <Button color="white"> <Link to={`/user/${props.user.id}`}><UserRoundCog color="black" /></Link></Button>
                    <Button color="" onClick={() => props.deleteUser(props.user.id)} ><UserX /></Button>
                    {/* <Trash2 onClick={() => props.deleteUser(props.user.id)} color="red" /> */}

                </div>
            </div>
        </div>
    )
}
