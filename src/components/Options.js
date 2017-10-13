import React from "react";
import Option from './Option'

const Options = props => {
  return (
    <div>
      <button
        disabled={props.options.length === 0}
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>

      {props.options.length === 0 &&
        <p>Please add an option to get started!s</p>}
      {props.options.map(opt => (
        <Option
          key={opt}
          handleDeleteOption={props.handleDeleteOption}
          optionText={opt}
        />
      ))}
    </div>
  );
};
export default Options;
