import { Button } from '@material-tailwind/react'
import React from 'react'

export default function CampusSkeleton() {
    return (

        <>
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <tr key={index} className=' h-12'>
                    <td className="animate-pulse py-2 h-5"> </td>
                    <td className="animate-pulse"> </td>
                    <td className="animate-pulse"> </td>
                    <td className="animate-pulse"> </td>
                </tr>
            ))}
        </>
    )
}

