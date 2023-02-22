// import "./App.css";
import React from "react";
import useContextHook from "./lib/useContextHook";

function App() {
  const { useContextGen } = useContextHook();

  // useContextGen.dispatch({
  //   type: "add",
  //   payload: {
  //     details: "me",
  //   },
  // });

  return (
    <div className="App">
      {React.Children.toArray(
        useContextGen.state.notes.map((elem) => <p>{elem.note}</p>)
      )}
    </div>
  );
}

export default App;
