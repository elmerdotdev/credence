import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
)


const TimeSaved = () => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      };

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Without Credence (in hours)',
                data: [8,16,24,32,40,48,56,64,72,80,88,96],
                fill: false,
                backgroundColor: "#7DDBD9",
                borderColor: "#7DDBD9",
                tension: .1
            },
            {
                label: 'With Credence (in hours)',
                data: [4,8,12,16,20,24,28,32,36,40,44,48],
                fill: false,
                backgroundColor:"#E58A89",
                borderColor: "#E58A89",
                tension: .1
            }
        ]
};


    return (
        <div>
            <h3>Save Time With Credence</h3>
            <Line data={data} options={options}/>
        </div>
    )
}

export default TimeSaved