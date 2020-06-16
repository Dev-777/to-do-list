import React, { Component } from 'react';
import './app.css';
import { connect }          from 'react-redux';
import Input                from '../../Input/Input';



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
    const newElementParams = {
      id    : new Date().valueOf(),
      value : this.props.state.inputValue,
    };



    const toDoList = this.props.state.toDoList;

    toDoList.push( newElementParams );
    const allToDos = this.state.allToDos;
    const addCount = allToDos + 1;
    this.setState( {
                     newToDo  : '',
                     toDoList,
                     allToDos : addCount,
                   } );



    this.props.dispatch({type:'add'})
  };


  render()
  {
    return (
      <div id='toDoList_Main' className='d-flex'>

        <Input
          updateInput={ this.updateInput }
          // addToDo={ this.addToDo }
          enterEvent={ this.enterEvent }
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