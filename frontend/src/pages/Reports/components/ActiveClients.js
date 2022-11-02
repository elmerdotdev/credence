import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)
const ActiveClients = () => {
    // const [activeClient, setActiveClients] = useState('')
    // const [inactiveClient, setInactiveClients] = useState('')


    // const fetchActiveClients = async () => {
    //     const reponse = await fetch(``)
    // }

    // const fetchInactiveClients

    const data = {
        labels: ["Active", "Inactive"],
        datasets: [{
            data: [5, 2],
            backgroundColor: [
                "#0468BF",
                "#D6EAFC"
            ],
            hoverOffset: 4
        }]
    }

    return (
        <div>
            <h1>My Active Clients</h1>
            <div style = {{width:"500px"}}><Doughnut data={data} /></div>

        </div>

    )
}

export default ActiveClients