import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import NewPost from "../../../components/NewPost/NewPost";

const NewPostPage = () => {
  const token = localStorage.getItem("token"); 

  return (
    <div className="bg-white min-h-screen text-black">
      <header>
        <NavBar setSearchTerm={() => {}} />
      </header>
      <main className="flex">
        <aside className="w-60">
          <SideBar />
        </aside>
        <div className="w-50 flex-grow p-1 mt-10">
          <NewPost token={token} />
        </div>
      </main>
    </div>
  );
};

export default NewPostPage;
