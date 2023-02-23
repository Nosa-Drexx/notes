import { Link } from "react-router-dom";
import Stared from "../components/stared";

const StaredPage = () => {
  return (
    <section>
      <header className="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
        <h1>Stared Notes</h1>
        <ul className="list-none flex gap-4">
          <li>
            <Link to="/" className="underline">
              Notes
            </Link>
          </li>
          <li>
            <Link to="/trash" className="underline">
              Trash
            </Link>
          </li>
        </ul>
      </header>
      <Stared />;
    </section>
  );
};

export default StaredPage;
