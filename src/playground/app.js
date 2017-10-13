class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Indecision",
      subtitle: "Put your life in the hands of a computer",
      options: props.options // defaultprops tan geliyor
    };

    this.deleteOptions = this.deleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
  }

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

  deleteOptions() {
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
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  addOption(option) {
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
  }

  deleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
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
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "Default Title!"
};

const Action = props => {
  return (
    <div>
      <button
        disabled={props.hasOptions}
        onClick={() => {
          props.handlePick();
        }}
      >
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button
        disabled={props.options.length === 0}
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>
      
      {props.options.length === 0 && <p>Please add an option to get started!s</p>}
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

const Option = props => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={() => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState({ error });
    if (!error) {
      e.target.elements.option.value = "";
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input autoFocus autoComplete="off" type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
