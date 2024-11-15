import  NavBar  from "../../../components/Header/NavBar";
import  SideBar  from "../../../components/Sidebar/SideBar";
import  BlogContent  from "../../../components/Blog/BlogContent";

const BlogContentPage = () => {
  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex">
          <div className="w-60">
            <SideBar />
          </div>
          <div className={"flex-grow ml-4"}>
            <BlogContent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogContentPage;