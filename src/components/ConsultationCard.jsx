import React, { useState, useEffect } from "react";
require("dotenv").config();

import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const ConsultationCard = ({ consultation }) => {
  let {
    question,
    diseaseHistory,
    replay,
    replayedBy,
    replayedAt,
    createdAt,
    updatedAt,
  } = consultation;

  const [expandStatus, setExpandStatus] = useState(false);

  return (
    <div className="flex flex-col   divide-y-4 divide-secondary divide-opacity-75 border-secondary border-4  rounded-3xl">
      <div className="shadow-inner p-2 bg-white  rounded-t-3xl">
        <div className="text-2xl">Disease History:</div>
        <ReactQuill value={diseaseHistory} readOnly={true} theme="bubble" />
      </div>
      <div className="flex flex-row bg-white focus:outline-none p-2 text-lg w-full shadow-md ">
        <div className="flex-1 ">
          <div className="text-2xl">Question:</div>
          <div className="p-4">{question}</div>
        </div>
        {expandStatus ? (
          <button
            disabled={replay ? false : true}
            className={`self-end ${
              replay
                ? "cursor-pointer text-primary"
                : "cursor-not-allowed text-default"
            }  flex flex-row space-x-1 items-center justify-center text-sm focus:outline-none  `}
            onClick={() => setExpandStatus(false)}
          >
            <FaArrowCircleUp />
            <span>Show Replay</span>
          </button>
        ) : (
          <button
            className={`self-end ${
              replay
                ? "cursor-pointer text-primary"
                : "cursor-not-allowed text-default"
            }  flex flex-row space-x-1 items-center justify-center text-sm focus:outline-none  `}
            onClick={() => setExpandStatus(true)}
            disabled={replay ? false : true}
          >
            <FaArrowCircleDown />
            <span>Show Replay</span>
          </button>
        )}
      </div>
      {replay && expandStatus && replayedBy && (
        <div className="felx flex-col bg-white focus:outline-none text-lg w-full shadow-md ">
          <div className="flex flex-row items-center space-x-3 p-4 w-full">
            <img
              src={
                process.env.REACT_APP_BACKEND_IMAGES_URL +
                (replayedBy && replayedBy.profilePhoto)
              }
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col">
              <div className=" text-primary text-xl font-bold">
                {(replayedBy && replayedBy.firstName) +
                  " " +
                  (replayedBy && replayedBy.lastName)}
              </div>
              <div className=" bg-white rounded-b-3xl text-right text-sm font-normal  self-end">
                {`AT: ${new Date(replayedAt).toDateString()}  ${new Date(
                  replayedAt
                ).toTimeString()}`}
              </div>
            </div>
          </div>

          <hr className="w-3/4 bg-primary h-0.5" />

          <div className="flex flex-row  bg-white focus:outline-none p-2 text-lg w-full shadow-md ">
            <div className="flex-1 ">
              <div className="p-4 ">{replay}</div>
            </div>
          </div>
        </div>
      )}

      <div className="shadow-inner p-2 bg-white rounded-b-3xl text-right text-lg font-bold ">
        <div className="text-left">
          Status :
          <span className={`${replay ? "text-light" : "text-red-600"}`}>
            {replay ? "Answered" : "No Answer Found"}
          </span>
        </div>
        <div>
          {`AT: ${new Date(createdAt).toDateString()}  ${new Date(
            createdAt
          ).toTimeString()}`}
        </div>
      </div>
    </div>
  );
};

export default ConsultationCard;
