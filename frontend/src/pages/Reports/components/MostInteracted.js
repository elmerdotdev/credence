import React, { useEffect, useState } from 'react'
import { Bubble } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)
const MostInteracted = () => {
    const [notes, setNotes] = useState('')
    const [events, setEvents] = useState('')
    const [dateCreated, setDateCreated] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {


        const getNotes = async () => {
            const notes = await fetchNotes();
            // const notesByClient = notes.reduce((map, val) => {
            //     if(!map[val.client_id]) {
            //         map[val.client_id] = [];
            //     }
            //     map[val.client_id].push(val.client_id);
            //     return map
            // })
            const notesByClient = notes.map()
            setNotes(notes);
            console.log(notesByClient)
        }

        const getEvents = async () => {
            const events = await fetchEvents();
            setEvents(events);
            console.log(events);
        }

        getNotes();
        getEvents();
    }, [])


    const fetchNotes = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/63645e4850049bfd1e89637a`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const fetchEvents = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/63645e4850049bfd1e89637a`)
        const data = await response.json()

        if (response.ok) {
            return data
        }
    }

    const xArray = dateCreated;
    const yArray = phone - 1000;
    const rArray = ["5", "6", "7", "9", "5", "5", "7", "10", "4", "3", "5", "6", "7", "9", "5", "5", "7", "10", "4", "3"]
    const chartData = [];

    // xArray.forEach(function(e, i) {
    //     chartData.push({
    //         x: parseFloat(e),
    //         y: parseFloat(yArray[i]),
    //         r: parseFloat(rArray[i]),
    //     });
    // });

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