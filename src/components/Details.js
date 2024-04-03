import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Data from "../Data.js";

const Details = ({ apiData }) => {
  const movies = Data.result;
  const [logindata, setLoginData] = useState([]);
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const todayDate = new Date().toISOString().slice(0, 10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Birthday = () => {
    const getuser = localStorage.getItem("user_login");
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);
      setLoginData(user);

      const userbirth = logindata.map((el, k) => {
        return el.date === todayDate;
      });

      if (userbirth) {
        setTimeout(() => {
          console.log("ok");
          handleShow();
        }, 3000);
      }
    }
  };

  const userlogout = () => {
    localStorage.removeItem("user_login");
    history("/");
  };

  useEffect(() => {
    Birthday();
  }, []);

  return (
    <div className="container">
      {logindata.length === 0 ? (
        "error"
      ) : (
        <>
          {logindata[0].date === todayDate ? (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{logindata[0].name} 😄</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Wish you many many happy returns of the day ! 🍰
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            ""
          )}

          {/* Display movies */}
          <div className="row justify-content-center">
            {movies.map((movie, index) => (
              <div key={index} style={{ margin: "10px", width: "200px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Title:</strong> {movie.title}
                </div>
                <div>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div>
                  <strong>Director:</strong> {movie.director.join(", ")}
                </div>
                <div>
                  <strong>Stars:</strong> {movie.stars.join(", ")}
                </div>
                <div>
                  <strong>Genre:</strong> {movie.genre}
                </div>
                <div>
                  <strong>Language:</strong> {movie.language}
                </div>
                {/* Add more information here as needed */}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button onClick={userlogout}>LogOut</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
