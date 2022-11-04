import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)
const IndustryType = () => {
    const [technology, setTechnology] = useState('')
    const [hospitality, setHospitality] = useState('')
    const [finance, setFinance] = useState('')
    const [retail, setRetail] = useState('')
    const [artAndDesign, setArtAndDesign] = useState('')
    const [manufacturing, setManufacturing] = useState('')
    const [media, setMedia] = useState('')


    useEffect(() => {
      const getClients = async () => {
          const clients = await fetchClients();
          const tech = clients.filter((client) => client.labels.some((label) => label.text === 'Technology' && label.select === true))
          const hosp = clients.filter((client) => client.labels.some((label) => label.text === 'Hospitality' && label.select === true))
          const fin = clients.filter((client) => client.labels.some((label) => label.text === 'Finance' && label.select === true))
          const ret = clients.filter((client) => client.labels.some((label) => label.text === 'Retail' && label.select === true))
          const art = clients.filter((client) => client.labels.some((label) => label.text === 'Art & Design' && label.select === true))
          const manu = clients.filter((client) => client.labels.some((label) => label.text === 'Manufacturing' && label.select === true))
          const med = clients.filter((client) => client.labels.some((label) => label.text === 'Media' && label.select === true))
          
          setTechnology(tech.length)
          setHospitality(hosp.length)
          setFinance(fin.length)
          setRetail(ret.length)
          setArtAndDesign(art.length)
          setManufacturing(manu.length)
          setMedia(med.length)


          // console.log(clients)
      }

      getClients();
  }, [])

    const fetchClients = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/63645e4850049bfd1e89637a`)
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
      
      const labels = ['Technology', 'Hospitality', 'Finance', 'Retail', 'Art & Design', 'Manufacturing', 'Media'];
      
    const data = {
        labels,
        datasets: [
          {
            data: [technology,hospitality,finance,retail,artAndDesign,manufacturing,media],
            backgroundColor: [
              "#88B2D8",
              "#9CCC89",
              "#F1C67C",
              "#E58A89",
              "#878BE7",
              "#8D92E8",
              "#7DDBD9"
            ],
          },
        ],
      };

    return (
        <div>
            <h3>Industries Represented</h3>
            <div><Bar data={data} options={options}/></div>

        </div>

    )
}

export default IndustryType