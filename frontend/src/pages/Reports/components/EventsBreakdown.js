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


const EventsBreakdown = () => {
    const [january, setJanuary] = useState('')
    const [february, setFebruary] = useState('')
    const [march, setMarch] = useState('')
    const [april, setApril] = useState('')
    const [may, setMay] = useState('')
    const [june, setJune] = useState('')
    const [july, setJuly] = useState('')
    const [august, setAugust] = useState('')
    const [september, setSeptember] = useState('')
    const [october, setOctober] = useState('')
    const [november, setNovember] = useState('')
    const [december, setDecember] = useState('')

    useEffect(() => {
        const getEvents = async () => {
            const events = await fetchEvents();
            const jan = events.filter((event) => {return event.start_date > '2022-01-01' && event.start_date < '2022-02-01'})
            const feb = events.filter((event) => {return event.start_date > '2022-02-01' && event.start_date < '2022-03-01'})
            const mar = events.filter((event) => {return event.start_date > '2022-03-01' && event.start_date < '2022-04-01'})
            const apr = events.filter((event) => {return event.start_date > '2022-04-01' && event.start_date < '2022-05-01'})
            const may = events.filter((event) => {return event.start_date > '2022-05-01' && event.start_date < '2022-06-01'})
            const jun =  events.filter((event) => {return event.start_date > '2022-06-01' && event.start_date < '2022-07-01'})
            const jul = events.filter((event) => {return event.start_date > '2022-07-01' && event.start_date < '2022-08-01'})
            const aug = events.filter((event) => {return event.start_date > '2022-08-01' && event.start_date < '2022-09-01'})
            const sep = events.filter((event) => {return event.start_date > '2022-09-01' && event.start_date < '2022-10-01'})
            const oct = events.filter((event) => {return event.start_date > '2022-10-01' && event.start_date < '2022-11-01'})
            const nov = events.filter((event) => {return event.start_date > '2022-11-01' && event.start_date < '2022-12-01'})
            const dec = events.filter((event) => {return event.start_date > '2022-12-01' && event.start_date < '2023-01-01'})
            
            setJanuary(jan.length)
            setFebruary(feb.length)
            setMarch(mar.length)
            setApril(apr.length)
            setMay(may.length)
            setJune(jun.length)
            setJuly(jul.length)
            setAugust(aug.length)
            setSeptember(sep.length)
            setOctober(oct.length)
            setNovember(nov.length)
            setDecember(dec.length)

        }

        getEvents();
    }, [])

    const fetchEvents = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/63645e4850049bfd1e89637a`)
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
        },
      };

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'My First Dataset',
            data: [january, february, march, april, may, june, july, august, september, october, november, december],
            fill: false,
            borderColor: "#7DDBD9",
            tension: .1
        }]
};


    return (
        <div>
            <h3>Events per Month</h3>
            <Line data={data} options={options}/>
        </div>
    )
}

export default EventsBreakdown