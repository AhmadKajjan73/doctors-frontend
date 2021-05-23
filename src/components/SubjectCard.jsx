import React from "react";

import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

/*
 id: subject._id,
          title: subject.title,
          imageurl: subject.imageurl,
          numberOfViewers: subject.numberOfViewers,
          body: subject.body,
          tags: subject.tags,
          createdAt: subject.createdAt,
          updatedAt: subject.updatedAt,
*/

const SubjectCard = ({ subject }) => {
  return (
    <Link to={`/subject/${subject._id}`}>
      <div className=" m-2 bg-secondary bg-opacity-20  hover:shadow-lg rounded-t-3xl lg:transition lg:duration-250 lg:ease-in-out lg:transform lg:hover:scale-105 cursor-pointer">
        <div className="bg-opacity-0">
          <img
            src={process.env.REACT_APP_BACKEND_IMAGES_URL + subject.imageurl}
            className="object-cover rounded-t-3xl w-full "
            style={{ height: "30vh" }}
          />
        </div>
        <div class="text-center text-primary text-4xl font-bold">
          {subject.title}
        </div>
        <div className="flex flex-row space-x-2 justify-around items-center p-2">
          <div class="text-center text-primary text-lg font-bold">
            author :{" "}
            {subject.authorId.firstName + " " + subject.authorId.lastName}
          </div>
          <div class="text-center text-primary text-base ">
            <div className="flex flex-row space-x-2 justify-center items-center">
              <div>{subject.numberOfViewers}</div>
              <FaEye />
            </div>
          </div>
        </div>
        <div className=" p-2 flex flex-row space-x-4 items-center justify-center text-primary text-xl">
          <div className="text-2xl">Tags:</div>
          {subject.tags.map((elem, index) => {
            return (
              index < 3 && (
                <div
                  className="border-2 p-2 border-light "
                  key={elem._id}
                  //onClick={() => console.log("test")}
                >
                  {elem.name}{" "}
                </div>
              )
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
