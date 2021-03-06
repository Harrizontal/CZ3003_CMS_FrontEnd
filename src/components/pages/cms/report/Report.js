// import React from "react";
import Popup from "reactjs-popup";
import React, { Component } from "react";
import facebook from "../../../../resources/facebook.svg";
import twitter from "../../../../resources/twitter.svg";
import all from "../../../../resources/all.svg";
import { postTwitter } from "../../../../actions/socialMediaActions";
import { connect } from "react-redux";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errror: {},
      selected: "",
      selectedName: "social media"
    };
    this.handleChange = this.handleChange.bind(this);
    this.radioSelect = this.radioSelect.bind(this);
  }

  handleChange(event) {
    var input = event.target.value;
    var charnum = input.length;

    this.setState({ text: event.target.value });
    document.getElementById("remaining").innerHTML =
      280 - charnum + " remaining characters";
  }

  radioSelect(event) {
    var selectedName;
    this.setState({
      selectedName: event.target.name,
      selected: event.target.value
    });
  }

  checkFields = () => {
    const { error, text } = this.state;

    var empty = require("is-empty");
    if (text === "") {
      error["empty"] = "Please type something.";
    }
    if (empty(error)) {
      return true;
    } else {
      this.setState({ error: error });
      return false;
    }
  };
  onSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    // this.setState({
    //   text: "",
    //   selectedoption: "",
    //   errror: {}
    // });

    dispatch(postTwitter(this.state.text, this.state.selected)).then(
      response => {
        alert("social media submitted successfully");
        this.setState({
          text: ""
        });
      },
      error => {
        alert("Error. Please contact the adminstrator.");
      }
    );
  };

  render() {
    const { text, error, selected, selectedName } = this.state;
    return (
      <div className="formcontainer2">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ flexGrow: "4" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline"
              }}
            >
              <div className="card-header">
                <span className="firstwordsel">POST </span>to: {selectedName}
              </div>
            </div>

            <div>
              <textarea
                className="reportText"
                maxLength="280"
                value={this.state.text}
                placeholder="Enter details here."
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div style={{ flexGrow: "1", padding: "2%" }}>
            <span
              id="remaining"
              style={{
                color: "grey",
                float: "right",
                fontFamily: "rubik, san-serif"
              }}
            >
              280 remaining characters.
            </span>
          </div>

          <div
            style={{
              flexGrow: "1",
              display: "flex",
              padding: "2%",
              paddingTop: "3%",
              flexBasis: "0"
            }}
          >
            <div
              style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}
            >
              <input
                className="radioInput"
                type="radio"
                name="all"
                value="3"
                checked={this.state.selected === "3"}
                onChange={this.radioSelect}
              />
              <img src={all} style={{ height: "50px", width: "50px" }} />
            </div>
            <div
              style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}
            >
              <input
                className="radioInput"
                type="radio"
                name="facebook"
                value="2"
                checked={this.state.selected === "2"}
                onChange={this.radioSelect}
              />
              <img src={facebook} style={{ height: "50px", width: "50px" }} />
            </div>
            <div
              style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}
            >
              <input
                className="radioInput"
                type="radio"
                name="twitter"
                value="1"
                checked={this.state.selected === "1"}
                onChange={this.radioSelect}
              />
              <img src={twitter} style={{ height: "50px", width: "50px" }} />
            </div>
          </div>
          <div
            style={{
              flexGrow: "1",
              display: "flex"
            }}
          >
            <button className="btnSubmit" type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Report);
