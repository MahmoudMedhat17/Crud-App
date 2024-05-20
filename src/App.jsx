import './App.css'
import UserList from './Components/User/UserList/UserList';
import UserForm from './Components/User/UserForm/UserForm';
import Layout from './Components/Userlayout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<UserList />} />
            <Route path='/add' element={<UserForm />} />
            <Route path='/edit/:id' element={<UserForm EditForm={true}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
