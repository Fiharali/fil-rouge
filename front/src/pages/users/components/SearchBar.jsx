import React from 'react'

export default function SearchBar(props) {
    return (
        <div class="max-w-lg   ms-5 hidden md:inline">
            <div class="flex">
                <label htmlFor="search-dropdown" class="mb-2 text-sm font-medium  sr-only ">Your Email</label>
                {/* <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  border border-gray-300 rounded-s-lg  focus:ring-4 focus:outline-none focus:ring-gray-100   dark:focus:ring-gray-700 dark:border-gray-600" type="button">Roles <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg></button> */}

                <select className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 text-sm font-medium text-center  border border-gray-300 rounded-s-lg  focus:ring-4 focus:outline-none focus:ring-gray-100   dark:focus:ring-gray-700 dark:border-gray-600 ' onChange={props.handleChangeSearch} name='role'>
                    <option value="">All roles</option>
                    {props.roles.map((role) => (
                        <option value={role.id}>{role.name}</option>
                    ))}
                </select>
                <div class="relative w-full">
                    <input type="text" class="block p-2.5 w-full z-20 text-sm  rounded-e-lg border-s-2 border " placeholder="Search with name" name='query' onChange={props.handleChangeSearch} />
                    <button class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
