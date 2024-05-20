import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getUserFromTheApI, createUserToTheAPI, deleteUserFromTheAPI, updateUserToTheAPI} from "../ApiMethods/ApiMethods";
import { ListState } from "../ListState";
import { toastSuccess, toastError} from "../ToastConfig/ToastConfig";

const initialState ={
    list:[],
    listState: ListState.Ideal,
    createUserState: ListState.Ideal,
    updateUserState: ListState.Ideal
};


//AsyncThunk Action that uses the get method from Apimethods to get the user data from the API
export const getUserAction = createAsyncThunk("users/getUserAction", async()=>{
    const res = await getUserFromTheApI();
    return res.data;
});

//AsyncThunk Action to create a new user to the local API
export const createUserAction = createAsyncThunk("users/createUserAction",async(data)=>{
    const res = await createUserToTheAPI(data);
    return res.data;
});

//AsyncThunk Action that deletes a user from the API
export const deleteUserAction = createAsyncThunk("users/deleteUserAction", async(id)=>{
    await deleteUserFromTheAPI(id);
    return id;
});

//AsyncThunk Action that updates the user data in the API
export const updateUserAction = createAsyncThunk("users/updateUserAction", async({id,data})=>{
    const res = await updateUserToTheAPI(id, data);
    return res.data;
});

export const UserSlice = createSlice({
    name:"users",
    initialState:initialState,
    reducers:{
        resetCreateUserState:(state)=>{
            state.createUserState = ListState.Ideal;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserAction.pending,(state)=>{
            state.listState = ListState.Loading;
        });
        builder.addCase(getUserAction.fulfilled,(state, action)=>{
            state.listState = ListState.Ideal;
            state.list = action.payload;
        });
        builder.addCase(getUserAction.rejected,(state)=>{
            state.listState = ListState.Error;
            toastError("Something went wrong!");
        });
        builder.addCase(createUserAction.pending,(state)=>{
            state.createUserState = ListState.Loading;
        });
        builder.addCase(createUserAction.fulfilled,(state)=>{
            state.createUserState = ListState.Success;
        });
        builder.addCase(createUserAction.rejected,(state)=>{
            state.createUserState = ListState.Error;
            toastError("Failed to create a user!");
        });
        builder.addCase(deleteUserAction.fulfilled,(state, action)=>{
            const filteredList = state.list.filter((list)=> list.id !== action.payload);
            state.list = filteredList;
            toastSuccess("User deleted!");
        });
        builder.addCase(updateUserAction.pending, (state)=>{
            state.updateUserState = ListState.Loading;
        });
        builder.addCase(updateUserAction.fulfilled,(state)=>{
            state.updateUserState = ListState.Ideal;
            toastSuccess("User is updated!");
        });
        builder.addCase(updateUserAction.rejected,(state)=>{
            state.updateUserState = ListState.Error;
            toastError("Failed to update user data!");
        });
    }
});

export const {resetCreateUserState} = UserSlice.actions;

export default UserSlice.reducer;