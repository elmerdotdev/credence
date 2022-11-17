import React, { useEffect, useState } from 'react'
import { Bubble } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)
const MostInteracted = () => {
    const [allClients, setAllClients] = useState('')
    const [notes, setNotes] = useState('')
    const [dateCreated, setDateCreated] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        const getClients = async () => {
            const clients = await fetchClients();
            console.log(clients);
            const created = clients.map(index => {
                return index._id
            });
            const upd = clients.map(index => {
                return index.phone
            });

            setAllClients(clients);
            setPhone(upd);
            setDateCreated(created);
            console.log(created);

        }

        const getNotes = async () => {
            const notes = await fetchNotes();
            setNotes(notes);
            console.log(notes);
        }

        getClients();
        getNotes();
    }, [])

    const fetchClients = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/63645e4850049bfd1e89637a`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const fetchNotes = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/63645e4850049bfd1e89637a`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const xArray = dateCreated;
    const yArray = phone - 1000;
    const rArray = ["5", "6", "7", "9", "5", "5", "7", "10", "4", "3", "5", "6", "7", "9", "5", "5", "7", "10", "4", "3"]
    const chartData = [];

    xArray.forEach(function(e, i) {
        chartData.push({
            x: parseFloat(e),
            y: parseFloat(yArray[i]),
            r: parseFloat(rArray[i]),
        });
    });

    const data = {
        datasets: [{
          label: 'First Dataset',
          data: chartData,
          backgroundColor: 'rgb(255, 99, 132)'
        }]
      };

    const options = {
        plugins: {
            legend: {
                display: false,
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