import "./UserList.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction, deleteUserAction } from "../UserSlice";
import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import { ListState } from "../../ListState";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const { list, listState } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserAction());
    }, []);

    return (
        <>
            <table>
                {
                    list.length ? (
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Action</th>
                        </tr>
                    )
                        :
                        " "
                }
                {
                    listState === ListState.Loading && <tbody><h1>Loading...</h1></tbody>
                }
                {
                    listState === ListState.Error && <tbody><h1>Something is wrong!</h1></tbody>
                }
                {
                    listState === ListState.Ideal && (
                        list.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNo}</td>
                                <td>
                                    <button onClick={() => setUserData(user)}>View</button>
                                    <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
                                    <button onClick={() => dispatch(deleteUserAction(user.id))}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )
                }
                {
                    userData && (
                        <Modal title="User Details" onClose={() => setUserData("")}>
                            <div>
                                <label style={{ fontSize: "20px", fontWeight: "bold" }} htmlFor="Name">Name:{" "}</label>
                                <span style={{ fontSize: "15px", fontWeight: "600" }}>{userData.name}</span>
                            </div>
                            <div>
                                <label style={{ fontSize: "20px", fontWeight: "bold" }} htmlFor="Email">Email:{" "}</label>
                                <span style={{ fontSize: "15px", fontWeight: "600" }}>{userData.email}</span>
                            </div>
                            <div>
                                <label style={{ fontSize: "20px", fontWeight: "bold" }} htmlFor="Phone number">Phone No:{" "}</label>
                                <span style={{ fontSize: "15px", fontWeight: "600" }}>{userData.phoneNo}</span>
                            </div>
                        </Modal>
                    )
                }
            </table>
        </>
    )
}

export default UserList;