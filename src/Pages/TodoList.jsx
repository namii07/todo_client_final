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

import React from 'react';
import { useState } from 'react';
import './Todo.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const TodoList = () => {
  const [todo, setTodo] = useState('')
  const [status, setStatus] = useState(false)

  const [todoArray, setTodoArray] = useState([]);

  // console.log(todoArray);


  //create
  const postTodo = async () => {
    try {
      await axios.post("https://todo-server-ec2-czcf.onrender.com/csbs/addtodo", { todo })
      setTodo('')
      setStatus(true)
      getTodo()
      setTimeout(() => setStatus(false), 3000);
    } catch (err) {
      console.error(err);
    }
  }

  //read
  const getTodo = async () => {
    await axios.get("https://todo-server-ec2-czcf.onrender.com/csbs/gettodo")
      .then((response) => {
        setTodoArray(response.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className='todoList'>
      <Typography variant="h1" gutterBottom>
        Todo
      </Typography>
      <Box sx={{ width: 500, maxWidth: '100%' }} className='box'>
        <TextField fullWidth label="Enter Todo" id="todo-input " value={todo} onChange={(e) => setTodo(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" className='but' onClick={postTodo}>Add Todo</Button>
        </Stack>
      </Box>

      {
        status && (
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "9999"
          }}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Todo has been posted
            </Alert>
          </div>
        )
      }
      <div>
        <ul>
          {
            todoArray.map((res) => (
              <li key={res._id}><h3>{res.todo}</h3></li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default TodoList;