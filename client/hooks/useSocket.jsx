"use client";
import { User_context } from "@/contexts/context";
import { useContext, useEffect, useRef } from "react";
import {io} from 'socket.io-client';


export const useSocket = ()=> {

    const {user} = useContext(User_context)

    const socket= useRef(null);

    useEffect(()=> {

        socket.current = io.connect('http://localhost:4400',{
            reconnection: true,
            reconnectionAttempts: 5,
            transports: ['websocket'],
            query : {
                user_id: user?._id
            }
        });


        return ()=> socket.current.disconnect()
    },[user]);


    return socket.current;

};

