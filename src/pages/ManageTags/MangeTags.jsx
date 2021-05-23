import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

import { changePageLoadingStatus } from "../../actions/loader";
import { changeAddTagDialogStatus } from "../../actions/adminActions/dialog";
import { changeTagNameForEdit } from "../../actions/adminActions/tag";
import tagsApi from "../../api/tag";
import Tag from "../../components/Tag";

const MangeTags = ({
  changePageLoadingStatus,
  changeAddTagDialogStatus,
  changeTagNameForEdit,
  addTagDialogStatus,
}) => {
  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    const response = await tagsApi.getAllTags();

    if (response.ok) setTags(response.data.data);
    else
      toastr.error(
        "error",
        response.data ? response.data.message : response.problem
      );
  };
  useEffect(() => {
    getAllTags();
  }, [addTagDialogStatus]);
  return (
    <div className="rounded-3xl p-4 bg-gray-300 shadow-md">
      <div className="rounded-3xl bg-white shadow-inner grid grid-cols-9 gap-4 p-4">
        {tags.map((elem, index) => {
          return (
            <div className="col-span-3">
              <Tag
                name={elem.name}
                onClick={() => {
                  changeTagNameForEdit({ name: elem.name, _id: elem._id });
                  changeAddTagDialogStatus(true);
                }}
              />
            </div>
          );
        })}
        <div className="col-span-3">
          <Tag
            name="Add New Tag"
            onClick={() => {
              changeAddTagDialogStatus(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addTagDialogStatus: state.dialog.addTagDialogStatus,
  //tagsInAddSubjectStatus: state.loader.tagsInAddSubjectStatus,
});
const mapDispatchToProps = (dispatch) => ({
  changeAddTagDialogStatus: (status) =>
    dispatch(changeAddTagDialogStatus(status)),
  changePageLoadingStatus: (status) =>
    dispatch(changePageLoadingStatus(status)),
  changeTagNameForEdit: (tag) => dispatch(changeTagNameForEdit(tag)),
  //   changeTagsInAddSubjectLoadingStatus: (status) =>
  //     dispatch(changeTagsInAddSubjectLoadingStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MangeTags);
