import React from "react";
import Breadcrum from "./breadcrum";

export const HeroTitle = ({ title, subtitle, parent, children }) => {
  return (
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
          <Breadcrum parent={parent} children={children} />
        </div>
      </div>
    </section>
  );
};
