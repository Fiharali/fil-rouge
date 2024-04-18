import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const ChartComponentStatus = (props) => {
    useEffect(() => {
        if (props.absencesWithStatus && props.absencesWithStatus.length > 0 && typeof ApexCharts !== 'undefined') {
            const statuses = props.absencesWithStatus.map(absence => absence.status);
            const counts = props.absencesWithStatus.map(absence => absence.count);

            const options = {
                chart: {
                    type: 'pie',
                    height: '100%',
                    maxWidth: '100%',
                    fontFamily: 'Inter, sans-serif',
                },
                labels: ['Not Confirm' , 'Confirm' , 'retard'],
                series: counts,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };

            const chart = new ApexCharts(document.getElementById('pie-chart'), options);
            chart.render();
        }
    }, [props.absencesWithStatus]);

    return (
        <div className=" w-full  rounded-lg shadow  p-4 md:p-6">
            <div id="pie-chart"></div>
        </div>
    );
};

export default ChartComponentStatus;
