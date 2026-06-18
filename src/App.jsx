import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Link from './pages/Link/Link'
import Password from './pages/Password/Password'

import './App.css'

export default function App() {
    return (
        <BrowserRouter>
        {/* Turns on react routing */} 
            <Routes> {/* Container for all routes */}
                <Route path="/" element={< Home />} />  {/* Defines one page */}
                <Route path="/link/:code" element={<Link />} />  {/* Code is a placeholder used in params*/}
                <Route path="/p/:code" element={<Password />} />
            </Routes>
        </BrowserRouter>
    )
}