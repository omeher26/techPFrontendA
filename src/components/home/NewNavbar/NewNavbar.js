import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'

const NewNavbar = ({isMainHome, isCreatePro,isProjectList}) => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('tplToken');
        navigate('/login')
    }
  return (
    <div className='mainNavbar'>
        <div className='navBarOpt'>
            <div onClick={()=>navigate('/')}>
               {
                isMainHome ? 
                <img src="/assets/Dashboard-active.png" alt="" />
                :
                <img src="/assets/Dashboard.png" alt="" />
               }
            </div>

            <div onClick={()=>navigate('/projectList')}>
                {
                    isProjectList
                    ?
                    <img src="/assets/Project-list-active.png" alt="" />
                    :
                    <img src="/assets/Project-list.png" alt="" />
                }
            </div>

            <div className='hrNav'></div>

            <div onClick={()=>navigate('/createPro')}>
                {
                    isCreatePro
                    ?
                    <img src="/assets/create-project-active.png" alt="" />
                    :
                    <img src="/assets/create-project.png" alt="" />
                }
            </div>
        </div>
        <div className='logout' onClick={handleLogout} >
            <img src="/assets/Logout.png" alt="" />
        </div>
    </div>
  )
}

export default NewNavbar




