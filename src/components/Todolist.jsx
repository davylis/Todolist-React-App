import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Todolist() {
  const [todo, setTodo] = useState({description: "", duedate: "", priority: ""});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const columns = [
    { field: "description", filter: true, editable: true, floatingFilter: true },
    { field: "priority", sortable: true, filter: true, floatingFilter: true, 
      cellStyle: (params) => params.value === "High" ? { color: "red" } : { color: "black" },
    },
    { field: "duedate", sortable: true, filter: true, floatingFilter: true, headerName: "Due date",
      valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY") }
  ];

  const handleAdd = () => {
    console.log(todo);
    if (!todo.description || !todo.priority || !todo.duedate) {
      alert("Type something first");
    } else {
      //adding todo to the beginning and not replacing state
      setTodos((todos) => [todo, ...todos]);
      setTodo({ description: "", duedate: "", priority: "" });
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (_, index) => gridRef.current.getSelectedNodes()[0].id != index
        )
      );
    } else {
      alert("Select a row first!");
    }
  };
  //ask about color
  const handleDateChange = (date) => {
    setTodo({ ...todo, duedate: dayjs(date).toISOString().substring(0, 10) });
  };

  return (
    <>
      <h3></h3>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <TextField
          variant="standard"
          label="Description"
          value={todo.description}
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
        />
        <TextField
          variant="standard"
          label="Priority"
          value={todo.priority}
          onChange={(event) =>
            setTodo({ ...todo, priority: event.target.value })
          }
        />
        <TextField
          variant="standard"
          label="date"
          value={todo.duedate}
          onChange={(event) =>
            setTodo({ ...todo, duedate: event.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            format = "DD.MM.YYYY"
            value={todo.duedate ? dayjs(todo.duedate) : null}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={handleAdd}>
          Add Todo
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
      <div
        className="ag-theme-material" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columns}
          rowSelection="single"
          animateRows={true}
        />
      </div>
    </>
  );
}

export default Todolist;
