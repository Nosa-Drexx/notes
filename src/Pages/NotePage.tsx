import { Link } from "react-router-dom";
import AddNotes from "../components/addNotes";
import Notes from "../components/notes";

const NotePage = () => {
  return (
    <section>
      <header className="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
        <h1>Welcome to notes</h1>
        <ul className="list-none flex gap-4">
          <li>
            <Link to="/stared" className="underline">
              Stared{" "}
            </Link>
          </li>
          <li>
            <Link to="/trash" className="underline">
              Trash{" "}
            </Link>
          </li>
        </ul>
      </header>
      <AddNotes />
      <Notes />
    </section>
  );
};

export default NotePage;
