import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { add, newElement, redo, undo } from "../../Actions/Actions";
import List from "../List/List";
import "../../../style/toDoList.css";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.addButRef = createRef();
    this.inpRef = createRef();
  }

  updateInput = (value) => {
    newElement.value = value;
    this.props.dispatch(newElement);
  };

  enterEvent = (e) => {
    if (e.target.value === "") {
      return false;
    }
    if (e.keyCode === 13 && this.props.state.toggle) {
      this.addToDo();
    }
  };

  addButton = (e) => {
    if (this.props.state.inputValue && this.props.state.toggle) {
      this.addToDo();
    }
  };

  addToDo = () => {
    add.id = new Date().valueOf();
    add.value = this.props.state.inputValue;
    this.props.dispatch(add);
  };

  undo = () => {
    if (this.props.state.undoRedo.undo.length && this.props.state.toggle) {
      this.props.dispatch(undo);
    }
  };

  redo = () => {
    if (this.props.state.undoRedo.redo.length && this.props.state.toggle) {
      this.props.dispatch(redo);
    }
  };

  render() {
    return (
      <div
        id="toDoList_Main"
        className="d-flex justify-content-between container"
      >
        <div className="col">
          <div className="form-group d-flex input-wrap align-items-center">
            <input
              id="input"
              type="text"
              placeholder="type to do"
              value={this.props.state.inputValue}
              onChange={(e) => this.updateInput(e.target.value)}
              ref={this.inpRef}
              onKeyDown={this.enterEvent}
              className="form-control mr-2"
              autoFocus
            />
            <button
              id="add"
              onClick={this.addButton}
              ref={this.addButRef}
              className="btn btn-dark"
            >
              Add
            </button>
            <div className="undoRedoIcons d-flex ml-2">
              <i onClick={this.undo} className="fas fa-undo" />
              <i onClick={this.redo} className="fas fa-redo" />
            </div>
          </div>
        </div>
        <div className="col list-wrap pr-0">
          <List addButRef={this.addButRef} inpRef={this.inpRef} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state: state };
};

export default connect(mapStateToProps)(ToDoList);
