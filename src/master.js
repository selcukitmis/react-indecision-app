import React from "react";
import ReactDOM from "react-dom";

const Layout = props => {
  return (
    <div>
      <p>Header</p>
      {props.content}
      <p>Footer</p>
    </div>
  );
};

const Layout2 = props => {
    return (
      <div>
        <p>Header</p>
        {props.children}
        <p>Footer</p>
      </div>
    );
  };

const template = (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);

ReactDOM.render(<Layout2><p>Test</p></Layout2>, document.getElementById("app"));
