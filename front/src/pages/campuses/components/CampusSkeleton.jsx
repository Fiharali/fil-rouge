import { Button } from '@material-tailwind/react'
import React from 'react'

export default function CampusSkeleton() {
    return (
        <div className="overflow-x-auto  mt-5 ">
    

            <table className="table table-zebra w-full md:w-3/4 mx-auto mt-16">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date creation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder rows for skeleton */}
                    {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <tr key={index} className=' h-12'>
                            <td className="animate-pulse py-2 h-5"> </td>
                            <td className="animate-pulse"> </td>
                            <td className="animate-pulse"> </td>
                            <td className="animate-pulse"> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
