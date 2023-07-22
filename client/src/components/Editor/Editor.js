import { useState } from "react";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import Loader from "../Loader/Loader";

import "./Editor.css";

const Editor = (props) => {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [edit, setEdit] = useState(props.edit);
  const [loading, setLoading] = useState(false);

  const saveNote = async (noteTitle, noteContent) => {
    setLoading(true);
    console.log(noteTitle, noteContent);
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/home",
      {
        id: props.noteId,
        title: noteTitle,
        content: noteContent,
        userId: props.userId,
      },
      {
        withCredentials: true,
      }
    );
    if (res.data.noteSaved) {
      console.log(res.data.message);
      window.location.reload();
    } else{
      console.log(res.data.message);
      setLoading(false);
    }
  };

  const deleteNote = async () => {
    if (props.title === "" && props.content === "") {
      props.close();
    } else {
      setLoading(true);
      const res = await axios.delete(
        process.env.REACT_APP_SERVER_URL + "/delete",
        {
          withCredentials: true,
          data: { id: props.noteId },
        }
      );
      if (res.data.noteDeleted) {
        console.log(res.data.message);
        window.location.reload();
      } else{
          console.log(res.data.message);
          setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <Loader/>}
      <div className="editor-background">
        <div className="editor">
          <div className="actions">
            <div onClick={deleteNote}>
              <DeleteIcon sx={{ background: "grey", fontSize: "30px" }} />
            </div>
            <div
              style={{ display: edit ? "none" : "flex" }}
              onClick={() => {
                setEdit(true);
              }}
            >
              <EditIcon sx={{ background: "green", fontSize: "30px" }} />
            </div>
            <div className="close" onClick={props.close}>
              <CloseIcon sx={{ background: "red", fontSize: "30px" }} />
            </div>
          </div>
          <span>Title length: {title.length}/50</span>
          <textarea
            className="input-title"
            maxLength={50}
            placeholder="Title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            readOnly={!edit}
          ></textarea>
          <span>Content length: {content.length}/10000</span>
          <textarea
            className="input-content"
            maxLength={10000}
            placeholder="Content..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            readOnly={!edit}
          ></textarea>
          <div>
            <button className="cancel" onClick={props.close}>
              cancel
            </button>
            <button
              className="save"
              onClick={
                title === props.title && content === props.content
                  ? props.close
                  : () => {
                      saveNote(title, content);
                    }
              }
            >
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
