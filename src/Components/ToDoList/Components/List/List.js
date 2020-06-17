import React, { Component, createRef } from 'react';
import { connect }                     from 'react-redux';



class List extends Component {
  constructor( props )
  {
    super( props );

  }

  edit = ( e ) =>
  {
    let inputText  = e.target.parentElement.parentElement.children[ 1 ];
    let checkbox   = e.target.parentElement.parentElement.children[ 0 ];
    let deleteIcon = e.target.parentElement.children[ 0 ];
    let val        = inputText.value;
    let addButRef  = this.props.addButRef.current;


    if ( this.props.state.toggle )
      {

        this.props.dispatch( {
                               type : 'toggle',
                               val  : false,
                             } );

        this.props.saveButRef.current.removeAttribute( 'hidden' );
        deleteIcon.style.pointerEvents = 'none';
        inputText.removeAttribute( 'readonly' );
        checkbox.setAttribute( 'disabled', 'disabled' );
        addButRef.setAttribute( 'disabled', 'disabled' );


        this.props.saveButRef.current.onclick = () =>
        {
          this.props.dispatch( {
                                 type : 'toggle',
                                 val  : true,
                               } );


          // if ( inputText.value !== val )
          //   {
          //     deleteIcon.style.pointerEvents = 'auto';
          //     this.props.dispatch( { type : 'updateSave' } );
          //   }

        };

      }


  };

  deleteElement = ( e ) =>
  {

    if ( this.props.state.toggle )
      {
        this.props.dispatch( {
                               type  : 'delete',
                               delId : e.target.parentNode.parentElement.id,
                             } );
      }
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
                                                 <input
                                                   type="checkbox"/>
                                                 <input
                                                   id='text'
                                                   defaultValue={ item.value }
                                                   ref={ this.text }
                                                   readOnly='readonly'
                                                 />
                                                 <div>
                                                   <i
                                                     onClick={ this.deleteElement }
                                                     className="fas fa-trash-alt"/>
                                                   <i
                                                     onClick={ this.edit }
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
