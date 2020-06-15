const initialState = {
  lastTextAreaId    : '',
  lastTextAreaValue : '',
  addToggle         : false,
  undoRedo          : [],
};

export const Reducer = ( state = initialState, action ) =>
{
  switch ( action.type )
    {

      case 'entryFieldValue':
        const localState_entryFieldValue = {
          lastTextAreaValue : state.lastTextAreaValue,
          addToggle         : state.addToggle,
        };

        localState_entryFieldValue.addToggle         = false;
        localState_entryFieldValue.lastTextAreaValue = action.lastTextAreaValue;


        return { ...state, ...localState_entryFieldValue };


      case 'element':
        const localState_element     = {
          lastTextAreaId : action.elementTextAreaId,
          addToggle      : state.addToggle,
          undoRedo       : state.undoRedo,

        };
        localState_element.addToggle = true;
        action.elementTextAreaValue  = state.lastTextAreaValue;

        localState_element.undoRedo.push( action );

        return { ...state, ...localState_element };


      case 'addToggle':
        const localState_addToggle             = {
          addToggle         : state.addToggle,
          lastTextAreaId    : state.lastTextAreaId,
          lastTextAreaValue : state.lastTextAreaValue,
        };
        localState_addToggle.lastTextAreaId    = action.lastTextAreaId;
        localState_addToggle.lastTextAreaValue = action.lastTextAreaValue;
        localState_addToggle.addToggle         = true;

        return {
          ...state, ...localState_addToggle,
        };


      default:
        return state;

    }
};