import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { FaPaperPlane, FaWindowClose } from "react-icons/fa";

import tagApi from "../api/tag";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import Dialog from "./Dialog";
import PageLoader from "./PageLoader";
import { changeAddTagDialogStatus } from "../actions/adminActions/dialog";
import { required, minLength, alphaNumeric } from "../helpers/validations";

var AddTag = ({
  isOpen,
  userInfo,
  changeAddTagDialogStatus,
  tagNameForEdit,
}) => {
  const [name, setName] = useState(tagNameForEdit ? tagNameForEdit.name : "");
  const [errors, setErrors] = useState({ name: [] });
  const [loadingStatus, setLoadingStatus] = useState(false);

  const cancel = () => {
    changeAddTagDialogStatus(false);
  };

  const validateName = (name) => {
    let nameErrors = [];
    if (required(name) !== undefined)
      nameErrors = [...nameErrors, required(name)];
    if (name && minLength(name, 3) !== undefined)
      nameErrors = [...nameErrors, minLength(name, 3)];
    if (name && alphaNumeric(name) !== undefined)
      nameErrors = [...nameErrors, alphaNumeric(name)];
    return nameErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    const anyErrors = { name: validateName(name) };
    setLoadingStatus(true);
    if (anyErrors.name.length === 0) {
      let formData = new FormData();

      const tag = {
        _id: tagNameForEdit ? tagNameForEdit._id : null,
        name,
        addedBy: userInfo.id,
      };

      formData.append("tag", JSON.stringify(tag));
      let response;
      if (tagNameForEdit) response = await tagApi.updateTag(formData);
      else response = await tagApi.addTag(formData);
      if (response.ok) {
        toastr.success("success", response.data.message);
        setDefault();
        changeAddTagDialogStatus(false);
      } else
        toastr.error(
          "error",
          response.data ? response.data.message : response.problem
        );
    } else {
      setErrors(anyErrors);
    }
    setLoadingStatus(false);
  };

  const setDefault = () => {
    setErrors({ name: [] });
    setName("");
    setLoadingStatus(false);
  };
  useEffect(() => {
    setDefault();
  }, [isOpen]);
  useEffect(() => {
    if (tagNameForEdit) setName(tagNameForEdit.name);
  }, [tagNameForEdit]);
  if (!isOpen) return <div></div>;
  else
    return (
      <Dialog>
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="text-3xl font-bold text-primary">Add New Tag</div>
          <div className>
            <CustomInput
              label="tag"
              type="text"
              value={name}
              onChange={(e) => {
                setErrors({ ...errors, name: validateName(e.target.value) });
                setName(e.target.value);
              }}
              errors={errors.name}
            />
          </div>
          <div className="flex flex-row justify-around w-full space-x-1">
            <div>
              <CustomButton
                onClick={() => {
                  cancel();
                }}
              >
                <FaWindowClose />
                <div>Cancel</div>
              </CustomButton>
            </div>
            <div>
              <PageLoader loading={loadingStatus}>
                <CustomButton
                  onClick={(e) => {
                    submit(e);
                  }}
                >
                  <div>Submit</div>
                  <FaPaperPlane />
                </CustomButton>
              </PageLoader>
            </div>
          </div>
        </div>
      </Dialog>
    );
};

const mapStateToProps = (state) => ({
  isOpen: state.dialog.addTagDialogStatus,
  userInfo: state.user.userInfo,
  tagNameForEdit: state.tag.tagNameForEdit,
});
const mapDispatchToProps = (dispatch) => ({
  changeAddTagDialogStatus: (status) =>
    dispatch(changeAddTagDialogStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
