import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { FaPaperPlane, FaWindowClose } from "react-icons/fa";
import { useHistory } from "react-router";

import subjectApi from "../api/subject";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import Dialog from "./Dialog";
import PageLoader from "./PageLoader";
import { changeDeleteDialogStatus } from "../actions/adminActions/dialog";
import { required, isEquel } from "../helpers/validations";

var DeleteDialog = ({
  isOpen,
  subjectNameAndIdForDelete,
  changeDeleteDialogStatus,
}) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({ title: [] });
  const [loadingStatus, setLoadingStatus] = useState(false);

  const cancel = () => {
    changeDeleteDialogStatus(false);
  };

  const validateTitle = (title) => {
    let titleErrors = [];
    if (required(title) !== undefined)
      titleErrors = [...titleErrors, required(title)];
    if (title && isEquel(title, subjectNameAndIdForDelete.title) !== undefined)
      titleErrors = [...titleErrors, "make sure of the subject"];

    return titleErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    const titleErrors = validateTitle(title);
    setLoadingStatus(true);
    if (titleErrors.length === 0) {
      let formData = new FormData();
      const subject = {
        id: subjectNameAndIdForDelete.id,
        image: subjectNameAndIdForDelete.image,
      };
      formData.append("subject", JSON.stringify(subject));
      const response = await subjectApi.deleteSubject(formData);
      if (response.ok) {
        toastr.success("success", response.data.message);
        history.push("/");
      } else {
        toastr.error(
          "error",
          response.data ? response.data.message : response.problem
        );
      }
      changeDeleteDialogStatus(false);
    } else {
      setErrors({ ...errors, title: titleErrors });
    }

    setLoadingStatus(false);
  };

  const setDefault = () => {
    setTitle("");
  };

  useEffect(() => {
    setDefault();
  }, [isOpen]);

  if (!isOpen) return <div></div>;
  else
    return (
      <Dialog>
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="text-3xl font-normal text-primary">
            Please ensure the delete proccess by retyping {"   "}
            <span className="font-black">
              {subjectNameAndIdForDelete.title}
            </span>
          </div>
          <div className>
            <CustomInput
              label="tag"
              type="text"
              value={title}
              onChange={(e) => {
                setErrors({ ...errors, title: validateTitle(e.target.value) });
                setTitle(e.target.value);
              }}
              errors={errors.title}
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
  isOpen: state.dialog.deleteDialogStatus,
  userInfo: state.user.userInfo,
  subjectNameAndIdForDelete: state.subject.subjectNameAndIdForDelete,
});
const mapDispatchToProps = (dispatch) => ({
  changeDeleteDialogStatus: (status) =>
    dispatch(changeDeleteDialogStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog);
