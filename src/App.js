import { useEffect, useState } from "react"; //importing useState and useEffect  
const api_base = "https://zesty-kitten-be32b3.netlify.app"; //assing localhost a constant

//useState to change value of data
function App() {
  const [todos, setTodos] = useState([]); //todos assigned empty array and setTodos changing its value
  const [popupActive, setPopupActive] = useState(false); //popupActive assigned value false and setPopupActive changing its value
  const [newTodo, setNewTodo] = useState("");//newTodo is assigned value of empty string and setNewTodo is used to change its value

  useEffect(() => {
    GetTodos(); //calling GetTodos function which gets data
  }, []);
  //The useEffect Hook allows you to perform side effects in your components.Some examples of side effects are: fetching data, directly updating the DOM, and timers.

  //makking function GetTodos which fetch data from our api 
  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json()) //????
      .then((data) => setTodos(data)) //????
      .catch((err) => console.error("Error: ", err));//displays error in case error in fetching data
  };
  
  //completeTodo function to fetch complete data based on id
  const completeTodo = async (id) => {
    const data = await fetch(api_base + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };
  //addtodo to add data by call
  const addTodo = async () => {
    const data = await fetch(api_base + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  return (
    <div className="App">
      <h1>Welcome, Gamak</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.complete ? " is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
