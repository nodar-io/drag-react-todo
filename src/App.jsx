import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );

  const [todo, setTodo] = useState("");
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodoList([
        ...todoList,
        {
          id: uuidv4(),
          color: randomColor({
            luminosity: "light",
          }),
          name: todo,
          position: {
            x: -400 * (todoList.length % 2 === 0 ? 1 : -1),
            y: 350 - todoList.length * 35,
          },
        },
      ]);
      setTodo("");
    }
  };
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);
  const deleteTodo = id => {
    setTodoList(todoList.filter(item => id !== item.id));
  };

  const updatePos = (ui, index) => {
    const newArr = [...todoList];
    console.log(newArr);
    console.log(newArr[index]);
    newArr[index].position = { x: ui.x, y: ui.y };
    setTodoList(newArr);
  };
  const updateText = (text,index)=>{
   const newArr = [...todoList]
   newArr[index].name = text
   setTodoList(newArr)
  }
  return (
    <div className="wrapper">
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          onChange={e => setTodo(e.target.value)}
          className="input"
          type="text"
          value={todo}
          placeholder="Введите задачу"
          name="text"
          autoComplete="off"
          onKeyPress={event => {
            if (event.code === 13) {
              addTodo();
            }
          }}
        />
        <button onClick={() => addTodo()} className="btn">
          ENTER
        </button>
      </form>
      {todoList?.map((elem, index) => (
        <Draggable
          onStop={(event, ui) => updatePos(ui, index)}
          defaultPosition={elem.position}
          key={elem.id}
          
        >
          <div
            className="todo"
            style={{ backgroundColor: elem.color}}
          >
            <textarea
            onChange={(e)=>updateText(e.target.value,index)}
              className="text-slate-950"
              type="text"
              style={{ backgroundColor: elem.color,resize:'none' }}
              value={elem.name}
            />

            <button onClick={() => deleteTodo(elem.id)} className="delete">
              X
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default App;
