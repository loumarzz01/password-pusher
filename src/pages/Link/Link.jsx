import {useState} from 'react'

import { useParams } from "react-router-dom";

import './Link.css'

import { FaRegCopy } from "react-icons/fa6";

import { FaCheck } from "react-icons/fa";

export default function Link() {

    const [clicked, setClicked] = useState(false)
    const { code } = useParams(); 

    const handleCopy = () => {
        navigator.clipboard .writeText(`https://passwordpusher.vercel.app/p/${code}`)
    }

    return (
        <div className="container">
            <h1>Your link is ready!</h1>



            <div className="link-container">
                <p>{`https://passwordpusher.vercel.app/p/${code}`}</p>

                <button className="copy-button">

                    <FaRegCopy onClick={handleCopy} className="copy-icon"/>

                    
                </button>
            </div>
        </div>
    )
}