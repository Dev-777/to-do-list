import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { deleteElem, toggle, updateSave } from "../../Actions/Actions";

class List extends Component {
  constructor(props) {
    super(props);
    this.updateSaveRef = createRef();
  }

  edit = (e, element) => {
    this.inputText = e.target.parentElement.parentElement.children[1];
    this.element = element;

    if (this.props.state.toggle) {
      toggle.val = false;
      this.props.dispatch(toggle);
      this.updateSaveRef.current.removeAttribute("hidden");
      this.inputText.removeAttribute("readonly");

      // this.props.saveButRef.current.onclick = () => {
      //   toggle.val = true;
      //   this.props.dispatch(toggle);
      //   updateSave.id = elementId;
      //   updateSave.value = inputText.value;
      //   this.props.dispatch(updateSave);
      //   this.props.saveButRef.current.setAttribute("hidden", "hidden");
      //   inputText.setAttribute("readonly", "readonly");
      //   checkbox.removeAttribute("disabled", "disabled");
      // };
    }
  };

  updateSaveButton = () => {
    toggle.val = true;
    this.props.dispatch(toggle);

    if (this.inputText.value !== this.element.value) {
      updateSave.id = this.element.id;
      updateSave.value = this.inputText.value;
      this.props.dispatch(updateSave);
    }
    this.updateSaveRef.current.setAttribute("hidden", "hidden");
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
          onClick={this.updateSaveButton}
          id="updateSave"
          hidden
          ref={this.updateSaveRef}
        >
          Save/Update
        </button>
        {this.props.state.toDoList
          ? this.props.state.toDoList.map((item) => {
              return (
                <div key={item.id} id={item.id} className="text-div">
                  <input type="checkbox" />
                  <input
                    id="text"
                    defaultValue={item.value}
                    ref={this.text}
                    readOnly="readonly"
                  />
                  <div>
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
