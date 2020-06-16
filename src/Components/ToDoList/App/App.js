import React, { Component } from 'react';
import './app.css';
import { connect }          from 'react-redux';
import Input                from '../Components/Input/Input';
import { add }              from '../Actions/Actions';
import List                 from '../Components/List/List';



class ToDoList extends Component {

  updateInput = ( value ) =>
  {
    this.props.dispatch( {
                           type  : 'newElement',
                           value : value,
                         } );
  };

  enterEvent = e =>
  {
    if ( e.target.value === '' )
      {
        return false;
      }
    if ( e.keyCode === 13 )
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

  deleteElement = ( e ) =>
  {

    this.props.dispatch( {
                           type  : 'delete',
                           delId : e.target.parentNode.parentNode.id,
                         } );
  };

  undo = () =>
  {

    if ( this.props.state.undoRedo.undo.length )
      {
        this.props.dispatch( { type : 'undo' } );
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
        <List
          del={ this.deleteElement }
        />
        <i
          onClick={ this.undo }

          className="fas fa-undo"/>
        <i className="fas fa-redo"/>


      </div>
    );
  }
}

const mapStateToProps = ( state ) =>
{
  return { state : state };
};

export default connect( mapStateToProps )( ToDoList );