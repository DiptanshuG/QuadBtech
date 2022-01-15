import "./App.css";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Toast from "react-bootstrap/Toast";
import Form from "./Components/Form";
import MovieDetails from "./Components/MovieDetails";

function App() {
  const [data, setData] = useState([]);
  const [viewSummary, setViewSummary] = useState({ show: false, info: null });
  const [showForm, setShowForm] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all").then((resp) => {
      resp.json().then((resp) => {
        // console.warn("result" ,reps)
        setData([...resp]);
      });
    });
  }, []);
  console.log(data);

  const submitForm = useCallback((values) => {
    localStorage.setItem("user_data", JSON.stringify(values));
    setShowSuccessToast(true);

    setShowForm(false);
    console.log({ values });
  }, []);

  if (viewSummary && viewSummary.show === true) {
    return (
      <>
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowSuccessToast(false)}
            show={showSuccessToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Booked!</strong>
            </Toast.Header>
            <Toast.Body>Booked Tickets for {viewSummary.info.name}</Toast.Body>
          </Toast>
        </ToastContainer>
        <Modal
          isOpen={showForm}
          toggle={() => {
            setShowForm(false);
          }}
          centered
        >
          <ModalHeader className="justify-content-center">
            Book Your Show
          </ModalHeader>
          <ModalBody>
            <Form submitForm={submitForm} />
          </ModalBody>
        </Modal>
        <MovieDetails
          info={viewSummary.info}
          setViewSummary={setViewSummary}
          setShowForm={setShowForm}
        />
      </>
    );
  }

  return (
    <div className="App bg-">
      <h1>
        QuadB
        <span>tech</span>
      </h1>
      <>
        <table className="border border-dark w-100 p-3 ">
          <thead>
            <tr>
              <td>ID</td>
              <td>Poster</td>
              <td>Shows List</td>
              <td>Score</td>
              <td>Summary</td>
            </tr>
          </thead>

          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.show.id}</td>
                <td>
                  <img alt="showimg" src={item.show.image.medium} />
                </td>
                <td>{item.show.name}</td>
                <td>{item.score}</td>
                <td>
                  <button
                    className=" p-3 mb-2 btn btn-primary btn-lg text-white rounded-circle"
                    text-white
                    onClick={() => {
                      setViewSummary({
                        show: true,
                        info: {
                          summary: item.show.summary,
                          name: item.show.name,
                          image: item.show.image.original,
                          type: item.show.type,
                          language: item.show.language,
                          genres: item.show.genres,
                          schedule: item.show.schedule.time,
                          rating: item.show.rating.average,
                          premiered: item.show.premiered,
                        },
                      });
                    }}
                  >
                    View Summary
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    </div>
  );
}

export default App;
