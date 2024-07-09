import React, { useEffect } from 'react'
import Login from './components/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NewNavbar from './components/home/NewNavbar/NewNavbar';
// import Dashboard from './components/home/Dashboard/Dashboard';
import MainHome from './components/home/Main Project/MainHome';
import CreateProMain from './components/home/create project/CreateProMain';
import ProjectListingMain from './components/home/project listing/ProjectListingMain';
import { useDispatch } from 'react-redux';
import { allProjects } from './redux/slice/ProjectSlice';

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';
  const isMainHome = location.pathname === '/';
  const isCreatePro = location.pathname === '/createPro';
  const isProjectList = location.pathname === '/projectList';

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allProjects())
  },[dispatch]);
  
  return (
    <div className="app-container">

    {showNavbar && <NewNavbar isMainHome={isMainHome} isCreatePro={isCreatePro} isProjectList={isProjectList}/>}

    <div className={showNavbar ? 'content' : ''}>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        <Route path='/' element={<MainHome/>} />
        <Route path='/createPro' element={<CreateProMain/>} />
        <Route path='/projectList' element={<ProjectListingMain/>} />
      </Routes>
    </div>
  </div>
  )
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;



