import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import ReactQuill from "react-quill";
import { FaEye, FaEdit, FaMinusCircle } from "react-icons/fa";

import subjectApi from "../../api/subject";
import Tag from "../../components/Tag";
import PageLoader from "../../components/PageLoader";
import CustomButton from "../../components/CustomButton";
import Comment from "../../components/Comment";
import CommentCard from "../../components/CommentCard";

import { changeDeleteDialogStatus } from "../../actions/adminActions/dialog";
import { ChangeSubjectForDelete } from "../../actions/adminActions/subject";

import "react-quill/dist/quill.bubble.css";

const Subject = ({
  id,
  userInfo,
  changeDeleteDialogStatus,
  ChangeSubjectForDelete,
}) => {
  const [loadStatus, setLoadStatus] = useState(false);
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState(null);
  const [numberOfViewers, setNumberOfViewers] = useState(0);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [comments, setComments] = useState([]);
  const history = useHistory();

  const loadSubject = async () => {
    setLoadStatus(true);
    const response = await subjectApi.getSubjectByIdAfterAddingViewer(id);
    if (response.ok) {
      const subject = response.data.data;
      setImage(subject.imageurl);
      setAuthor(subject.authorId);
      setTags(subject.tags);
      setTitle(subject.title);
      setBody(subject.body);
      setCreatedAt(subject.createdAt);
      setNumberOfViewers(subject.numberOfViewers);
      setComments(subject.comments);
    } else toastr.error("error", response.problem);
    setLoadStatus(false);
  };

  const refreshSubject = async () => {
    setLoadStatus(true);
    const response = await subjectApi.getSubjectById(id);
    if (response.ok) {
      const subject = response.data.data;
      setImage(subject.imageurl);
      setAuthor(subject.authorId);
      setTags(subject.tags);
      setTitle(subject.title);
      setBody(subject.body);
      setCreatedAt(subject.createdAt);
      setNumberOfViewers(subject.numberOfViewers);
      setComments(subject.comments);
    } else toastr.error("error", response.problem);
    setLoadStatus(false);
  };
  useEffect(() => {
    loadSubject();
  }, []);

  return (
    <PageLoader loading={loadStatus}>
      <div className="flex flex-col justify-center p-2 space-y-4 w-full">
        <div className="text-primary text-center text-7xl font-black ">
          {title}
        </div>
        {userInfo && userInfo.usertype === 0 && (
          <div className="w-full flex flex-col md:flex-row justify-around">
            <div>
              <CustomButton
                onClick={(e) => {
                  ChangeSubjectForDelete({ id, title, image });
                  changeDeleteDialogStatus(true);
                }}
              >
                <FaMinusCircle />
                <div>Delete</div>
              </CustomButton>
            </div>
            <div>
              <CustomButton
                onClick={() =>
                  history.push({
                    pathname: "/addsubject",
                    state: {
                      subject: {
                        id,
                        title,
                        image,
                        body,
                        selectedTags: tags,
                      },
                    },
                  })
                }
              >
                <div>Edit</div>
                <FaEdit />
              </CustomButton>
            </div>
          </div>
        )}
        <div className="flex flex-row items-center space-x-3 p-4 w-full">
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
            <div className=" bg-white rounded-b-3xl text-right text-sm font-normal  self-end">
              {`AT: ${new Date(createdAt).toDateString()}  ${new Date(
                createdAt
              ).toTimeString()}`}
            </div>
          </div>
        </div>
        <div className="self-center">
          <img
            src={image ? process.env.REACT_APP_BACKEND_IMAGES_URL + image : ""}
            className="p-2 w-auto object-cover "
            style={{ height: "75vh" }}
            alt={`${title}_main_image`}
          />
        </div>
        <div className="self-center">
          <div className="w-full  flex flex-row space-x-2  text-xl text-primary">
            <div>{numberOfViewers}</div>
            <FaEye />
          </div>
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
                {tags.map((elem) => {
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
        <div className="flex flex-col  bg-gray-100 p-2  rounded-2xl space-y-4">
          {comments.map((elem) => {
            return (
              author && (
                <div>
                  <CommentCard comment={elem} refreshSubject={refreshSubject} />
                </div>
              )
            );
          })}
          {userInfo && (
            <div>
              <Comment subjectId={id} refreshSubject={refreshSubject} />
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  changeDeleteDialogStatus: (status) =>
    dispatch(changeDeleteDialogStatus(status)),
  ChangeSubjectForDelete: (subject) =>
    dispatch(ChangeSubjectForDelete(subject)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Subject);
