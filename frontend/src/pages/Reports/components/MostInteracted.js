import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const MostInteracted = () => {
    const [clientNames, setClientNames] = useState('')
    const [notes, setNotes] = useState('')
    const [events, setEvents] = useState('')

    const userID = JSON.parse(localStorage.getItem('user'))._id


    useEffect(() => {
      const getClients = async () => {
          const clients = await fetchClients();

          setClientNames(clients.map((client) => {return client.firstname + " " + client.lastname}));
      }

      const getNotes = async() => {
        const notes = await fetchNotes();

        setNotes(notes);
      }

      getNotes();
      getClients();
  }, [])

    const fetchClients = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/${userID}`)
      const data = await response.json()

      if (response.ok) {
          return data
      }
    }

    const fetchNotes = async () => {
        const response = await fetch (`${process.env.REACT_APP_API_URL}/api/notes/${userID}`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            yAlign: 'bottom'
          }
        },
        scales: {
            x: {
                stacked: true,
                // ticks: {
                //     display: false,
                // },
            },
            y: {
                stacked: true,
            },
        },
      };
            
    const data = {
        labels: clientNames,
        datasets: [
          {
            label: 'Clients in this Industry',
            data: [5,7,3,4,2,6,7],
            backgroundColor:"#88B2D8",
          },
          {
            label: 'Dataset 2',
            data: [5, 7, 4, 7, 8, 2, 4],
            backgroundColor: "#9CCC89"
          },
          {
            label: 'Dataset 3',
            data: [5, 7, 4, 7, 8, 2, 4],
            backgroundColor: "#9CCC34"
          }
        ],
      };


    return (
        <div>
            <h3>Most Interacted</h3>
            <Bar data={data} options={options}/>
        </div>

    )
}

export default MostInteracted