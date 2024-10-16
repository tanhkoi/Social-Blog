import { Homepage, BlogContentPage, LoginPage, SignUpPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import useFetch from './hooks/useFetch'


export default function App() {
  let {loading, data, error} =useFetch('http://localhost:1337/api/blogs?populate=*')
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error!</p>
  console.log(data)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/blog/:id' element={<BlogContentPage />}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Routes>
    </div>
  );
}
