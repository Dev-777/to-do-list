const initialState = {
  inputValue       : '',
  newElementParams : {},
  toDoList         : [],

};

export const Reducer = ( state = initialState, action ) =>
{
  switch ( action.type )
    {
      case 'newElement':
        const localState_newElement      = {
          inputValue : state.inputValue,
        };
        localState_newElement.inputValue = action.value;

        return { ...state, ...localState_newElement };

      case 'add':
        const localState_add = {
          inputValue       : state.inputValue,
          newElementParams : state.newElementParams,
          toDoList         : state.toDoList,
        };

        return { ...state, ...localState_add };


      default:
        return state;

    }
};