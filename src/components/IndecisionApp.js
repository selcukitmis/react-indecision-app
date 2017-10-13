import React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Header from "./Header";
import Options from "./Options";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
  state = {
    title: "Indecision",
    subtitle: "Put your life in the hands of a computer",
    options: [],
    selectedOption: undefined
  };

  closeModal = () => {
    this.setState({ selectedOption: undefined });
  };

  deleteOptions = () => {
    // setstate kullanım 1
    this.setState({ options: [] });

    // setstate kullanım 2
    this.setState(() => {
      return {
        options: []
      };
    });
    // setstate kullanım 3
    this.setState(() => ({
      options: []
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState({ selectedOption: option });
  };

  addOption = option => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    this.setState(prevState => {
      return {
        options: prevState.options.concat(option)
      };
    });
  };

  deleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  };

  componentWillMount() {
    // komponent render edilmeden önce çalışır.
    console.log("componentWillMount");
  }

  componentDidMount() {
    // komponent render edildikten sonra çalışır.

    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState({ options });
      }
    } catch (e) {
      console.log(e);
    }

    console.log("componentDidMount");
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {
    // komponent güncellendiğinde çalışır
    console.log("componentDidUpdate");
    console.log("componentDidUpdate: prevProps", prevProps);
    console.log("componentDidUpdate: prevState", prevState);
    console.log("componentDidUpdate: newProps", this.props);
    console.log("componentDidUpdate: newState", this.state);

    if (prevState.options.length !== this.state.options.length) {
      localStorage.setItem("options", JSON.stringify(this.state.options));
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render ediliyor");
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <Action
          hasOptions={this.state.options.length === 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.deleteOptions}
          handleDeleteOption={this.deleteOption}
        />
        <AddOption handleAddOption={this.addOption} />
        <OptionModal
          selectedOption={this.state.selectedOption}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};
