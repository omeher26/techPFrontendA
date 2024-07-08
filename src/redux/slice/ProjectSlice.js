import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const apiLink = process.env.REACT_APP_TPL;

export const createPro = createAsyncThunk('createProject', async(projectD)=>{
    try{
        const response = await axios.post(`${apiLink}/createPro`, projectD)
        return response.data;
    }catch(err){
        console.log(err);
    }
})

export const allProjects = createAsyncThunk('allProjects', async()=>{
    const token = localStorage.getItem('tplToken');

    try{
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const pData = await axios.get(`${apiLink}/allProjects`, config);
        return pData.data;
    }catch(err){
        console.log(err);
    }
})

export const updProStatus = createAsyncThunk('updateProject', async({id, status})=>{
    try{
        const res = await axios.put(`${apiLink}/updateProject/${id}`, {status});
        return res.data;
    }catch(err){
        console.log(err);
    }
})


const initialState = {
    data : [],
    newData:[],
    isLoading: false,
    isError: false
}

const projectSlice = createSlice({
    name:'projectDataSlice',
    initialState,
    reducers:{

        sortByStartD: (state) => {
            state.data.sort((a, b) => new Date(a.sDate) - new Date(b.sDate));
        },

        sortByEndD : (state,action)=>{
            state.data.sort((a,b)=> new Date(a.eDate) - new Date(b.eDate))
        },

        sortByLstMod : (state,action)=>{
            state.data.sort((a,b)=> new Date(b.lastUpd) - new Date(a.lastUpd))
        },

        sortByPrio: (state) => {
            const priorityS = { 'High': 1, 'Medium': 2, 'Low': 3 };
            state.data.sort((a, b) => priorityS[a.priority] - priorityS[b.priority]);
        },

        sortByStatus: (state)=>{
            const statusD = {'Register':1, 'Start':2, 'Close':3,'Cancelled':4};
            state.data.sort((a,b)=> statusD[a.status] - statusD[b.status]);
        }
    },

    extraReducers:(builder) =>{
        // create project
        builder.addCase(createPro.pending, (state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(createPro.fulfilled, (state,action)=>{
            // state.newData = state.newData.unshift(action.payload);
            state.newData = action.payload;
            state.isLoading = false;
        });
        builder.addCase(createPro.rejected, (state,action)=>{
            state.isError = true;
        })

        // get all project data
        builder.addCase(allProjects.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(allProjects.fulfilled, (state,action)=>{
            state.data = action.payload || [];
            state.isLoading = false;
        });
        builder.addCase(allProjects.rejected, (state)=>{
            state.isError = true;
            state.isLoading = false;
        });

        //update project status
        builder.addCase(updProStatus.pending, (state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(updProStatus.fulfilled, (state,action)=>{
            const updPro = action.payload;
            const idx = state.data.findIndex((val)=> val._id === updPro._id);
            // const idxNewD = state.newData.findIndex((val)=>val._id === updPro._id);
            if(idx !== -1){
                state.data[idx].status = updPro.status;
                // state.newData.unshift(newData[idxNewD]);
            }
            state.isLoading = false;
        });
        builder.addCase(updProStatus.rejected, (state,action)=>{
            state.isError = true;
        })
    }
})

export const {sortByStartD, sortByEndD, sortByPrio, sortByStatus, sortByLstMod, allDataProject} = projectSlice.actions;

export default projectSlice;






