import React, { useState, useEffect } from "react";

import { toastr } from "react-redux-toastr";
import TextareaAutosize from "react-textarea-autosize";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaPaperPlane,
} from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { required, minLength } from "../helpers/validations";
import CustomButton from "./CustomButton";
import consultationApi from "../api/consultation";

const ConsultationCard = ({
  consultation,
  setConsultations,
  userInfoId,
  changeConsultationLoadingStatus,
}) => {
  let { _id, question, diseaseHistory, replay, userId, createdAt } =
    consultation;

  const [expandStatus, setExpandStatus] = useState(replay ? true : false);
  const [newReplay, setNewReplay] = useState(replay);
  const [errors, setErrors] = useState({ newReplay: [] });

  const submit = async () => {
    let anyErrors = [];
    if (required(newReplay) !== undefined)
      anyErrors = [...anyErrors, required(newReplay)];
    if (minLength(newReplay, 10) !== undefined)
      anyErrors = [...anyErrors, minLength(newReplay, 10)];

    if (anyErrors.length > 0) setErrors({ ...errors, newReplay: anyErrors });
    else {
      const formData = new FormData();
      const replayTo = {
        id: _id,
        replay: newReplay,
        replayedBy: userInfoId,
      };
      formData.append("replay", JSON.stringify(replayTo));
      changeConsultationLoadingStatus(true);
      const res = await consultationApi.replayToConsultation(formData);
      if (res.ok) {
        setConsultations(res.data.data);
      } else {
        toastr.error("error", res.data ? res.data.message : res.problem);
      }
      setErrors({ ...errors, newReplay: [] });
      changeConsultationLoadingStatus(false);
    }
  };

  return (
    <div className="flex flex-col   divide-y-4 divide-secondary divide-opacity-75  border-secondary border-4 rounded-3xl ">
      <div className="shadow-inner p-4 bg-white  rounded-t-3xl">
        <div className="flex flex-row items-center space-x-3 w-full p-2">
          <img
            src={
              process.env.REACT_APP_BACKEND_IMAGES_URL +
              (userId && userId.profilePhoto)
            }
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <div className=" text-primary text-xl font-bold">
              {(userId && userId.firstName) + " " + (userId && userId.lastName)}
            </div>
            <div className=" bg-white rounded-b-3xl text-right text-sm font-normal  self-end">
              {`AT: ${new Date(createdAt).toDateString()}  ${new Date(
                createdAt
              ).toTimeString()}`}
            </div>
          </div>
        </div>

        <hr className="w-3/4 bg-primary h-0.5" />
        <div className="p-2">
          <div className="text-2xl">Disease History:</div>
          <ReactQuill value={diseaseHistory} readOnly={true} theme="bubble" />
        </div>
      </div>
      <div className="flex flex-row bg-white focus:outline-none p-2 text-lg w-full shadow-md ">
        <div className="flex-1 ">
          <div className="text-2xl">Question:</div>
          <div className="p-4">{question}</div>
        </div>
        {expandStatus ? (
          <button
            className={`self-end  cursor-pointer text-primary flex flex-row space-x-1 items-center justify-center text-sm focus:outline-none  `}
            onClick={() => setExpandStatus(false)}
          >
            <FaArrowCircleUp />
            <span>Replay</span>
          </button>
        ) : (
          <button
            className={`self-end  cursor-pointer text-primary flex flex-row space-x-1 items-center justify-center text-sm focus:outline-none  `}
            onClick={() => setExpandStatus(true)}
          >
            <FaArrowCircleDown />
            <span>Replay</span>
          </button>
        )}
      </div>
      {expandStatus && (
        <div className="felx flex-col bg-white  text-lg w-full shadow-md p-2">
          <TextareaAutosize
            value={newReplay}
            onChange={(e) => {
              setNewReplay(e.target.value);
            }}
            className="resize-none bg-gray-100 focus:outline-none p-2 text-lg w-full shadow-md  "
          />
          {errors.newReplay.length > 0 && (
            <div className="text-sm text-red-700 p-2">
              {errors.newReplay.map((elem, index) => {
                return <div className="">{`${index + 1}. ${elem}`}</div>;
              })}
            </div>
          )}

          <div className="w-full flex flex-col md:flex-row p-2 justify-center">
            <CustomButton onClick={(e) => submit(e)}>
              <div>Submit</div>
              <FaPaperPlane />
            </CustomButton>
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
