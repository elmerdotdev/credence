import React, { useEffect, useState } from 'react'
import { Bubble } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)
const MostInteracted = () => {
    // const [activeClients, setActiveClients] = useState('')
    // const [inactiveClients, setInactiveClients] = useState('')

    // useEffect(() => {
    //     const getClients = async () => {
    //         const clients = await fetchClients();
    //         const active = clients.filter((client) => client.active == true)
    //         const inactive = clients.filter((client) => client.active == false)
    //         setActiveClients(active.length)
    //         setInactiveClients(inactive.length)
    //     }

    //     getClients();
    // }, [])

    // const fetchClients = async () => {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/63645e4850049bfd1e89637a`)
    //     const data = await response.json()

    //     if (response.ok) {
    //         return data
    //     }
    // }

    const data = {
        datasets: [{
          label: 'First Dataset',
          data: [{
            x: 20,
            y: 30,
            r: 15
          }, {
            x: 40,
            y: 10,
            r: 10
          }],
          backgroundColor: 'rgb(255, 99, 132)'
        }]
      };

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
            <h3>Most Interacted</h3>
            <Bubble data={data} options={options}/>
        </div>

    )
}

export default MostInteracted