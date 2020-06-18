const initialState = {
  inputValue: "",
  newElementParams: {},
  toDoList: [],
  undoRedo: {
    undo: [],
    redo: [],
  },
  toggle: true,
  updateElementText: [],
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "newElement":
      const localState_newElement = {
        inputValue: state.inputValue,
      };
      localState_newElement.inputValue = action.value;
      return { ...state, ...localState_newElement };
    case "add":
      const localState_add = {
        inputValue: state.inputValue,
        newElementParams: state.newElementParams,
        toDoList: state.toDoList,
      };
      localState_add.inputValue = "";
      localState_add.newElementParams = {
        id: action.id,
        value: action.value,
      };
      localState_add.toDoList.push(localState_add.newElementParams);
      return { ...state, ...localState_add };
    case "delete":
      const localState_delete = {
        toDoList: state.toDoList,
        undoRedo: {
          undo: [],
          redo: [],
        },
      };
      for (let i = 0; i < localState_delete.toDoList.length; i++) {
        if (localState_delete.toDoList[i].id === +action.delId) {
          localState_delete.undoRedo.undo.push(+action.delId);
          localState_delete.undoRedo.undo.push(i);
          localState_delete.undoRedo.undo.push(
            localState_delete.toDoList[i].value
          );
          localState_delete.toDoList.splice(i, 1);
          break;
        }
      }
      return { ...state, ...localState_delete };
    case "undo":
      const localState_undo = {
        toDoList: state.toDoList,
        undoRedo: {
          undo: state.undoRedo.undo,
          redo: state.undoRedo.redo,
        },
      };
      localState_undo.toDoList.splice(localState_undo.undoRedo.undo[1], 0, {
        id: localState_undo.undoRedo.undo[0],
        value: localState_undo.undoRedo.undo[2],
      });
      localState_undo.undoRedo.redo = [...localState_undo.undoRedo.undo];
      localState_undo.undoRedo.undo = [];
      localState_undo.undoRedo.undo = [];
      return { ...state, ...localState_undo };
    case "redo":
      const localState_redo = {
        toDoList: state.toDoList,
        undoRedo: {
          undo: state.undoRedo.undo,
          redo: state.undoRedo.redo,
        },
      };
      localState_redo.toDoList.splice(localState_redo.undoRedo.redo[1], 1);
      localState_redo.undoRedo.undo = [...localState_redo.undoRedo.redo];
      localState_redo.undoRedo.redo = [];
      return { ...state, ...localState_redo };
    case "saveUpdate":
      const localState_saveUpdate = {
        toDoList: state.toDoList,
      };
      for (let i = 0; i < localState_saveUpdate.toDoList.length; i++) {
        if (localState_saveUpdate.toDoList[i].id === +action.id) {
          localState_saveUpdate.toDoList[i].value = action.value;
          break;
        }
      }
      return { ...state, ...localState_saveUpdate };
    case "toggle":
      const localState_toggle = {
        toggle: state.toggle,
      };
      if (action.val) {
        localState_toggle.toggle = true;
      } else {
        localState_toggle.toggle = false;
      }
      return { ...state, ...localState_toggle };
    default:
      return state;
  }
};
