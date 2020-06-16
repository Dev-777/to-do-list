import React       from 'react';
import { connect } from 'react-redux';



function Input( props )
{

  return (
    <input
      id='input'
      type='text'
      placeholder='type to do'
      value={ props.state.inputValue }
      onChange={ e => props.updateInput( e.target.value ) }

      onKeyDown={ props.enterEvent }
      className='input'
      autoFocus
    />
  );
}


const mapStateToProps = ( state ) =>
{
  return { state : state };
};


export default connect( mapStateToProps )( Input );