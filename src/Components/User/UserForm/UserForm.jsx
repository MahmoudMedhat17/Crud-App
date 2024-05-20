import Input from "../../Input/Input";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAction, resetCreateUserState, updateUserAction } from "../UserSlice";
import { ListState } from "../../ListState";
import { useParams } from "react-router-dom";
import { toastSuccess, toastError } from "../../ToastConfig/ToastConfig";


const UserForm = ({ EditForm }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState(0);
    const { list, createUserState } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const mainData = { name, email, phoneNo };
    const params = useParams();

    const updatedDataId = useRef(params.id);


    useEffect(() => {
        if (EditForm && updatedDataId.current) {
            const updatedData = list.filter((list) => list.id === updatedDataId.current);

            if (updatedData.length) {
                setName(updatedData[0].name);
                setEmail(updatedData[0].email);
                setPhoneNo(updatedData[0].phoneNo);
            }
        }
    }, [EditForm]);

    useEffect(() => {
        if (createUserState === ListState.Success) {
            setName("");
            setEmail("");
            setPhoneNo("");
            dispatch(resetCreateUserState());
        }
    }, [createUserState]);


    const onSubmitForm = (e) => {
        e.preventDefault();
        if (name && email) {
            if (EditForm) {
                const updatedUserData = { id: updatedDataId.current, data: mainData };
                dispatch(updateUserAction(updatedUserData));
            } else {
                dispatch(createUserAction(mainData));
                toastSuccess("Created a new user!");
            }
        } else {
            toastError("Something went wrong!");
        }
    }

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <Input label="Name" type="name" value={name} onChangeFunc={(e) => setName(e.target.value)} />
                <Input label="Email" type="email" value={email} onChangeFunc={(e) => setEmail(e.target.value)} />
                <Input label="Phone No." type="text" value={phoneNo} onChangeFunc={(e) => setPhoneNo(e.target.value)} />
                <button style={{ position: "relative", left: "80%", cursor: "pointer", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "5px", paddingRight: "5px" }}>{EditForm ? "Update User" : "Create User"}</button>
            </form>
        </>
    )
}

export default UserForm;