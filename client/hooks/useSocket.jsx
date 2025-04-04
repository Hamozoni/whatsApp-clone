"use client";
import { User_context } from "@/contexts/context";
import { useContext, useEffect, useRef } from "react";
import {io} from 'socket.io-client';


export const useSocket = ()=> {

    const {user} = useContext(User_context)

    const socket= useRef(null);

    useEffect(()=> {

        socket.current = io('http://localhost:4400',{
            reconnection: true,
            reconnectionAttempts: 5,
            transports: ['websocket'] // Force WebSocket transport
        });

        socket.current.on('connect',()=> {
            socket.current.emit('register_user',user?._id)
        })

        return ()=> {
            socket.current.off('connect')
            socket.current.disconnect()
        };

    },[])


    return socket.current;

};

