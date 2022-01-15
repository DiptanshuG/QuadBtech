import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ShowSummary({ info, setViewSummary,setShowForm }) {
  return (
    <div>
      <div><img src={info.image}/></div>
      <div>{info.type}</div>
      <div>{info.language}</div>
      <div  >{info.genre}</div>
      <div>{info.schedule}</div> 
      <div>{info.rating}</div>
      <div>{info.premiered}</div>

      <div className="text" dangerouslySetInnerHTML={{ __html: info.summary }}></div>
      <button className="btn btn-warning m-24px p-2px" onClick={()=>{
          setShowForm(true)
      }} >$ Book</button>
      <button
      className="btn btn-danger"
        onClick={() => {
          setViewSummary({ show: false, info: null });
        }}
      >
        close
      </button>
    </div>
  );
}
