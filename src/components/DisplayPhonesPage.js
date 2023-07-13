import { useState, useEffect } from "react";
import axios from "axios";

function DisplayPhonesPage() {
  const [phones, setPhones] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const getAllPhones = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/phones`)
      .then((response) => {
        setPhones(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  useEffect(() => {
    getAllPhones();
  }, []);

  return (
    <div className="card">
    <h1>Phones List</h1>
    {loading ? (
      <div className="spinner">Loading...</div>
    ) : (
        <div className="container">
          <div className="card-body">
            {phones &&
              phones.map((element) => (
                <div key={element._id}>
                  <div
                    class="bg-image hover-overlay ripple"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        `/images/${element.imageFileName}`
                      }
                      alt="Phone image"
                    />
                  </div>
                  <p className="card-title">{element.name}</p>
                  <button
                    className="btn btn-primary"
                    onClick={handleDetailsClick}
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </button>
                  {showDetails && (
                    <div>
                      {" "}
                      <p>Brand : {element.manufacturer}</p>
                      <p> Description : {element.description}</p>
                      <p>Color : {element.color}</p>
                      <p>Retail Price : {element.price} $</p>
                      <p>Screen : {element.screen}</p>
                      <p>Processor : {element.processor}</p>
                      <p>Ram : {element.ram}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        )}
      
    </div>
  );
}

export default DisplayPhonesPage;
