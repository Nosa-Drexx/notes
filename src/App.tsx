// import "./App.css";
import React from "react";
import AddNotes from "./components/addNotes";
import Notes from "./components/notes";
import Stared from "./components/stared";
import Trash from "./components/trash";
// import useContextHook from "./lib/useContextHook";

function App() {
  // const { useContextGen } = useContextHook();

  // // useContextGen.dispatch({
  // //   type: "add",
  // //   payload: {
  // //     details: "me",
  // //   },
  // // });

  return (
    <div className="App">
      <AddNotes />
      <Notes />
      <Stared />
      <Trash />
    </div>
  );
}

export default App;
