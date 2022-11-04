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
          console.log(clients.filter((client) => {return client.labels[0].select === false}));
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
            label: 'Dataset 1',
            data: [5,5,2,7,1,10,9,3,11],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <div>
            <h2>Industries Represented</h2>
            <div><Bar data={data} options={options}/></div>

        </div>

    )
}

export default IndustryType