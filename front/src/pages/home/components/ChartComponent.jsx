import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const ChartComponent = (props) => {

    useEffect(() => {
        if (props.absencesData && props.absencesData.length > 0 && typeof ApexCharts !== 'undefined') {

            const categories = props.absencesData.map(absence => absence.date);
            const seriesData = props.absencesData.map(absence => absence.count);

            const options = {
                chart: {
                    type: 'area',
                    height: '100%',
                    maxWidth: '100%',
                    fontFamily: 'Inter, sans-serif',
                    dropShadow: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: categories,
                    labels: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: true,
                    },
                },
                yaxis: {
                    title: {
                        text: 'Absences Count',
                    },
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0); // Customize as needed
                        }
                    }
                },
                series: [{
                    name: 'Absences',
                    data: seriesData,
                }],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                },
            };

            // Render ApexCharts
            const chart = new ApexCharts(document.getElementById('area-chart'), options);
            chart.render();
        }
    }, [props.absencesData]);


    return (
        <div className=" w-full  rounded-lg shadow  p-4 md:p-6 ">
            <div className="flex justify-between">
                <div>

                </div>
                <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    12%
                    <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                    </svg>
                </div>
            </div>
            <div id="area-chart"></div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t  justify-between">
                <div className="flex justify-between items-center pt-5">
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        className="text-sm font-medium  text-center inline-flex items-center"
                        type="button">
                        Last 7 days
                        <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500   dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                        Users Report
                        <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
