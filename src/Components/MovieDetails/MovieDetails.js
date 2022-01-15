import React from "react";
import { Col, Row } from "reactstrap";
import "./MovieDetails.css";

const MovieDetails = ({ info, setViewSummary, setShowForm }) => {
  return (
    <div className="movie-details" style={{ background: `url(${info.image})` }}>
      <div className="movie-details_content">
        <h1 className="movie-details_name">{info.name}</h1>

        <div
          className="movie-details_description mt-5"
          dangerouslySetInnerHTML={{ __html: info.summary }}
        ></div>
        <Row className="mt-5">
          <Col xs="auto">
            <button
              className="btn btn-warning px-5"
              onClick={() => {
                setShowForm(true);
              }}
            >
              $ Book
            </button>
          </Col>
          <Col xs="auto">
            <button
              className="btn btn-danger px-4"
              onClick={() => {
                setViewSummary({ show: false, info: null });
              }}
            >
              close
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MovieDetails;
