


import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import './Home.css'

import { FaRegArrowAltCircleRight } from "react-icons/fa";

import supabase from '../../lib/supabase';

import { FaCheck } from "react-icons/fa";

export default function Home() {

    const navigate = useNavigate(); //Gives the navigation function so it can be used

    const [password, setPassword] = useState("")

    

    const savePassword = async () => {
        const code = crypto.randomUUID() //Creates random code
        
        const response = await supabase.from("passwords").insert({ secret: password, code}); //Inserts the password and code into the 'code' and 'secret' columns of the 'passwords' table

        const data = response.data

        const error = response.error
        
        console.log(data)
        console.log(error)

        navigate(`/link/${code}`) //Navigates to the new link, using the randomly generated code for the url
    }

    return (
        <div className="container">




            <div className="password-container">
                <div className='password-sub-container'>
                    <p  className="password-header">Password</p>

                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter the password" className="password-input" />
                </div>

                
                <button onClick={() => savePassword()} className="create-link-button">
                    <p>Create link</p>
                    <FaRegArrowAltCircleRight />
                    
                </button>
                
                
            </div>
            
            

        </div>
    )
}