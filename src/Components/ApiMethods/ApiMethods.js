import axios from "axios";
import {ApiConfig} from "../../Service/ApiConfig";

//Function to get users data from the API
export const getUserFromTheApI = async()=>{
    const res = await axios.get(ApiConfig.user);
    return res;
}

//Function to create users to the API
export const createUserToTheAPI = async(data)=>{
    const res = await axios.post(ApiConfig.user, data);
    return res;
}

//Function to delete a user from the API
export const deleteUserFromTheAPI = async(id)=>{
    const DELETE_URL = `${ApiConfig.user}/${id}`;
    return await axios.delete(DELETE_URL, id);
}

//Function to edit the user value in the API
export const updateUserToTheAPI = async(id,data)=>{
    const UPDATE_URL = `${ApiConfig.user}/${id}`;
    return await axios.put(UPDATE_URL, data);
}