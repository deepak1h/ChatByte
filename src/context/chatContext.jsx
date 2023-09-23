import { onAuthStateChanged } from "firebase/auth";
import {createContext, useContext, useEffect, useReducer, useState} from "react";
import { auth } from "../firebase";
import { AuthContext } from "./authContext";

export const ChatContext = createContext ();

export const ChatContextProvider = ({ children }) => {

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)

    const INITIAL_STATE ={
        chatId: "null",
        user: {}
    };

    const chatReducer = (state, action) =>{
        console.log("chatreducer")
        console.log("state",state)
        console.log( currentUser)
        switch(action.type){
            case "CHANGE_USER":

                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        };
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return(
        <ChatContext.Provider value={{data:state, dispatch }}>
            { children }
        </ChatContext.Provider>
    );
};