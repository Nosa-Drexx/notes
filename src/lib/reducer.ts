import { nanoid } from "nanoid";

export const initialState: GlobalState = {
  notes: [{ note: "trial", deleted: false, id: nanoid(), stared: false }],
  trash: [],
  stared: [],
};

//Changes the boolean value of key decleared and  return seperated changed and unchanged values
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

//helper to separate stared notes
const helper = <T extends NoteObjType>(array: NoteObjType[]): T[] => {
  const data = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].stared === true) data.push(array[i]);
  }
  return data as T[];
};

//REDUCER
export const reducer = (
  state: GlobalState = initialState,
  action: ActionType
): GlobalState => {
  //Add new note
  if (action.type === "add") {
    const { details } = action.payload;
    // Don't allow empty string
    if (details === "" || details === " ") return state;

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

  //Edit previous note
  if (action.type === "edit") {
    const { id, update } = action.payload;
    // Don't allow empty string
    if (update === "" || update === " ") return state;

    const updateNotes = state.notes.map((data) => {
      if (data.id === id) {
        data.note = update;
      }
      return data;
    });
    const updateStared = state.stared.map((data) => {
      if (data.id === id) {
        data.note = update;
      }
      return data;
    });

    return {
      ...state,
      notes: updateNotes,
      stared: updateStared,
    };
  }

  //delete note temporarily to trash
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

    const newStared = helper<NoteObjTypeStared>(residueArray);

    return {
      ...state,
      stared: newStared,
      notes: newNote,
      trash: [...trashArray, ...state.trash],
    };
  }

  // restore deleted note in trash
  if (action.type === "restore") {
    const { id } = action.payload;
    const [sortedArray, residueArray] = changeAndPushHelper<NoteObjTypeTrash>(
      state.trash,
      id,
      "deleted",
      []
    );
    const newNotes = [...sortedArray, ...state.notes];
    const newStared = helper<NoteObjTypeStared>(sortedArray);

    return {
      ...state,
      notes: newNotes,
      stared: [...newStared, ...state.stared],
      trash: [...residueArray],
    };
  }

  // star note
  if (action.type === "star") {
    const { id } = action.payload;
    const [sortedArray] = changeAndPushHelper<NoteObjTypeStared>(
      state.notes,
      id,
      "stared",
      []
    );
    const staredArray = [...sortedArray];
    const newNotes = state.notes.map((elem) => {
      if (elem.id === id) {
        return { ...elem, stared: true };
      }
      return elem;
    });

    return {
      ...state,
      notes: newNotes,
      stared: [...staredArray, ...state.stared],
    };
  }

  //unstar note
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
      stared: [...staredArray],
    };
  }

  // delete note completely
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
