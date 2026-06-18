import { useParams } from "react-router-dom";
import { useState, useEffect} from 'react'

import supabase from '../../lib/supabase'

import './Password.css'

export default function Password() {

    const [secret, setSecret] = useState("")
    
    const { code } = useParams()

    useEffect(() => {
        const fetchSecret = async () => {
            const response = await supabase
            .from("passwords")
            .select("*")
            .eq("code", code) //Only give row where code matches the value
            .maybeSingle()

            console.log("The code is", code)

            const data = response.data
            const error = response.error

            if (error) {
                console.log(error.message)
                return;
            }

            console.log("Here is the data",data)

            if (!data) {
                console.log("No data found");
                return;
            }

            setSecret(data.secret);

            await supabase.from("passwords").delete().eq("code", code)

            }   

            fetchSecret()
    }, [])

    return (
        <div className="container">

            {secret ? (
                <div>
                    <p>The password is...</p>
                    <h1>{secret}</h1>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    )
}