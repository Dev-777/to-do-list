import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { deleteElem, toggle, saveUpdate } from "../../Actions/Actions";
import "../../../style/toDoList.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.saveUpdateRef = createRef();
  }

  edit = (e, element) => {
    this.inputText = e.target.parentElement.parentElement.children[1];
    this.element = element;
    if (this.props.state.toggle) {
      toggle.val = false;
      this.props.dispatch(toggle);
      this.saveUpdateRef.current.removeAttribute("hidden");
      this.inputText.removeAttribute("readonly");
    }
  };

  saveUpdateButton = () => {
    toggle.val = true;
    this.props.dispatch(toggle);
    if (this.inputText.value !== this.element.value) {
      saveUpdate.id = this.element.id;
      saveUpdate.value = this.inputText.value;
      this.props.dispatch(saveUpdate);
    }
    this.saveUpdateRef.current.setAttribute("hidden", "hidden");
    this.inputText.setAttribute("readonly", "readonly");
  };

  deleteElement = (id) => {
    if (this.props.state.toggle) {
      deleteElem.delId = id;
      this.props.dispatch(deleteElem);
    }
  };

  render() {
    return (
      <div className="list">
        <h2>To Do List</h2>
        <button
          onClick={this.saveUpdateButton}
          id="saveUpdate"
          hidden
          ref={this.saveUpdateRef}
        >
          Save/Update
        </button>
        {this.props.state.toDoList
          ? this.props.state.toDoList.map((item) => {
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="form-group d-flex align-items-center justify-content-between text-div"
                >
                  <input type="checkbox" />
                  <input
                    id="text"
                    defaultValue={item.value}
                    ref={this.text}
                    readOnly="readonly"
                    className="form-control"
                  />
                  <div className="list-edit d-flex justify-content-between">
                    <i
                      onClick={() => this.deleteElement(item.id)}
                      className="fas fa-trash-alt"
                    />
                    <i
                      onClick={(event) => this.edit(event, item)}
                      className="far fa-edit"
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state: state };
};

export default connect(mapStateToProps)(List);
