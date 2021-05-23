import React from "react";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import Id3Form from "../../components/Id3Form";
import BayesForm from "../../components/BayesForm";

import bgId3 from "../../assets/bgId3.jpg";
import bgBayes from "../../assets/bgBayes.jpg";

const CheckSelf = () => {
  return (
    <div>
      <Parallax pages={2} style={{ top: "0", left: "0" }}>
        <ParallaxLayer
          offset={0}
          speed={2.5}
          className="bg-light bg-cover bg-opacity-30  w-screen"
          style={{ backgroundImage: `url(${bgId3})` }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.5}
          className="flex justify-center items-center"
        >
          <Id3Form />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2.5}
          className="bg-secondary bg-cover bg-opacity-30   w-screen"
          style={{ backgroundImage: `url(${bgBayes})` }}
        />

        <ParallaxLayer
          offset={1}
          speed={0.5}
          className="flex justify-center items-center"
        >
          <BayesForm />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default CheckSelf;
