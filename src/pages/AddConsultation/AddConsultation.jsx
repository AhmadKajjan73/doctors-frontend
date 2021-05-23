import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import ReactQuill from "react-quill";
import { FaPaperPlane } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

import {
  changePageLoadingStatus,
  changeConsultationLoadingStatus,
} from "../../actions/loader";

import PageLoader from "../../components/PageLoader";
import CustomButton from "../../components/CustomButton";
import ConsultationCard from "../../components/ConsultationCard";
import consultationApi from "../../api/consultation";

import submitConsultation from "./submit";
import validation from "./validation";
import "react-quill/dist/quill.snow.css";
import { toastr } from "react-redux-toastr";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons

    [{ list: "ordered" }, { list: "bullet" }],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ align: [] }],

    ["link", "image"],

    ["clean"],
  ],
};

const AddConsultation = ({
  changePageLoadingStatus,
  changeConsultationLoadingStatus,
  userInfo,
  consultationLoadingStatus,
}) => {
  const [errors, setErrors] = useState({ diseaseHistory: [], question: [] });
  const [diseaseHistory, setDiseaseHistory] = useState("");
  const [question, setQuestion] = useState("");
  const [consultations, setConsultations] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    changePageLoadingStatus(true);
    let anyErrors = validation.validateAll(diseaseHistory, question);
    if (
      anyErrors.diseaseHistory.length === 0 &&
      anyErrors.question.length === 0
    ) {
      const response = await submitConsultation(
        diseaseHistory,
        question,
        userInfo.id
      );
    } else setErrors(anyErrors);
    changePageLoadingStatus(false);
  };
  const getAllConsultations = async () => {
    changeConsultationLoadingStatus(true);
    const res = await consultationApi.getAllConsultationOfUser(userInfo.id);

    if (res.ok) {
      setConsultations(res.data.data);
    } else toastr.error("error", res.data ? res.data.message : res.problem);
    changeConsultationLoadingStatus(false);
  };
  useEffect(() => {
    if (userInfo) getAllConsultations();
  }, [userInfo]);

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="self-center text-primary text-5xl">New Questions</div>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-3 text-xl font-bold   h-full">
          Enter Your Disease History
        </div>
        <div className="col-span-12 lg:col-span-9 shadow-md">
          <ReactQuill
            modules={modules}
            value={diseaseHistory}
            onChange={(value) => {
              setDiseaseHistory(value);
              setErrors({
                ...errors,
                diseaseHistory: validation.validateDiseaseHistory(value),
              });
            }}
            // modules={modules}
            theme="snow"
          />
          {errors.diseaseHistory.length > 0 && (
            <div className="text-sm text-red-700 p-2">
              {errors.diseaseHistory.map((elem, index) => {
                return <div className="">{`${index + 1}. ${elem}`}</div>;
              })}
            </div>
          )}
        </div>
      </div>

      <hr className=" w-full bg-primary h-1" />

      <div className="grid grid-cols-12 gap-4 items-center justify-center">
        <div className="col-span-3 text-xl font-bold  h-full">
          Enter Your Question
        </div>
        <div className="col-span-9">
          <TextareaAutosize
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setErrors({
                ...errors,
                question: validation.validateQuestion(e.target.value),
              });
            }}
            className="resize-none bg-gray-100 focus:outline-none p-2 text-lg w-full shadow-md "
          />
          {errors.question.length > 0 && (
            <div className="text-sm text-red-700 p-2">
              {errors.question.map((elem, index) => {
                return <div className="">{`${index + 1}. ${elem}`}</div>;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center">
        <CustomButton onClick={(e) => submit(e)}>
          <div>Submit</div>
          <FaPaperPlane />
        </CustomButton>
      </div>
      <hr className=" w-1/2 bg-primary h-1 self-center" />
      <hr className=" w-1/2 bg-primary h-1 self-center" />
      <div className="self-center text-primary text-5xl">Old Questions</div>
      <PageLoader loading={consultationLoadingStatus}>
        <div className="flex flex-col space-y-4 shadow-md p-4 bg-gray-300 rounded-3xl">
          {consultations.map((elem) => {
            return <ConsultationCard consultation={elem} />;
          })}
        </div>
      </PageLoader>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  consultationLoadingStatus: state.loader.consultationLoadingStatus,
});
const mapDispatchToProps = (dispatch) => ({
  changePageLoadingStatus: (status) =>
    dispatch(changePageLoadingStatus(status)),
  changeConsultationLoadingStatus: (status) =>
    dispatch(changeConsultationLoadingStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddConsultation);
