import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import TextareaAutosize from "react-textarea-autosize";

import CustomButton from "./CustomButton";
import commentApi from "../api/comment";

var Comment = ({ subjectId, userInfo, refreshSubject, prevComment }) => {
  const [body, setBody] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (body.length > 0) {
      const comment = {
        id: prevComment ? prevComment._id : null,
        subject: subjectId,
        body,
        author: userInfo.id,
      };
      let formdata = new FormData();
      formdata.append("comment", JSON.stringify(comment));
      let res;
      if (prevComment) res = await commentApi.updateComment(formdata);
      else res = await commentApi.addComment(formdata);
      if (res.ok) {
        refreshSubject();
        setBody("");
      } else {
        toastr.error("error", res.problem);
      }
    }
  };

  useEffect(() => {
    if (prevComment) {
      setBody(prevComment.body);
    }
  }, []);
  return (
    <div className="p-2 w-full">
      <form className="flex flex-col lg:flex-row p-2 space-y-2 justify-center items-center space-x-2">
        <TextareaAutosize
          value={body}
          placeholder="write a comment..."
          onChange={(e) => {
            setBody(e.target.value);
          }}
          className="resize-none bg-gray-200 focus:outline-none p-2 text-lg w-full rounded-xl"
        />

        <div className="self-end flex flex-row">
          <CustomButton onClick={(e) => submit(e)}>submit</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
