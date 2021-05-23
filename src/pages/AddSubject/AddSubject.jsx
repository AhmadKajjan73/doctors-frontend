import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import _ from "lodash";

import { FaPlusCircle, FaPaperPlane, FaFile } from "react-icons/fa";

import { changeAddTagDialogStatus } from "../../actions/adminActions/dialog";
import {
  changePageLoadingStatus,
  changeTagsInAddSubjectLoadingStatus,
} from "../../actions/loader";
import Dropzone from "../../components/Dropzone";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import IconButton from "../../components/IconButton";
import Tag from "../../components/Tag";
import PageLoader from "../../components/PageLoader";
import tagApi from "../../api/tag";
import { removeArrayInOtherOne } from "../../helpers/common";

import validation from "./validation";
import submitAddSubject from "./submit";

import "react-quill/dist/quill.snow.css";

require("dotenv").config();

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["link", "image"],

    ["clean"],
  ],
};

var AddSubject = ({
  subject,
  changeAddTagDialogStatus,
  changePageLoadingStatus,
  addTagDialogStatus,
  tagsInAddSubjectStatus,
  changeTagsInAddSubjectLoadingStatus,
  userInfo,
}) => {
  const [errors, setErrors] = useState({
    image: [],
    title: [],
    tags: [],
    body: [],
  });

  const [id, setId] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const history = useHistory();

  const validate = () => {
    let anyErrors = validation.validateAll(image, selectedTags, body, title);
    return (
      anyErrors.image.length === 0 &&
      anyErrors.tags.length === 0 &&
      anyErrors.body.length === 0 &&
      anyErrors.title.length === 0
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    changePageLoadingStatus(true);
    const authorId = userInfo.id;

    await submitAddSubject(id, image, selectedTags, body, title, authorId);
    changePageLoadingStatus(false);
  };

  const getTags = async () => {
    changeTagsInAddSubjectLoadingStatus(true);
    const response = await tagApi.getAllTags();
    if (response.ok) {
      setTags(
        removeArrayInOtherOne(
          response.data.data,
          subject ? subject.selectedTags : selectedTags
        )
      );
    } else
      console.log(response.data ? response.data.message : response.problem);
    changeTagsInAddSubjectLoadingStatus(false);
  };

  useEffect(() => {
    setErrors({ ...errors, tags: validation.validateTags(selectedTags) });
  }, [selectedTags, tags]);

  useEffect(() => {
    if (subject) {
      setId(subject.id);
      setImage(subject.image);
      setSelectedTags(subject.selectedTags);
      setTitle(subject.title);
      setBody(subject.body);
    }
  }, [subject]);

  useEffect(() => {
    if (!addTagDialogStatus) getTags();
  }, [addTagDialogStatus]);

  return (
    <div className="flex flex-col  items-center space-y-6 h-full p-8">
      {/*Title */}
      <div className="bg-white border-secondary border-2 rounded-xl shadow-xl p-2 ">
        <CustomInput
          label="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setErrors({
              ...errors,
              title: validation.validateTitle(e.target.value),
            });
            setTitle(e.target.value);
          }}
          errors={errors.title}
        />
      </div>
      <hr className=" w-full bg-primary h-1" />
      {/*Image */}
      <div className="text-center p-4">
        <div className="text-primary font-black text-2xl m-2 space-y-3">
          Main Image
        </div>
        <img
          src={
            _.isString(image)
              ? process.env.REACT_APP_BACKEND_IMAGES_URL + image
              : image
              ? URL.createObjectURL(image)
              : ""
          }
          className="p-2 "
        />
        <CustomButton>
          <Dropzone
            setImage={setImage}
            alt={`${title}_main_image`}
            checkForErrors={(newImage) => {
              setErrors({
                ...errors,
                image: validation.validateImage(newImage),
              });
            }}
          >
            upload
          </Dropzone>
        </CustomButton>
        {errors.image.length > 0 && (
          <div className="text-sm text-red-700 p-2">
            {errors.image.map((elem, index) => {
              return <div className="">{`${index + 1}. ${elem}`}</div>;
            })}
          </div>
        )}
      </div>
      <hr className=" w-full bg-primary h-1" />
      {/*Editer */}
      <div className="w-full ">
        <ReactQuill
          value={body}
          onChange={(value) => {
            setBody(value);
            setErrors({
              ...errors,
              body: validation.validateBody(value),
            });
          }}
          modules={modules}
          theme="snow"
        />
        {errors.body.length > 0 && (
          <div className="text-sm text-red-700 p-2">
            {errors.body.map((elem, index) => {
              return <div className="">{`${index + 1}. ${elem}`}</div>;
            })}
          </div>
        )}
      </div>
      <hr className=" w-full bg-primary h-1" />
      {/*Tags */}
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col lg:flex-row justify-between ">
          <PageLoader loading={tagsInAddSubjectStatus}>
            <div className="grid  grid-cols-3 lg:grid-cols-9  gap-2">
              {tags.map((elem, index) => {
                return (
                  <div className="col-span-3">
                    <Tag
                      key={elem._id}
                      name={elem.name}
                      onClick={() => {
                        setSelectedTags([...selectedTags, elem]);
                        const tgs = tags;
                        tgs.splice(index, 1);
                        setTags(tgs);
                      }}
                    />
                  </div>
                );
              })}
              <div className="col-span-3">
                <IconButton
                  onClick={() => {
                    changeAddTagDialogStatus(true);
                  }}
                >
                  <FaPlusCircle className="text-primary text-4xl " />
                </IconButton>
              </div>
            </div>
          </PageLoader>
          <div className="border-2 bg-primary border-primary w-full h-0.5 lg:w-0.5 lg:h-full " />
          <div className="grid grid-cols-3 lg:grid-cols-9 gap-2">
            {selectedTags.map((elem, index) => {
              return (
                <div className="col-span-3">
                  <Tag
                    key={elem._id}
                    name={elem.name}
                    onClick={() => {
                      setTags([...tags, elem]);
                      const tgs = selectedTags;
                      tgs.splice(index, 1);
                      setSelectedTags(tgs);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {errors.tags.length > 0 && (
            <div className="text-sm text-red-700 p-2">
              {errors.tags.map((elem, index) => {
                return <div className="">{`${index + 1}. ${elem}`}</div>;
              })}
            </div>
          )}
        </div>
      </div>
      <hr className=" w-full bg-primary h-1" />
      {/*Buttons */}
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div>
          <CustomButton
            onClick={() => {
              if (validate()) {
                history.push({
                  pathname: "/subjectpreview",
                  state: {
                    subject: {
                      id,
                      title,
                      image,
                      body,
                      selectedTags,
                    },
                  },
                });
              } else {
                setErrors(
                  validation.validateAll(image, selectedTags, body, title)
                );
              }
            }}
          >
            <FaFile />
            <div>Preview</div>
          </CustomButton>
        </div>
        <div>
          <CustomButton
            onClick={(e) => {
              if (validate()) {
                submit(e);
              } else {
                setErrors(
                  validation.validateAll(image, selectedTags, body, title)
                );
              }
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
  addTagDialogStatus: state.dialog.addTagDialogStatus,
  tagsInAddSubjectStatus: state.loader.tagsInAddSubjectStatus,
  userInfo: state.user.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  changeAddTagDialogStatus: (status) =>
    dispatch(changeAddTagDialogStatus(status)),
  changePageLoadingStatus: (status) =>
    dispatch(changePageLoadingStatus(status)),
  changeTagsInAddSubjectLoadingStatus: (status) =>
    dispatch(changeTagsInAddSubjectLoadingStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);
