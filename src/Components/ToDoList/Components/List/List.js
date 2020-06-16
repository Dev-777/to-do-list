import React       from 'react';
import { connect } from 'react-redux';



function List( props )
{


  return (
    <div className='list'>
      <h2>To Do List</h2>
      {
        props.state.toDoList ?
          props.state.toDoList.map( item =>
                                    {
                                      return (

                                        <div
                                          key={ item.id }
                                          id={ item.id }
                                          className='text-div'
                                        >
                                          <input type="checkbox"/>
                                          <div id='text'>
                                            { item.value }
                                          </div>
                                          <div>
                                            <i
                                              onClick={ props.del }
                                              className="fas fa-trash-alt"/>
                                            <i className="far fa-edit"/>
                                          </div>

                                        </div>
                                      );
                                    } ) : null }
    </div>
  );
}


const mapStateToProps = ( state ) =>
{
  return { state : state };
};


export default connect( mapStateToProps )( List );
