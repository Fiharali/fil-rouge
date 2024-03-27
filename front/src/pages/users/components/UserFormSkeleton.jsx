import React from 'react'

export default function UserFormSkeleton() {
    return (
        <div className="grid grid-cols-1 px-4 pt-6 px-6  w-5/6 mx-auto">

            <div className="col-span-2">
                <div className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm w-full dark:border-gray-700 sm:p-6">
                    <div className="block flex mx-auto w-fit flex-wrap flex-col md:flex-row">
                        <div className="mb-4 rounded-lg w-36 h-36 sm:mb-0 xl:mb-4 2xl:mb-0 mx-auto bg-gray-300 animate-pulse"></div>
                        <div className="flex items-center justify-center rounded-full col-span-2 ms-2">
                            <div className="flex rounded-4 flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-2 cursor-pointer bg-gray-300 animate-pulse">
                                <div className="flex flex-col items-center justify-center p-5 rounded-2">
                                    <div className="w-8 h-8 mb-4 bg-gray-500 dark:bg-gray-400"></div>
                                    <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6 mt-10">

                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>
                        <div className="col-span-6 sm:col-span-6 ">
                            <div className="block mb-2 text-sm font-medium bg-gray-300 animate-pulse h-10 rounded-lg"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
