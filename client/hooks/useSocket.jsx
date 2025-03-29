"use client";
import { useEffect, useRef } from "react";
import {io} from 'socket.io-client';


export const useSocket = ()=> {

    const socket= useRef(null);

    useEffect(()=> {

        socket.current = io('http://localhost:4400',{
                reconnection: true,
                reconnectionAttempts: 5,
                transports: ['websocket'] // Force WebSocket transport
        });

    },[]);


    return socket.current;

};

