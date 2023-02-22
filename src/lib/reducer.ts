import { nanoid } from "nanoid";

const initialState: GlobalState = {
  notes: [{ note: "trial", deleted: false, id: nanoid(), stared: false }],
  trash: [],
  stared: [],
};

const changeAndPushHelper = <T extends NoteObjType>(
  array: NoteObjType[],
  check: string,
  keytoChange: keyof T & keyof NoteObjType,
  initialArray: T[] = []
): readonly [T[], NoteObjType[] & T[]] => {
  let residueArray: NoteObjType[] & T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === check) {
      const updateObj: T = {
        ...array[i],
        [keytoChange]: !array[i][keytoChange],
      } as T;
      initialArray.push(updateObj);
    } else {
      residueArray.push(array[i]);
    }
  }

  const sortedArray = initialArray;

  return [sortedArray, residueArray] as const;
};

const reducer = (
  state: GlobalState = initialState,
  action: ActionType
): GlobalState => {
  if (action.type === "add") {
    const { details } = action.payload;
    const searchForDuplicate = state.notes.find(
      (data) => data.note === details
    );

    return searchForDuplicate
      ? {
          ...state,
          notes: [searchForDuplicate, ...state.notes],
        }
      : {
          ...state,
          notes: [
            { note: details, deleted: false, id: nanoid(), stared: false },
            ...state.notes,
          ],
        };
  }
  if (action.type === "edit") {
    const { id, update } = action.payload;
    const updateNotes = state.notes.map((data) => {
      if (data.id === id) {
        data.note = update;
      }
      return data;
    });

    return {
      ...state,
      notes: updateNotes,
    };
  }
  if (action.type === "trash") {
    const { id } = action.payload;
    const [sortedArray, residueArray] = changeAndPushHelper<NoteObjTypeTrash>(
      state.notes,
      id,
      "deleted",
      []
    );
    const trashArray = [...sortedArray];
    const newNote = [...residueArray];

    return {
      ...state,
      notes: newNote,
      trash: [...trashArray, ...state.trash],
    };
  }
  if (action.type === "star") {
    const { id } = action.payload;
    const [sortedArray] = changeAndPushHelper<NoteObjTypeStared>(
      state.notes,
      id,
      "stared",
      []
    );
    const staredArray = [...sortedArray];

    return {
      ...state,
      stared: [...staredArray, ...state.stared],
    };
  }
  if (action.type === "unstar") {
    const { id } = action.payload;
    const [, residueArray] = changeAndPushHelper<NoteObjTypeStared>(
      state.stared,
      id,
      "stared",
      []
    );
    const staredArray = [...residueArray];
    const newNotes = state.notes.map((elem) => {
      if (elem.id === id) {
        elem.stared = false;
      }
      return elem;
    });

    return {
      ...state,
      notes: newNotes,
      stared: [...staredArray, ...state.stared],
    };
  }

  if (action.type === "delete") {
    const { id } = action.payload;
    const newTrash = state.trash.filter((elem) => elem.id !== id);

    return {
      ...state,
      trash: newTrash,
    };
  }
  return state;
};

export default reducer;
