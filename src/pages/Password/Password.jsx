import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import supabase from '../../lib/supabase';
import './Password.css';

export default function Password() {
    const [secret, setSecret] = useState("");
    const [notFound, setNotFound] = useState(false); // Add a state to track missing data
    
    const { code } = useParams();

    useEffect(() => {
        const fetchSecret = async () => {
            const response = await supabase
                .from("passwords")
                .select("*")
                .eq("code", code)
                .maybeSingle();

            const data = response.data;
            const error = response.error;

            if (error) {
                console.log(error.message);
                setNotFound(true);
                return;
            }

            // If the password was already deleted or doesn't exist
            if (!data) {
                console.log("No data found");
                setNotFound(true); // Trigger the not found UI
                return;
            }

            setSecret(data.secret);

            // Delete the password so it can only be viewed once
            await supabase.from("passwords").delete().eq("code", code);
        };   

        fetchSecret();
    }, [code]);

    return (
        <div className="container">

            {notFound ? (
                <div>
                    <h2>Link Expired</h2>
                    <p>This password has already been viewed and destroyed.</p>
                </div>
            ) : secret ? (
                <div>
                    <p>The password is...</p>
                    <h1>{secret}</h1>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}