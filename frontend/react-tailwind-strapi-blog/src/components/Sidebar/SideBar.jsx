import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="w-60 h-screen bg-white text-black p-4 flex flex-col justify-center  rounded-lg drop-shadow-lg fixed border-r border-gray-600">
      <ul className="space-y-6">
        <li>
          <Link to="/saved" className="hover:text-zinc-400 text-lg font-bold">
            Bookmarks
          </Link>
        </li>
        <li>
          <Link
            to="/category"
            className="hover:text-zinc-400 text-lg font-bold"
          >
            Tag
          </Link>
        </li>
        <li>
          <Link to="/popular" className="hover:text-zinc-400 text-lg font-bold">
            Popular
          </Link>
        </li>
        <li>
          <Link
            to="/feedback"
            className="hover:text-zinc-400 text-lg font-bold"
          >
            Feedback
          </Link>
        </li>
        <li>
          <a href="#" className="hover:text-zinc-400 text-lg font-bold">
            Sources
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-zinc-400 text-lg font-bold">
            Submit a link
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-zinc-400 text-lg font-bold">
            History
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
