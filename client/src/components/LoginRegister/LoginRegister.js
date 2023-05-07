import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "./Schema";

import Navbar from "../Navbar/Navbar"

import "./LoginRegister.css";

const LoginRegister=()=>{

    const navigate = useNavigate();
  
    useEffect(() => {
        const isAuthenticated = async () => {
        try {
            const res = await axios.get(
                process.env.REACT_APP_SERVER_URL+"/login",
            {
                withCredentials: true,
            }
            );
            if (res.data.noToken || res.data.tokenInvalid) {
            console.log(res.data.message);
            } else {
            navigate("/home");
            }
        } catch {
            console.log("Some error occurred!");
        }
        };
        isAuthenticated();
    }, [navigate]);

    const [login, setLogin]=useState(true);
    const [error, setError] = useState({
        wrongCombination: false,
        accountDoesNotExist: false,
        emailAlreadyInUse: false,
    });
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        } = useForm({
        resolver: yupResolver(schema),
    });

    const onSignUp = async (data) => {
        reset({
          password: "",
          confirmPassword: "",
        });
        try {
          const res = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/register",
            {
              email: data.email,
              password: data.password,
            },
            {
              withCredentials: true,
            }
          );
          if (res.data.emailAlreadyInUse) {
            setError({ ...error, emailAlreadyInUse: true });
          } else if (res.data.registrationSuccessful) {
            console.log(res.data.message);
            navigate("/home");
          } else {
            console.log(res.data.message);
          }
        } catch {
          console.log("Caught at register!");
        }
    };
    
    const onSignIn = async () => {
        console.log("clicked");
        setCredentials({ ...credentials, password: "" });
        try {
            const res = await axios.post(
                process.env.REACT_APP_SERVER_URL+"/login",
            {
                email: credentials.email,
                password: credentials.password,
            },
            {
                withCredentials: true,
            }
            );
            if (res.data.accountDoesNotExist) {
            setError({ ...error, accountDoesNotExist: true });
            console.log(res.data.message);
            } else if (res.data.wrongCombination) {
            setError({ ...error, wrongCombination: true });
            console.log(res.data.message);
            } else {
            console.log(res.data.message);
            navigate("/home");
            }
        } catch {
            console.log("Caught at login!");
        }
    };

    return (
        <div className="login-register-body">
            <Navbar />
            { login &&
                <div className="login-register-body-container">
                    <span>
                        Login
                    </span>
                    <input placeholder="Email"
                        type="email" 
                        value={credentials.email}
                        onChange={(e) => {
                          setError({
                            ...error,
                            wrongCombination: false,
                            accountDoesNotExist: false,
                          });
                          setCredentials({ ...credentials, email: e.target.value });
                        }}
                    />
                    <input placeholder="Password" 
                        type="password"
                        value={credentials.password}
                        onChange={(e) => {
                          setCredentials({ ...credentials, password: e.target.value });
                        }}
                    />
                    <div>forgot password</div>
                    {error.wrongCombination && (
                        <span className="error">Wrong email/password combination!</span>
                    )}
                    {error.accountDoesNotExist && (
                        <span className="error">Account does not exist!</span>
                    )}
                    <button
                        onClick={(e) => {
                        e.preventDefault();
                        onSignIn();
                    }}
                    >
                        Login
                    </button>
                    <div onClick={()=>{
                        setLogin(false);
                    }}>
                        create new account
                    </div>
                </div>
            }
            { !login &&
                <div className="login-register-body-container">
                    <span>
                        Register
                    </span>
                    <input
                        placeholder="email"
                        type="email"
                        {...register("email")}
                        onChange={(e) => {
                        setError({ ...error, emailAlreadyInUse: false });
                        }}
                    ></input>
                    <span className="error">{errors.email?.message}</span>
                    <input
                        placeholder="password"
                        type="password"
                        {...register("password")}
                    />
                    <span className="error">{errors.password?.message}</span>
                    <input
                        placeholder="confirm password"
                        type="password"
                        {...register("confirmPassword")}
                    />
                    <span className="error">{errors.confirmPassword?.message}</span>
                    {error.emailAlreadyInUse && (
                        <span className="error">Email already in use!</span>
                    )}
                    <button onClick={handleSubmit(onSignUp)}>
                        Register
                    </button>
                    <div className="" onClick={()=>{
                        setLogin(true);
                    }}>
                        Login
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginRegister;