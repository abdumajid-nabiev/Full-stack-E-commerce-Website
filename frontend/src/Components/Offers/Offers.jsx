import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Ekskluziv</h1>
        <h1>Takliflar siz uchun</h1>
        <p>Faqat eng yaxshi sotuvdagi buyumlar mavjud !</p>
        <button>Ko'rish</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
