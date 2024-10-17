import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/anjana/CeoDashboard.css';

function CeoDashboard() {
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);
  const [packages, setPackages] = useState([]);
  const [clients, setClients] = useState([]);
  const [destinations, setDestinations] = useState([]);

  function setStates() {
    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/flights`)
    //   .then((response) => {
    //     setFlights(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels`)
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/guides`)
      .then((response) => {
        setGuides(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/destination`)
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/packages`)
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/client`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => { setStates() }, []);

  return (
    <div className="CeoDashMainCont" data-testid="ceodashboard">
       <h1>Welcome to the Editor Dashboard!</h1>
    <div className="center-container">
        <img src="https://i.ibb.co/ZxkZqK3/R-3.jpg" alt="Dashboard Image" style={{ paddingTop: '70px',width: '900px', height: '600px' }} />
        <div className="overlay-text" style={{ position: 'absolute', top: '47%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
            <p style={{ fontSize: '30px', color: '#af002a ', fontWeight: 'bold' }}>"Streamline operations by managing hotels, tour guides, and packages. Easily update, add, or delete information for seamless tour planning."</p>
        </div>
    </div>
    </div>
  )
}

export default CeoDashboard