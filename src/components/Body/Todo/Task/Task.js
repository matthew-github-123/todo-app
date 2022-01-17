import React from 'react'
import { useState } from 'react'
import './Task.css'

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

import { doc, setDoc, deleteDoc, getDocs, collection } from '@firebase/firestore';
import db from './../../../../firebase';

import { useStateValue } from './../../../../StateProvider'

function Task(props) {

    const [{ user }, dispatch] = useStateValue();

    // const [todos, setTodos] = useState([])

    const [openRead, setOpenRead] = useState(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [input, setInput] = useState("");
    const [input_amount, setInputAmount] = useState("");

    console.log("message");
    console.log(props.message);

    // async function updateSubCollections() { 
    //     const subcollection = await getDocs(collection(db, 'users', user.uid, 'todo'));
    //     setTodos(subcollection.docs.map(doc => ({...doc.data(), id: doc.id})))    
    //     }

    const handleReadTask = () => {
        setOpenRead(true);
      };

    const handleReadTaskClose = () => {
        setOpenRead(false);
      };


    const handleUpdateTask = () => {
        setOpenUpdate(true);
      };

    const performUpdateTask = async () => {
        setOpenUpdate(false);
        
        const docRef = doc(db, user.uid, props.id);
        const payload = {message: input, amount: input_amount};
        await setDoc(docRef, payload);
      };

    const handleUpdateTaskClose = () => {
        setOpenUpdate(false);
      };


    const handleDeleteTask = async () => {
        const docRef = doc(db, user.uid, props.id);
        await deleteDoc(docRef);
      }

    return (
        <div className="task">

            <div className="task__left">
                <div>{props.message}</div>
                <div>{props.amount}</div>
            </div>
            

            <div className="task__right">
                <Button variant="contained"
                        color="primary"
                        endIcon={<PreviewIcon>send</PreviewIcon>}
                        onClick={handleReadTask}> 
                </Button>
            
                <Button variant="contained"
                        color="primary"
                        endIcon={<EditIcon>send</EditIcon>}
                        onClick={handleUpdateTask}> 
                </Button>
                
                <Button  variant="contained"
                        color="primary"
                        endIcon={<DeleteIcon>send</DeleteIcon>}
                        onClick={handleDeleteTask}> 
                </Button>
            </div>

                <Dialog open={openRead} onClose={handleReadTaskClose}>       
                    <DialogTitle>Read</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p>Message: {props.message}</p>
                                <p>Amount: {props.amount}</p>
                                <p>ID: {props.id}</p>
                            </DialogContentText>
                        </DialogContent>

                    <DialogActions>
                        <Button onClick={handleReadTaskClose}> Close</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openUpdate} onClose={handleUpdateTaskClose}>       
                    <DialogTitle>Update</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p>Update the required field</p>
                                <p>ID: {props.id}</p>
                            </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                defaultValue={props.message}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={Event => setInput(Event.target.value)}/>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                defaultValue={props.amount}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={Event => setInputAmount(Event.target.value)}/>
                        </DialogContent>

                    <DialogActions>
                        <Button onClick={handleUpdateTaskClose}>Close</Button>
                        <Button onClick={performUpdateTask}>Update</Button>
                    </DialogActions>
                </Dialog>

        </div>
    )
}

export default Task
