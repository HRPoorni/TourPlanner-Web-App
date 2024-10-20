import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarDark from "../components/NavbarDark";
import "../styles/hashani/HotelResForm.css";

function HotelResForm() {
  const { id } = useParams();

  const [hotel, setHotel] = useState("");

  const getUniqueHotel = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/${id}`);
      setHotel(response.data);
    } catch (err) {
      console.error("Error fetching hotel data:", err);
      alert("Error fetching hotel data. Please try again later.");
    }
  };

  useEffect(() => {
    getUniqueHotel();
  }, [id]);

  const [name, setName] = useState("");
  const [check_in, setCheckin] = useState("");
  const [check_out, setCheckout] = useState("");
  const [suite, setSuite] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [customizations, setCustomizations] = useState("");
  const [currentDate, setCurrentDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Get current date when the component mounts
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  function radio(data1) {
    setCustomizations(data1);
  }

  function getDifference(day1, day2) {
    const dateOne = new Date(day1);
    const dateTwo = new Date(day2);
    const time = Math.abs(dateOne - dateTwo);
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    
    if (!isNaN(days)) {
      return days;
    } else {
      return 0;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newBook = {
      hotelID: hotel._id,
      sellingpPrice: hotel.sellingPrice,
      name,
      hotel_Name: hotel.name,
      check_in,
      check_out,
      suite,
      contactNo,
      customizations,
      total: getDifference(check_in, check_out) * hotel.sellingPrice,
      userID: sessionStorage.getItem("ID"),
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/hotelRes/create`, newBook)
      .then(() => {
        alert("Hotel Booked Successfully");
        // navigate('/hotels');
      })
      .catch((err) => {
        alert("Error ");
        console.log(err);
      });
  }

  function handleCheckInChange(date) {
    if (new Date(date) < new Date()) {
      alert("Please select a future date for Check In.");
      setCheckin("");
    } else {
      setCheckin(date);
    }
  }

  function handleCheckOutChange(date) {
    if (new Date(date) <= new Date(check_in)) {
      alert("Please select a date after Check In for Check Out.");
      setCheckout("");
    } else {
      setCheckout(date);
    }
  }

  return (
    <div id="hotelresform" className="hotelresContainer" data-testid="hotelresform">
      <NavbarDark />
      <br />
      <h1>Booking Details</h1>
      <div className="hotelreseinnercontainer">
        <div className="hotelresformcont">
          <form className="hotelresform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label>Check In</label>
              <input type="date" className="form-control" value={check_in} onChange={(e) => handleCheckInChange(e.target.value)} min={currentDate} required />
            </div>
            <br />

            <div className="form-group">
              <label>Check Out</label>
              <input type="date" className="form-control" value={check_out} onChange={(e) => handleCheckOutChange(e.target.value)} min={currentDate} required />
            </div>
            <br />
            <div className="form-group">
              <label className="form-label">Suite</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Prefered Suite"
                onChange={(e) => {
                  setSuite(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Contact Number"
                min="100000000"
                max="9999999999"
                onChange={(e) => {
                  setContactNo(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <hr />
            <h4>Customizations:</h4>
            <br />
            <div>
              <p>
                Access to the dishes available in the Buffet
                <br />
                (No Additional Fee)
                <br />
                <input
                  type="radio"
                  name="Cuzzi"
                  value="Normal"
                  onChange={(e) => {
                    radio(e.target.value);
                  }}
                />{" "}
                Normal Package
              </p>
              <p>
                Upto 2 pre-Ordered meals served for prefered meals
                <br />
                (Additional Fee to be paid at check-in)
                <br />
                <input
                  type="radio"
                  name="Cuzzi"
                  value="Gold"
                  onChange={(e) => {
                    radio(e.target.value);
                  }}
                />{" "}
                Gold Package
              </p>
              <p>
                Upto 5 pre-Ordered meals with desired drinks
                <br />
                (Additional Fee to be paid at check-in)
                <br />
                <input
                  type="radio"
                  name="Cuzzi"
                  value="Platinum"
                  onChange={(e) => {
                    radio(e.target.value);
                  }}
                />{" "}
                Platinum Package
              </p>
            </div>
            <br />
            <button type="submit" className="submitbtn">
              Submit
            </button>
          </form>
        </div>
        <div className="hotelrestcktcont">
          <div className="hotelrestckt">
            <p>
              Name :<b>{name}</b>
            </p>
            <p>
              Hotel Name :<b>{hotel.name}</b>
            </p>
            <p>
              Check In Date :<b>{check_in}</b>
            </p>
            <p>
              Check Out Date :<b>{check_out}</b>
            </p>
            <p>
              Suite :<b>{suite}</b>
            </p>
            <p>
              Contact Number :<b>{contactNo}</b>
            </p>
            <p>
              Customizations: <b>{customizations}</b>
            </p>
            <p>
              Number of days at the hotel: <b>{getDifference(check_in, check_out)}</b> days
            </p>
            <br />
            <h3>
              <b>Total : Rs {getDifference(check_in, check_out) * hotel.sellingPrice}.00</b>
            </h3>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default HotelResForm;
