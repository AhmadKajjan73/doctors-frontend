import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { FaSearch } from "react-icons/fa";

import subjectApi from "../../api/subject";
import SubjectCard from "../../components/SubjectCard";
import CustomInput from "../../components/CustomInput";
import { changePageLoadingStatus } from "../../actions/loader";

import { lightColor } from "../../constant";

const Homepage = ({ changePageLoadingStatus }) => {
  const [subjects, setSubjects] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getAllSubjects = async () => {
    changePageLoadingStatus(true);
    const res = await subjectApi.getAllSubjects();
    if (res.ok) {
      console.log(res.data);
      setSubjects(res.data.data);
    } else {
      toastr.error("error", res.problem);
    }
    changePageLoadingStatus(false);
  };
  useEffect(() => {
    getAllSubjects();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-20 ">
      <div className="bg-white w-3/4 lg:w-1/2 fixed top-0 mt-20 z-20 rounded-md  ">
        <CustomInput
          name="search"
          label="Search By Subject Title"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          rightIcon={<FaSearch color={lightColor} />}
        />
      </div>

      <div className=" grid grid-cols-12 gap-2 lg:gap-4 ">
        {subjects
          .filter((e) => {
            console.log(e.title);
            return e.title.toLowerCase().includes(searchText.toLowerCase());
          })
          .map((elem) => {
            return (
              <div className="col-span-full lg:col-span-6  ">
                <SubjectCard subject={elem} key={elem._id} />
              </div>
            );
          })}
      </div>
      {subjects.length === 0 && <div className="text-center  ">No Results</div>}
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  changePageLoadingStatus: (status) =>
    dispatch(changePageLoadingStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
