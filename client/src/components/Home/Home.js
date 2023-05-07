import {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar/Navbar";
import Editor from "../Editor/Editor";

import "./Home.css";

const Home=()=>{

    const navigate=useNavigate();

    const [loggedIn, setLoggedIn]=useState(false);
    const [editor, setEditor]=useState(false);
    const [notes, setNotes]=useState([]);
    const [noteId, setNoteId]=useState();
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const [userId, setUserId]=useState();

    useEffect(() => {
        const isAuthenticated = async () => {
          try {
            const res = await axios.get(
              process.env.REACT_APP_SERVER_URL+"/home",
              {
                withCredentials: true,
              }
            );
            if (res.data.noToken || res.data.tokenInvalid) {
              console.log(res.data.message);
              navigate("/");
            } else {
                setLoggedIn(prevState=>!prevState);
              setUserId(res.data.userId);
              setNotes(res.data.result);
            }
          } catch {
            console.log("Some error occurred!");
          }
        };
        isAuthenticated();
    }, [navigate]);

    const close=()=>{
        
        setEditor(false);
    }

    return (
        <div className="home">
            <Navbar loggedIn={loggedIn}/>
            <div className="search">
                {/* search bar here! */}
            </div>
            <div className="home-body">
                <div className="notes-body">
                    { notes.length!==0?
                        notes.map((note, index)=>{
                            return (
                                <div key={index} 
                                    onClick={()=>{
                                            setEditor(prevState=>!prevState);
                                            setNoteId(note.noteId)
                                            setTitle(note.noteTitle);
                                            setContent(note.noteContent);
                                        }}>
                                    <span className="title">{note.noteTitle.substr(0, 29)+"..."}</span>
                                    <span className="content">{note.noteContent.substr(0, 50)+"..."}</span>
                                    <div>
                                        {note.createdOn.slice(0, 10).replace(/-/g, '/')}{' '}{note.createdOn.slice(11, 19)}
                                    </div>
                                </div>
                            )
                        }):
                        <div onClick={()=>{
                            setEditor(prevState=>!prevState);
                        }}>
                            <span className="title">Add your first title...</span>
                            <span className="content">Add your first note...</span>
                            <div>
                                --/--/-- --:--:--
                            </div>
                        </div>
                    }
                </div>
                {
                    editor && <Editor noteId={noteId} title={title} content={content} userId={userId} close={close} edit={(title==="" && content==="")?true:false}/>
                }
            </div>
            <div className={editor?"hide":"add"} onClick={()=>{
                setTitle("");
                setContent("");
                setEditor(prevState=>!prevState);
            }}>
                +
            </div>
        </div>
    )
};

export default Home;