import React from "react";

const CustomInput = ({
  label,
  leftIcon,
  rightIcon,
  type,
  value,
  onChange,
  name,
  errors = [],
}) => {
  return (
    <div className="">
      <div class=" flex flex-row items-center justify-center border-2 rounded-md   border-primary focus-within:border-light">
        {leftIcon !== null && leftIcon !== undefined && (
          <button
            className=" flex-0 focus:outline-none rounded-full border-r-4 border-primary invisible  md:visible cursor-default"
            type="button"
          >
            <img
              src={leftIcon}
              className="w-7 h-7 transform  hover:-translate-1 hover:scale-110"
              alt="icon"
            />
          </button>
        )}
        <input
          placeholder={label}
          onChange={onChange}
          value={value}
          className="flex-1  p-2 focus:outline-none  "
          type={type}
          name={name}
        />
        {rightIcon !== null && rightIcon !== undefined && (
          <button
            className=" flex-0  focus:outline-none rounded-full border-l-4  border-primary invisible  md:visible cursor-default"
            type="button"
          >
            <div className="p-4 transform  hover:-translate-1 hover:scale-150">
              {rightIcon}
            </div>
          </button>
        )}
      </div>
      {errors.length > 0 && (
        <div className="text-sm text-red-700 p-2">
          {errors.map((elem, index) => {
            return <div className="">{`${index + 1}. ${elem}`}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
