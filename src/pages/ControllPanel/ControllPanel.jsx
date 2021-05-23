import React from "react";
import { Link } from "react-router-dom";
import Card1 from "../../assets/card1.jpg";
import ControllPanelCard from "../../components/ControllPanelCard";

const ControllPanel = () => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="text-center text-5xl lg:text-8xl  text-primary ">
        Manage Application
      </div>
      <div>
        <Link to="/addsubject">
          <ControllPanelCard
            cardName="add new subject"
            imageurl={Card1}
            addedClass=" hover:scale-105 rounded-br-3xl  rounded-tl-3xl lg:rounded-br-full  lg:rounded-tl-full"
          />
        </Link>
      </div>
      <div>
        <Link to="/manageconsultations">
          <ControllPanelCard
            cardName="Manage Consultations"
            imageurl={Card1}
            addedClass=" hover:scale-105 rounded-bl-3xl  rounded-tr-3xl lg:rounded-bl-full  lg:rounded-tr-full"
          />
        </Link>
      </div>
      <div>
        <Link to="/managetags">
          <ControllPanelCard
            cardName="manage tags"
            imageurl={Card1}
            addedClass=" hover:scale-105  rounded-br-3xl  rounded-tl-3xl lg:rounded-br-full  lg:rounded-tl-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default ControllPanel;
