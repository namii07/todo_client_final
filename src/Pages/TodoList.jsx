// import React from 'react'
// import "../css/Todo.css"
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';


// const TodoList = () => {
//     //todo operation
//     const [todo, setTodo] = useState('')
//     const [todoArray, setTodoArray] = useState([])
//     const [status, setStatus] = useState(false)
//     console.log(todoArray)
//     //create post 
//     const postTodo = async () => {
//         try {
//             await axios.post("http://localhost:5000/csbs/addtodo", { todo })
//             /*.then((response)=>
//             {
//                 console.log(response.data);
//             }
//             )*/

//             setTodo('')
//             setStatus(true)
//             getTodo()
//             setTimeout(() => setStatus(false), 3000);
//         }
//         catch (err) {
//             console.error(err);
//         }
//     }
//     //read get
//     const getTodo = async () => {
//         await axios.get('http://localhost:5000/csbs/gettodo')
//             .then((response) => {
//                 setTodoArray(response.data)
//             })
//             .catch((err) => {
//                 console.error(err);
//             })
//     }

//     return (

//         <div className='todolist'>
//             <h1>Todo</h1>
//             <Box sx={{ width: 500, maxWidth: '100%' }} className='box'>
//                 <TextField fullWidth label="fullWidth" id="fullWidth" value={todo} onChange={(e) => setTodo(e.target.value)} />
//                 <Button variant="contained" className='button' onClick={postTodo}>Add to Do</Button>

//             </Box>
//             {
//                 status && (
//                     <div style={{
//                         position: "fixed",
//                         top: "20px",
//                         right: "20px",
//                         zIndex: 9999
//                     }}>
//                         <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//                             todo was successful.
//                         </Alert>
//                     </div>
//                 )
//             }
//             <div>
//         <ul>
//             {
//                 todoArray.map((res)=>(
//                    <li key={res._id}><h3>{res.todo}</h3></li>
//                 ))
//             }
//         </ul>
//     </div>

//         </div>
//     )
// }

// export default TodoList

// import React from 'react';
// import { useState } from 'react';
// import './Todo.css';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';

// const TodoList = () => {
//   const [todo, setTodo] = useState('')
//   const [status, setStatus] = useState(false)

//   const [todoArray, setTodoArray] = useState([]);

//   // console.log(todoArray);


//   //create
//   const postTodo = async () => {
//     try {
//       await axios.post("https://todo-server-ec2-czcf.onrender.com/csbs/addtodo", { todo })
//       setTodo('')
//       setStatus(true)
//       getTodo()
//       setTimeout(() => setStatus(false), 3000);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   //read
//   const getTodo = async () => {
//     await axios.get("https://todo-server-ec2-czcf.onrender.com/csbs/gettodo")
//       .then((response) => {
//         setTodoArray(response.data)
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//   }

//   return (
//     <div className='todoList'>
//       <Typography variant="h1" gutterBottom>
//         Todo
//       </Typography>
//       <Box sx={{ width: 500, maxWidth: '100%' }} className='box'>
//         <TextField fullWidth label="Enter Todo" id="todo-input " value={todo} onChange={(e) => setTodo(e.target.value)} />
//         <Stack direction="row" spacing={2}>
//           <Button variant="contained" className='but' onClick={postTodo}>Add Todo</Button>
//         </Stack>
//       </Box>

//       {
//         status && (
//           <div style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             zIndex: "9999"
//           }}>
//             <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//               Todo has been posted
//             </Alert>
//           </div>
//         )
//       }
//       <div>
//         <ul>
//           {
//             todoArray.map((res) => (
//               <li key={res._id}><h3>{res.todo}</h3></li>
//             ))
//           }
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TodoList;

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./css/Todo.css";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Alert from '@mui/material/Alert'; 
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';    

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [status, setStatus] = useState(false);
    const [todoArray, setTodoArray] = useState([]);

    useEffect(() => {
        getTodo();
    }, []);

    const postTodo = async () => {
        if(!todo.trim()) return;
        try {
            await axios.post("https://todo-server-ec2-3qiz.onrender.com/csbs/addtodo", { todo });
            setTodo('');
            setStatus(true);
            getTodo();
            setTimeout(() => setStatus(false), 3000);
        } catch (err) {
            console.error(err);
        }
    }

    const getTodo = async () => {
        try {
            const response = await axios.get("https://todo-server-ec2-3qiz.onrender.com/csbs/gettodo");
            setTodoArray(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`https://todo-server-ec2-3qiz.onrender.com/csbs/deletetodo/${id}`);
            getTodo(); 
        } catch(err) {
            console.error(err);
        }
    }

    const updateTodo = async (id, data) => {
        try {
            await axios.put(`https://todo-server-ec2-3qiz.onrender.com/csbs/updatetodo/${id}`, { todo: data });
            getTodo();
        } catch (err) {
            console.error(err);
        }
    }

    const newTodo = (id, currentTodo) => {
        const newData = prompt("Enter new Todo", currentTodo);
        if (newData && newData.trim() !== "") {
            updateTodo(id, newData);
        }
    }

    return (
        <div className="todolist">
            <Typography className='head' variant="h2" gutterBottom>
                Todo List
            </Typography>
            <div className="box">
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <TextField
                        fullWidth
                        label="Enter your task"
                        id="fullWidth"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)} 
                    />
                </Box>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        className="button"                                            
                        onClick={postTodo} >
                        ADD TODO LIST
                    </Button>
                </Stack>
            </div>

            {status && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: "9999",
                }}>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Todo has been Posted.
                    </Alert>
                </div>
            )}

            <div>
                <ul className='list-item'>
                    {todoArray.map((res) => (
                        <li className='list' key={res._id}>
                            <h3>{res.todo}</h3>
                            <div style={{display: 'flex', gap: '5px'}}>
                                <IconButton aria-label="edit" size="small" onClick={() => newTodo(res._id, res.todo)}>
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => deleteTodo(res._id)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList;