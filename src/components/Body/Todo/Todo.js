import React from 'react'
import { useEffect, useState } from 'react'
import './Todo.css'

import db from './../../../firebase';
import { onSnapshot, collection, addDoc, doc } from '@firebase/firestore';

import { Button, FormControl, TextField } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

import Task from './Task/Task';

import { useStateValue } from './../../../StateProvider'

function Todo() {

    const [{ user }, dispatch] = useStateValue();

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState("")
    const [input_amount, setInputAmount] = useState("")

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'message', headerName: 'Message', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 }
      ];

    const rows = [{ id: '16fdsg778687', message: 'clean fridge', amount: 23}];

    console.log("list output:");
    console.log(todos);

    useEffect(
        () => 
            onSnapshot(collection(db, user.uid), (snapshot) => {
              console.log("snapshot");
              console.log(snapshot);

              console.log("snapshot data");
              console.log(snapshot.docs);

              snapshot.docs.map(doc => { console.log(doc.id) });

              //returns an array
              const snapshotFilter = (snapshot.docs.filter(
                  (doc) => {
                    return (doc.id != "account details");
                  }
              ));

               console.log("snapshot filter");
               console.log(snapshotFilter);

               const snapshotMap = (snapshotFilter.map(doc => ({...doc.data(), id: doc.id})));

               console.log("snapshot map");
               console.log(snapshotMap);

               setTodos(snapshotMap);
            }),
        []
      );

      useEffect(
        () => {
            todos.forEach(object => {
              console.log("row addition");
              console.log(object);
              console.log("rows");
              console.log(rows);
              return(rows.push(object))
            });
        },
        [todos]
      );   

    const handleCreateTask = async (e) => {
        e.preventDefault();

        const collectionRef = collection(db, user.uid);
        const payload = { message: input, amount: input_amount};
        const docRef = await addDoc(collectionRef, payload);

        console.log("The new id is: " + docRef.id);

        setInput("");
    }

    return (
        <div>
            <div className="todo__top">
            <form>
            <FormControl>
                <TextField label="Write a Task" variant="outlined" value={input} onChange={Event => setInput(Event.target.value)}></TextField>
                <TextField label="Amount" variant="outlined" value={input_amount} onChange={Event => setInputAmount(Event.target.value)}></TextField>
            </FormControl>

            <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={handleCreateTask}>
                Add Task
            </Button>
            </form>

            </div>

            <div className="todo__bottom">
                <div>
                    { <ul>
                        {todos.map(todos => (
                        <li key={todos.id}> <Task id={todos.id} message = {todos.message} amount = {todos.amount}/></li>
                        ))}
                      </ul> }
                </div>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    )
}

export default Todo
