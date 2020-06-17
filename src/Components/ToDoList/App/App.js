import React, { Component, createRef } from 'react';
import './app.css';
import { connect }                     from 'react-redux';
import Input                           from '../Components/Input/Input';
import { add }                         from '../Actions/Actions';
import List                            from '../Components/List/List';



class ToDoList extends Component {
  constructor( props )
  {
    super( props );
    this.butSaveUpdate = createRef();
    this.addButRef     = createRef();

  }

  updateInput = ( value ) =>
  {
    this.props.dispatch( {
                           type  : 'newElement',
                           value : value,
                         } );
  };

  enterEvent = ( e ) =>
  {
    if ( e.target.value === '' )
      {

        return false;
      }
    if ( e.keyCode === 13 && this.props.state.toggle )
      {

        this.addToDo();
      }
  };

  addButton = ( e ) =>
  {
    if ( this.props.state.inputValue && this.props.state.toggle )
      {
        this.addToDo();
      }
  };


  addToDo = () =>
  {
    add.id    = new Date().valueOf();
    add.value = this.props.state.inputValue;
    this.props.dispatch( add );
  };


  undo = () =>
  {
    if ( this.props.state.undoRedo.undo.length && this.props.state.toggle )
      {
        this.props.dispatch( { type : 'undo' } );
      }
  };

  redo = () =>
  {
    if ( this.props.state.undoRedo.redo.length && this.props.state.toggle )
      {
        this.props.dispatch( { type : 'redo' } );
      }
  };


  render()
  {
    return (
      <div id='toDoList_Main' className='d-flex'>

        <Input
          updateInput={ this.updateInput }
          enterEvent={ this.enterEvent }
        />
        <button
          id='add'
          onClick={ this.addButton }
          ref={ this.addButRef }
        >Add
        </button>

        <div id='undoRedoIcons'>
          <i
            onClick={ this.undo }
            className="fas fa-undo"/>
          <i
            onClick={ this.redo }
            className="fas fa-redo"/>
        </div>
        <button id='saveUpdate'
                hidden
                ref={ this.butSaveUpdate }
        >Save/Update
        </button>

        <List
          saveButRef={ this.butSaveUpdate }
          addButRef={ this.addButRef }
        />


      </div>
    );
  }
}

const mapStateToProps = ( state ) =>
{
  return { state : state };
};

export default connect( mapStateToProps )( ToDoList );