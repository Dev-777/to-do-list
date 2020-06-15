import React, { Component } from 'react';
import './app.css';
import $                    from 'jquery';
import { connect }          from 'react-redux';
import { element, toggle }  from '../Actions/Actions';



class ToDoList extends Component {

  componentDidMount()
  {

    let props = this.props;
    ( function ()
    {
      let elementId       = 'element';
      let checkBoxId      = 'checkBox';
      let elementTextArea = 'elementTextArea';
      let int             = 0;
      let toggle1         = false;


      $( '#inputAndButtonDiv > button' )
        .on( 'click', () =>
        {
          if ( toggle1 )
            {
              let elementIdGenerator         = elementId + int ++;
              let checkBoxIdGenerator        = checkBoxId + int ++;
              let elementTextAreaIdGenerator = elementTextArea + int ++;
              toggle1                        = false;


              ( function ()
              {
                $( '#toDoList_BasicList' )
                  .append( '<div  class="d-flex test">' +
                             '<input type="checkbox" class="checkBox"/>' +
                             '<textarea readonly></textarea>' +
                             '<div id="right">\n' +
                             '                    <i class="fas fa-trash-alt"/>\n' +
                             '                    <i id="editListElement" class="fas fa-edit"/>\n' +
                             '                  </div>' +
                             '</div>' );

              } )();

              ( function ()
              {
                $( '#toDoList_BasicList > div:last-child' )
                  .attr( 'id', elementIdGenerator );
                $( '#toDoList_BasicList > div:last-child > textarea' )
                  .attr( 'id', elementTextAreaIdGenerator );
              } )();


              ( function ()
              {
                toggle.lastTextAreaId    = elementTextAreaIdGenerator;
                toggle.lastTextAreaValue = $( '#inputAndButtonDiv > textarea' )
                  .val();
                props.dispatch( toggle );

                element.elementId            = elementIdGenerator;
                element.elementTextAreaId    = elementTextAreaIdGenerator;
                element.elementTextAreaValue = $( '#inputAndButtonDiv > textarea' )
                  .val();
                props.dispatch( element );


              } )();


              $( '#inputAndButtonDiv > textarea' )
                .val( '' );
            }


        } );
      ( function ()
      {
        $( '#inputAndButtonDiv > textarea' )
          .on( 'change', () =>
          {
            toggle1 = true;
          } );

      } )();


    } )();


  }

  componentDidUpdate( prevProps, prevState, snapshot )
  {
    let props = this.props;

    ( function ()
    {
      if ( props.state.lastTextAreaId )
        {
          $( `#${ props.state.lastTextAreaId }` )
            .val( `${ props.state.lastTextAreaValue }` );
        }
    } )();

    ( function ()
    {
      if ( props.state.addToggle )
        {
          props.dispatch( {
                            type              : 'entryFieldValue',
                            addToggle         : false,
                            lastTextAreaValue : $( '#inputAndButtonDiv > textarea' )
                              .val(),
                          } );
        }
    } )();


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