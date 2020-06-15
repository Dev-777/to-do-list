const initialState = {
  undoRedo : {
    add : [],
  },
};

export const Reducer = ( state = initialState, action ) =>
{
  switch ( action.type )
    {
      case 'elementId':
        let localState = {
          undoRedo : {
            add : state.undoRedo.add,
          },
        };
        localState.undoRedo.add.push( action.id );
        return { ...state, ...localState };
      default:
        return state;

    }
};