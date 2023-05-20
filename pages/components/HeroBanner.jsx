import React from "react";
import Link from "next/link";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        {console.log(heroBanner)}
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>Mid Text</h3>
        <img src="" alt="perfumes" className="hero-banner-image" />

        <div>
          <Link href="/product/ID">
            <button type="button">Button Text</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
