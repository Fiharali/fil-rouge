import { Button } from '@material-tailwind/react'
import React from 'react'

export default function UserCardSkeleton() {
    return (
        <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (

                <div className="flex flex-col gap-4  mt-5  p-5  h-full  w-full  mx-auto  rounded-lg  shadow-lg " key={index}>
                    <div className="flex gap-4 items-center">
                        <div className="skeleton w-28 h-28 rounded-full shrink-0 mx-auto"></div>
                        {/* <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div> */}
                    </div>
                    <div className="skeleton h-4 w-20 mx-auto mt-2"></div>
                    <div className="skeleton h-4 w-10 mx-auto "></div>
                    <div className="flex flex-row gap-4 mx-auto">
                        <div className="skeleton h-10 w-20"></div>
                        <div className="skeleton h-10 w-20"></div>
                    </div>


                </div>
            ))}


        </>
    )
}
