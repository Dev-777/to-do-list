import React, { Component } from 'react';
import './app.css';
import $                    from 'jquery';
import { connect }          from 'react-redux';



class ToDoList extends Component {

  componentDidMount()
  {

    let props = this.props;
    ( function ()
    {
      let int    = 0;
      let strId  = 'element';
      let toggle = false;


      $( '#inputAndButtonDiv > button' )
        .on( 'click', () =>
        {
          if ( toggle )
            {
              let idGenerator = strId + int ++;
              toggle          = false;

              $( '#toDoList_BasicList' )
                .append( '<div  class="d-flex test">' +
                           '<input type="checkbox" id="crossОut"/>' +
                           '<textarea id="contentTextArea" readonly></textarea>' +
                           '<div id="right">\n' +
                           '                    <i class="fas fa-trash-alt"/>\n' +
                           '                    <i id="editListElement" class="fas fa-edit"/>\n' +
                           '                  </div>' +
                           '</div>' );

              $( '#toDoList_BasicList > div:last-child' )
                .attr( 'id', idGenerator );

              props.dispatch( {
                                type : 'elementId',
                                id   : idGenerator,
                              } );

              $( '#inputAndButtonDiv > textarea' )
                .val( '' );
            }
        } );
      $( '#inputAndButtonDiv > textarea' )
        .on( 'change', () =>
        {
          toggle = true;
        } );


    } )();


  }

  componentDidUpdate( prevProps, prevState, snapshot )
  {

    let k = $( '#inputAndButtonDiv > textarea' )
      .val();
    $( `#${ this.props.state.id } >textarea` )
      .html( `${ k }` );

    console.log( this.props.state, 'Tamarikik' );

  }


  render()
  {
    return (
      <div id='toDoList_Main' className='d-flex'>
        <div id='sectionOne' className='d-flex'>
          <div id='inputAndButtonDiv' className='d-flex'>
            <textarea/>
            <button className='btn btn btn-warning'>Add</button>
          </div>
          <div id='toDoList_Tool'>
          </div>
        </div>
        <div id='sectionTwo'>
          <div id='toDoList_FavoriteList'>
          </div>
          <div id='toDoList_BasicList'>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) =>
{
  return { state : state };
};

export default connect( mapStateToProps )( ToDoList );