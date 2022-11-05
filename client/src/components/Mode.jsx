import { useState, useEffect } from "react";

export default function useSwitch() {
    const [pmode, setpmode] = useState(localStorage.getItem('theme') === 'dark' ? true : false)

    useEffect(() => {
        if(pmode){
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
        else{
            document.body.classList.add('light')
            localStorage.setItem('theme', 'light')
        }
    }, [pmode]);
    const toggleMode = () => {
        setpmode(!pmode)
    };
    return[pmode, useSwitch]
}