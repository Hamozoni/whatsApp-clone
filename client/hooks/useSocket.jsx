"use client";
import { useState, useEffect } from "react";
import {io} from 'socket.io-client';


export const useSocket = ()=> {

    const [socket,set_socket] = useState(null);

    useEffect(()=> {

        const new_socket = io(process.env.NEXT_PUBLIC_API_URL);

        set_socket(new_socket)

        return ()=> new_socket.disconnect()
        // if()

    },[]);


    return socket;

};

