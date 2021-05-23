import React from "react";

const CustomMenu = ({
  children,
  placeholder,
  name,
  value,
  onChange,
  errors,
}) => {
  return (
    <div>
      <select
        className={`w-3/4 m-2 p-2 focus:outline-none border-2 rounded-lg border-primary  ${
          value ? "text-black" : "text-gray-400"
        }`}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" selected disabled hidden>
          {placeholder}
        </option>
        {children}
      </select>
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

export default CustomMenu;
