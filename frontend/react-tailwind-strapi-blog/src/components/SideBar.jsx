
const SideBar = () => {
    return(
        <aside className="w-60 bg-white p-4 rounded-lg drop-shadow-lg fixed">
          
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-zinc-400">My feed</a></li>
      <li><a href="#" className="hover:text-zinc-400">Custom feed</a></li>
    </ul>
    <h3 className="mt-6 text-sm font-semibold">Squads</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-zinc-400">Public Squads</a></li>
      <li><a href="#" className="hover:text-zinc-400">New Squad</a></li>
    </ul>
    <h3 className="mt-6 text-sm font-semibold">Discover</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-zinc-400">Explore</a></li>
      <li><a href="#" className="hover:text-zinc-400">Discussions</a></li>
      <li><a href="#" className="hover:text-zinc-400">Tags</a></li>
      <li><a href="#" className="hover:text-zinc-400">Sources</a></li>
      <li><a href="#" className="hover:text-zinc-400">Leaderboard</a></li>
    </ul>
    <h3 className="mt-6 text-sm font-semibold">Activity</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-zinc-400">Submit a link</a></li>
      <li><a href="#" className="hover:text-zinc-400">Bookmarks</a></li>
      <li><a href="#" className="hover:text-zinc-400">History</a></li>
    </ul>
    <h3 className="mt-6 text-sm font-semibold">Resources</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-zinc-400">Docs</a></li>
      <li><a href="#" className="hover:text-zinc-400">Changelog</a></li>
      <li><a href="#" className="hover:text-zinc-400">Feedback</a></li>
    </ul>
  </aside>
    );
};
export default SideBar;