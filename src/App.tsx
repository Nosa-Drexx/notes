// import "./App.css";
import useContextHook from "./lib/useContextHook";

function App() {
  const { useContextGen } = useContextHook();

  // useContextGen.dispatch({
  //   type: "add",
  //   payload: {
  //     details: "me",
  //   },
  // });

  return <div className="App"></div>;
}

export default App;
