import React, { ChangeEvent, FC, useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles';


interface TodoProps {
    title: string
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "darkgray",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const Task = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
    justifyContent: "center"
  }));

const Todo: FC<TodoProps> = ({title}) => {
    const [deleteTasks, setDeleteTasks] = useState<Array<boolean>>([false, false, false])
    const [tasks, setTasks] = useState<Array<string>>(["todo1", "todo2", "todo3"])
    const [task, setTask] = useState<string>("")

    const addTask = () => {
        if (task !== "") {
            setTasks(tasks.concat([task]))
            setDeleteTasks(deleteTasks.concat([false]))
        }
    }

    const toggleDeleteTask = (index:number) => {
        setDeleteTasks(deleteTasks.map((v, i) => (i === index ? !v : v)))
    }

    const bulkRemoveTasks = () => {
        setTasks(tasks.filter((task, i) => !deleteTasks[i]))
        setDeleteTasks(deleteTasks.map((v) => false))
    }

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                minHeight="100vh"
            >
                <Stack spacing={2} sx={{width: "40%", marginTop: "10%"}}>
                    <div>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8} sx={{backgroundColor: "white"}}>
                                <TextField onChange={(typed) => setTask(typed.target.value)} value={task}  sx={{width: "100%"}} id="outlined-basic" label="Add Todo..." variant="outlined"/>
                            </Grid>
                            <Grid item xs={2} sx={{backgroundColor: "white"}}>
                                <Button onClick={() => addTask()} variant="contained" color="success" sx={{ height: "100%", width: "100%"}}>Add</Button>
                            </Grid>
                            <Grid item xs={2} sx={{backgroundColor: "white"}}>
                                <Button onClick={() => bulkRemoveTasks()} variant="contained" color="error" sx={{height: "100%", width: "100%"}}>Delete</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Item sx={{height: 300, overflow: "auto"}}>
                        {tasks.map((addedTask, index) => (
                            <Task key={"task"+index}>
                                <Grid container alignItems="center">
                                    <Grid item xs={11}>{addedTask}</Grid>
                                    <Grid item xs={1}>
                                        <Checkbox sx={{marginRight: "auto"}} color="error" checked={deleteTasks[index]} onChange={() => toggleDeleteTask(index)} />
                                    </Grid>
                                </Grid>
                            </Task>
                        ))}
                    </Item>
                </Stack>
            </Box>
        </div>
    )
}

export default Todo