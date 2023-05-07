import {useState, Fragment} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SettingsIcon from '@mui/icons-material/Settings';

import "./Navbar.css";

const Navbar=(props)=>{

    const navigate=useNavigate();

    const [options, setOptions]=useState(false);

    const logout=async()=>{
        const res=await axios.get(process.env.REACT_APP_SERVER_URL+"/logout", {
            withCredentials: true,
        });
        if(res.data.loggedOut){
            console.log(res.data.message);
            navigate("/");
        }
        else console.log(res.data.message);
    }

    return (
        <Fragment>
            <div className="navbar-body">
                <div className="navbar">
                    <span style={{fontWeight: "bold",}}>Notelify</span>
                    <span className={props.loggedIn?"show settings":"hide settings"} 
                        onClick={()=>{setOptions(prevState=>!prevState)}}
                    >
                        <SettingsIcon sx={{fontSize: "40px"}}/>
                    </span>
                </div>
                {options &&
                    <div className="options">
                        <div>
                            <div onClick={logout}>
                                logout    
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
        
    )   
}

export default Navbar;