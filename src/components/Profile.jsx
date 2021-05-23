import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useSpring, animated } from "@react-spring/web";

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.4,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Profile = ({ userInfo }) => {
  const ref = useRef(null);
  const [xys, set] = useState([0, 0, 1]);
  //   const config = useControls({
  //     mass: 1,
  //     tension: 170,
  //     friction: 26,
  //     clamp: false,
  //     precision: 0.01,
  //     velocity: 0,
  //     easing: (t) => t,
  //   });
  const props = useSpring({ xys });

  return (
    <div
      className="fixed p-3 bg-primary z-50 shadow-inner invisible xl:visible"
      ref={ref}
    >
      <animated.div
        className="  shadow-xl my-10 bg-white bg-opacity-20 rounded-2xl p-2 font-bold text-lg text-center text-white border-4 border-white"
        style={{ transform: props.xys.to(trans) }}
        onMouseLeave={() => set([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref.current.getBoundingClientRect();
          set(calc(e.clientX, e.clientY, rect));
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div>
            <img
              src={
                process.env.REACT_APP_BACKEND_IMAGES_URL + userInfo.profilePhoto
              }
              className="w-28 h-28 rounded-full "
            />
          </div>
          <div className="">{`First Name : ${userInfo.firstName}`}</div>
          <div className="">{`Last Name : ${userInfo.lastName}`}</div>
          <div className="text-sm">{`Phone Number : ${userInfo.phoneNumber}`}</div>
          {userInfo.usertype === 1 && (
            <div>
              <Link
                to="/addconsultation"
                className="cursor-pointer focus:outline-none  p-1 m-1 underline text-lg hover:text-light"
              >
                Send Question
              </Link>
            </div>
          )}
        </div>
      </animated.div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
