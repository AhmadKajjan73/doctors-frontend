import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { changeConsultationLoadingStatus } from "../../actions/loader";

import PageLoader from "../../components/PageLoader";
import AdminConsultationCard from "../../components/AdminConsultationCard";
import consultationApi from "../../api/consultation";

import { toastr } from "react-redux-toastr";

const ManageConsultations = ({
  changeConsultationLoadingStatus,
  userInfo,
  consultationLoadingStatus,
}) => {
  const [consultations, setConsultations] = useState([]);

  const getAllConsultations = async () => {
    changeConsultationLoadingStatus(true);
    const res = await consultationApi.getAllConsultation();

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
      <div className="self-center text-primary text-5xl">Questions</div>
      <PageLoader loading={consultationLoadingStatus}>
        <div className="flex flex-col space-y-4 shadow-md p-4 bg-gray-300 rounded-3xl">
          {consultations.map((elem) => {
            return (
              <AdminConsultationCard
                consultation={elem}
                setConsultations={setConsultations}
                userInfoId={userInfo.id}
                changeConsultationLoadingStatus={
                  changeConsultationLoadingStatus
                }
              />
            );
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
  changeConsultationLoadingStatus: (status) =>
    dispatch(changeConsultationLoadingStatus(status)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageConsultations);
