import React, { useEffect } from "react";

import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddSubject from "./pages/AddSubject";
import SubjectPreview from "./pages/SubjectPreview";
import AddConsultation from "./pages/AddConsultation";
import ManageConsultations from "./pages/ManageConsultations";
import ManageTags from "./pages/ManageTags";
import Subject from "./pages/Subject";
import CheckSelf from "./pages/CheckSelf";
import Header from "./components/Header";
import AddTag from "./components/AddTag";
import DeleteDialog from "./components/DeleteDialog";
import PageLoader from "./components/PageLoader";
import Profile from "./components/Profile";
import userApi from "./api/user";
import { setUser } from "./actions/user";
import { changeIsAdminStatus } from "./actions/adminActions/isAdmin";
import ControllPanel from "./pages/ControllPanel";

import "tailwindcss/tailwind.css";
import "./App.css";

function App({
  location,
  pageLoadingState,
  setUser,
  changeIsAdminStatus,
  userInfo,
}) {
  const getCurrentUser = async () => {
    const res = await userApi.getCurrentUser();
    const user = res.data && res.data.data;
    setUser(user);
    if (user && user.usertype === 0) changeIsAdminStatus(true);
    else changeIsAdminStatus(false);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="">
      <Header />
      <PageLoader loading={pageLoadingState}>
        <div className="grid grid-cols-12 h-screen gap-1">
          <div className="col-span-0 lg:col-span-2 mt-16">
            {userInfo && <Profile />}
          </div>
          <div className="col-span-12 lg:col-span-8 p-6 mt-10">
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/cp" exact component={ControllPanel} />
              <Route
                path="/addsubject"
                exact
                component={() => (
                  <AddSubject
                    subject={location.state && location.state.subject}
                  />
                )}
              />
              <Route path="/checkself" exact component={CheckSelf} />
              <Route
                path="/addconsultation"
                exact
                component={AddConsultation}
              />
              <Route
                path="/manageconsultations"
                exact
                component={ManageConsultations}
              />
              <Route path="/managetags" exact component={ManageTags} />
              <Route
                path="/subjectpreview"
                exact
                component={() => (
                  <SubjectPreview
                    subject={location.state && location.state.subject}
                  />
                )}
              />
              <Route path="/subject/:id" exact component={() => <Subject />} />
            </Switch>
          </div>
          <div className="col-span-0 lg:col-span-2" />
          <AddTag />
          <DeleteDialog />
        </div>
      </PageLoader>
    </div>
  );
}
const mapStateToProps = (state) => ({
  pageLoadingState: state.loader.pageLoadingState,
  userInfo: state.user.userInfo,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  changeIsAdminStatus: (status) => dispatch(changeIsAdminStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
