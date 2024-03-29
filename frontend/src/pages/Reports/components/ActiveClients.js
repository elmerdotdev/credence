import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)
const ActiveClients = () => {
    const [activeClients, setActiveClients] = useState('')
    const [inactiveClients, setInactiveClients] = useState('')

    const userID = JSON.parse(localStorage.getItem('user'))._id

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const data = {
        labels: ["Active", "Inactive"],
        position: 'right',
        datasets: [{
            data: [activeClients, inactiveClients],
            backgroundColor: [
                "#87B0D8",
                "#94CA86"
            ],
            hoverOffset: 2
        }]
    }

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 15
                }
            }
        }
    }


    return (
        <div>
            <h3>Clients: Active vs Inactive</h3>
            <Pie data={data} options={options}/>
        </div>

    )
}

export default ActiveClients