import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)
const ActiveClients = () => {
    const [activeClients, setActiveClients] = useState('')
    const [inactiveClients, setInactiveClients] = useState('')

    useEffect(() => {
        const getClients = async () => {
            const clients = await fetchClients();
            const active = clients.filter((client) => client.active == true)
            const inactive = clients.filter((client) => client.active == false)
            setActiveClients(active.length)
            setInactiveClients(inactive.length)
        }

        getClients();
    }, [])

    const fetchClients = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/633b6a81145c9d79405c54ea`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    // const fetchInactiveClients

    const data = {
        labels: ["Active", "Inactive"],
        datasets: [{
            data: [activeClients, inactiveClients],
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