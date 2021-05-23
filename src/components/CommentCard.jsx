// subjectId: { type: String, required: true },
// author: { type: String, required: true },
// body: { type: String, required: true },
// replayTo: { type: String, default: null, required: false },
import React, { useState } from "react";
require("dotenv").config();

import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

import { FaEdit, FaMinusCircle } from "react-icons/fa";

import PageLoader from "./PageLoader";
import CustomButton from "./CustomButton";
import Comment from "./Comment";

import commentApi from "../api/comment";

var CommentCard = ({ comment, userInfo, refreshSubject }) => {
  const { author, body, createdAt } = comment;
  const [showComment, setShowComment] = useState(false);

  const updatedSuccess = () => {
    setShowComment(false);
    refreshSubject();
  };

  const deleteComment = async () => {
    let formdata = new FormData();
    console.log(comment);
    formdata.append("comment", JSON.stringify(comment));
    let res;
    res = await commentApi.deleteComment(formdata);

    if (res.ok) {
      refreshSubject();
    } else {
      toastr.error("error", res.problem);
    }
  };

  return (
    <div className="p-2 w-full flex flex-col shadow-md bg-white rounded-3xl">
      <div className="flex flex-row items-center space-x-3 p-4 w-max border-primary border-b-2 shadow-sm ">
        <img
          src={
            process.env.REACT_APP_BACKEND_IMAGES_URL +
            (author && author.profilePhoto)
          }
          className="rounded-full w-12 h-12"
        />
        <div className="flex flex-col">
          <div className=" text-primary text-xl font-bold">
            {(author && author.firstName) + " " + (author && author.lastName)}
          </div>
          {
            <div className=" bg-white rounded-b-3xl text-right text-sm font-normal  self-end">
              {`AT: ${new Date(createdAt).toDateString()}  ${new Date(
                createdAt
              ).toTimeString()}`}
            </div>
          }
        </div>
      </div>
      <div className="flex flex-row p-4 space-x-2">
        {userInfo.id === author._id || userInfo.usertype === 0 ? (
          <CustomButton
            onClick={(e) => {
              deleteComment();
            }}
          >
            <FaMinusCircle />
            <div>Delete</div>
          </CustomButton>
        ) : null}
        {userInfo.id === author._id ? (
          <CustomButton
            onClick={(e) => {
              setShowComment(true);
            }}
          >
            <div>Edit</div>
            <FaEdit />
          </CustomButton>
        ) : null}
      </div>
      {showComment ? (
        <div className="p-4 ">
          <Comment prevComment={comment} refreshSubject={updatedSuccess} />
        </div>
      ) : (
        <div className="p-4 ">{body}</div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);
