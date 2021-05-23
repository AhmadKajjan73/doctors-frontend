import React from "react";

import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";
import { toastr } from "react-redux-toastr";
import { FaTh, FaUserCheck } from "react-icons/fa";

import userApi from "../api/user";
import { changePageLoadingStatus } from "../actions/loader";
import { setUser } from "../actions/user";
import { changeIsAdminStatus } from "../actions/adminActions/isAdmin";
import Logo from "../assets/Logo2.png";

const Header = ({
  userInfo,
  isAdmin,
  changePageLoadingStatus,
  setUser,
  changeIsAdminStatus,
}) => {
  const history = useHistory();

  const styles = useSpring({
    loop: { reverse: true },
    from: { x: -50 },
    config: { duration: 1500 },
    to: { x: 50 },
  });

  const logout = async () => {
    changePageLoadingStatus(true);
    const response = await userApi.logoutUser();
    if (response.ok) {
      history.push("/login");
      toastr.success("success", response.data.message);
      setUser(null);
      changeIsAdminStatus(false);
    } else {
      toastr.error(
        "error",
        response.data ? response.data.message : response.problem
      );
    }
    changePageLoadingStatus();
  };

  return (
    <nav className="bg-primary text-white  lg:text-2xl fixed w-full top-0 z-50 font-body">
      <div className="flex flex-row justify-center items-center ">
        <Link to="/">
          <img
            src={Logo}
            alt="doctors"
            className="w-16 h-16 object-cover z-50"
          />
        </Link>
        <animated.div
          className="flex-grow text-center font-black md:text-2xl lg:text-3xl "
          style={{ ...styles }}
        >
          Doctors
        </animated.div>
        <div>
          {userInfo === null ? (
            <ul className="flex flex-col lg:flex-row ">
              <li className="p-2">
                <Link to="/checkself">
                  <FaUserCheck />
                </Link>
              </li>
              <li className="p-2">
                <Link to="/login">login</Link>
              </li>
              <li className="p-2">
                <Link to="/register">register</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col lg:flex-row items-center">
              <li className="p-2">
                <Link to="/checkself">
                  <FaUserCheck />
                </Link>
              </li>
              {isAdmin && (
                <Link to="/cp">
                  <li className="p-2">
                    <FaTh />
                  </li>
                </Link>
              )}
              {!isAdmin && (
                <Link to="/addconsultation">
                  <li className="p-2">Consultation</li>
                </Link>
              )}

              <li className="p-2">
                <button
                  onClick={() => logout()}
                  className="focus:outline-none "
                >
                  logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  isAdmin: state.admin.isAdmin,
});
const mapDispatchToProps = (dispatch) => ({
  changePageLoadingStatus: (status) =>
    dispatch(changePageLoadingStatus(status)),
  setUser: (user) => dispatch(setUser(user)),
  changeIsAdminStatus: (status) => dispatch(changeIsAdminStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
