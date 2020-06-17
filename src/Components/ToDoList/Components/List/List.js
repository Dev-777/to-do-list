import React, { Component, createRef } from 'react';
import { connect }          from 'react-redux';



class List extends Component {
  constructor( props )
  {
    super( props );
    this.text = createRef();
  }

  edit = ( e ) =>
  {
    console.log( e.target.value );
  };


  render()
  {
    return (

      <div className='list'>
        <h2>To Do List</h2>
        {
          this.props.state.toDoList ?
            this.props.state.toDoList.map( item =>
                                           {
                                             return (

                                               <div
                                                 key={ item.id }
                                                 id={ item.id }
                                                 className='text-div'
                                               >
                                                 <input type="checkbox"/>
                                                 <input
                                                   id='text'
                                                   defaultValue={ item.value }
                                                   readOnly
                                                 />
                                                 <div>
                                                   <i
                                                     onClick={ this.props.del }
                                                     className="fas fa-trash-alt"/>
                                                   <i
                                                     onClick={ this.props.edit }
                                                     className="far fa-edit"/>
                                                 </div>

                                               </div>
                                             );
                                           } ) : null }
      </div>
    );
  }



  ;
}


const mapStateToProps = ( state ) =>
{
  return { state : state };
};


export default connect( mapStateToProps )( List );
