import React from "react";

import { connect } from "react-redux";
import ReactQuill from "react-quill";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

import Tag from "../../components/Tag";
import CustomButton from "../../components/CustomButton";
import { changeAddTagDialogStatus } from "../../actions/adminActions/dialog";
import { changePageLoadingStatus } from "../../actions/loader";
import submitAddSubject from "./submit";

import "react-quill/dist/quill.bubble.css";

require("dotenv").config();
const SubjectPreview = ({ subject, userInfo }) => {
  console.log(subject);
  const { id, image, title, body, selectedTags } = subject;

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    changePageLoadingStatus(true);
    const authorId = userInfo.id;

    await submitAddSubject(id, image, selectedTags, body, title, authorId);

    changePageLoadingStatus(false);
  };

  return (
    <div className="flex flex-col justify-center p-2 space-y-8">
      <div className="text-primary text-center text-7xl font-black ">
        {title}
      </div>
      <div className="self-center">
        <img
          src={
            _.isString(image)
              ? process.env.REACT_APP_BACKEND_IMAGES_URL + image
              : image
              ? URL.createObjectURL(image)
              : ""
          }
          className="p-2 w-auto object-cover "
          style={{ height: "75vh" }}
          alt={`${title}_main_image`}
        />
      </div>
      <div className="w-full grid gap-2 grid-cols-12">
        <div className="col-span-12 lg:col-span-10">
          <div className=" w-full shadow-inner bg-light bg-opacity-5  p-4 lg:rounded-3xl">
            <div className="w-3/4 ">
              <ReactQuill value={body} readOnly={true} theme="bubble" />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-2">
          <div className="rounded-2xl shadow-md p-2 bg-secondary bg-opacity-10">
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="text-3xl text-primary font-bold p-1">Tags</div>
              {selectedTags.map((elem) => {
                return (
                  <div>
                    <Tag name={elem.name} key={elem._id} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div>
          <CustomButton
            onClick={() =>
              history.push({
                pathname: "/addsubject",
                state: {
                  subject: {
                    title,
                    image,
                    body,
                    selectedTags,
                  },
                },
              })
            }
          >
            <FaArrowLeft />
            <div>Back</div>
          </CustomButton>
        </div>
        <div>
          <CustomButton
            onClick={(e) => {
              submit(e);
            }}
          >
            <div>Submit</div>
            <FaPaperPlane />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  changeAddTagDialogStatus: (status) =>
    dispatch(changeAddTagDialogStatus(status)),
  changePageLoadingStatus: (status) =>
    dispatch(changePageLoadingStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPreview);
