function TodoTable(props) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Date</th>
                </tr>
                {
                    props.todos.map((todo, index) =>
                        <tr key={index}>
                            <td> {todo.description} </td>
                            <td> {todo.duedate} </td>
                             <td>{todo.priority}</td>
                            <td><button onClick={() => props.handleDelete(index)}>Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    )
}

export default TodoTable;