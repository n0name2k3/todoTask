import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const job1s = [{
    name: "Demo todo 1",
    status: false
  }]

  const [todo, setTodo] = useState({ name: "", status: false });
  const [todos, setTodos] = useState(() => {
  const jobs = JSON.parse(localStorage.getItem('jobs'));
    return jobs || job1s;
  });
  const [status,setStatus] = useState("All")
  const [change,setChange] = useState(0)
  const input = useRef();
  var date = new Date();

  const addTodo = () => {
    if (todo != "" && todo.length < 24) {
      setTodos(prev => {
        const newJobs = [...prev, { name: todo, date: date.toLocaleDateString() + " " + date.toLocaleTimeString(), status: false }]
        input.current.value = "";
        setTodo("");
        const jsonTodos = JSON.stringify(newJobs);
        localStorage.setItem('jobs', jsonTodos);
        return newJobs
      });
    }
    else {
      alert("Empty task or task is so long!")
    }
  }

  const deleteTodo = (index,_index) => {
    setTodos(prev => {
      const Jobs = [...prev];
      Jobs.splice(index, 1);
      const newJobs = [...Jobs];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem('jobs', jsonJobs);
      return newJobs
    });
    
  }

  const handleTodo = (index) => {
    todos[index].status = !todos[index].status;
    const jsonJobs = JSON.stringify(todos);
    localStorage.setItem('jobs', jsonJobs);
  }

  function handleEdit(index) {
    const todoItems = document.querySelectorAll(".todo-item-checkbox")
    for (var i = 0; i< todoItems.length; i++) {
      todoItems[index].parentElement.classList.add("editing");
    }
    document.querySelectorAll('span[name="todo-item-name"]')[index].setAttribute("contentEditable", "true")
  }

  function handleEditConfirm(index) {
    const todoItems = document.querySelectorAll(".todo-item-checkbox")
    for (var i = 0; i< todoItems.length; i++) {
      todoItems[index].parentElement.classList.remove("editing");
    }
    document.querySelectorAll('span[name="todo-item-name"]')[index].setAttribute("contentEditable", "false")
    window.location.reload(false)
  }

  function handleEditTodoName(e, index) {
    const jobs = JSON.parse(localStorage.getItem('jobs'))
    if (jobs[index].name.length < 24) jobs[index].name = e
    else {
      alert("Task is so long 😏");
    }
    const jsonTodos = JSON.stringify(jobs);
    localStorage.setItem('jobs', jsonTodos);

  }

  function handleTodoName(){
    const jobs = JSON.parse(localStorage.getItem('jobs'))
    for (var job of jobs) {
      if (job.name.length >= 24) {
        job.name.substr(24, 100)
      }
      if (job.name.length <= 0) {
        setTimeout(3000)
        job.name = "Empty Task 😒"
        window.location.reload(false)
      }
      else{
        clearTimeout()
      }
    }
    const jsonTodos = JSON.stringify(jobs);
    localStorage.setItem('jobs', jsonTodos);
  }

  function checkTodo() {
    const jobs = JSON.parse(localStorage.getItem('jobs'))
    const jsonTodos = JSON.stringify(jobs);
    localStorage.setItem('jobs', jsonTodos);
    const todoItems = document.querySelectorAll(".todo-item-checkbox")
    for (var item of todoItems) {
      if (item.checked) {
        item.parentElement.classList.add("completed");
        document.querySelector('span[name="todo-item-name"]').setAttribute("contentEditable", "false")
      }
      else {
        item.parentElement.classList.remove("completed");
      }
    }
  }

    const todoStatuses = document.querySelectorAll("span")
    for(var todoStatus of todoStatuses){
        if(todoStatus.textContent == status) todoStatus.classList.add("selecting")
        else todoStatus.classList.remove("selecting")

}

  setInterval(checkTodo, 10);
  setInterval(handleTodoName,6000)

  return (
    <div className="App">
      <div className='todoStatus'>
      <span className="selecting" onClick={() => setStatus("All")}>All</span>
      <span onClick={() => setStatus("Completed")}>Completed</span>
      <span onClick={() => setStatus("In-Completed")}>In-Completed</span>
      </div>
      <input className="addTodoInp" ref={input} placeholder='Enter a todo' onChange={e => setTodo(e.target.value)}></input>
      <button onClick={addTodo} className="addTodoBtn">Add new task</button>
      <ul>
        {todos.map((item, index) => {
          if (item.status == true && status == "Completed") {
            return <li key={index} className="todo-item completed">
              <div className='checkbox'>
                <i class="fa-regular fa-circle"></i>
              </div>
              <input type={"checkbox"} onChange={() => setChange(change + 1)} className="todo-item-checkbox" onClick={() => handleTodo({ index }.index)} defaultChecked></input>
              <span name="todo-item-name" className='todo-item-name' onInput={e => handleEditTodoName(e.currentTarget.textContent, index)}>{item.name}</span><b> {item.date}</b>
              <div className='handleBtnContain'>
                <i className="fa-regular fa-circle-xmark handleBtn" onClick={() => deleteTodo({ index }.index)}></i>
              </div>
            </li>
          }
          else if (item.status == false && status == "In-Completed") 
          {
            return <li key={index} className="todo-item">
            <div className='checkbox'>
              <i class="fa-regular fa-circle"></i>
            </div>
            <input type={"checkbox"} onChange={() => setChange(change + 1)} className="todo-item-checkbox" onClick={() => handleTodo({ index }.index)}></input>
            <span name="todo-item-name" className='todo-item-name' onInput={e => handleEditTodoName(e.currentTarget.textContent, index)}>{item.name}</span><b> {item.date}</b>
            <div className='handleBtnContain'>
              <i className="fa-solid fa-check hanleBtn" onClick={() => handleEditConfirm({index}.index)}></i>
              <i className="fa-regular fa-pen-to-square handleBtn editBtn" onClick={() => handleEdit({ index }.index)}></i>
              <i className="fa-regular fa-circle-xmark handleBtn" onClick={() => deleteTodo({ index }.index)}></i>
            </div>
          </li>
          }
          else if (item.status == true && status == "In-Completed") {
            
          }
          else if(status == "All" && item.status == false)
          {
            return <li key={index} className="todo-item">
            <div className='checkbox'>
              <i class="fa-regular fa-circle"></i>
            </div>
            <input type={"checkbox"} onChange={() => setChange(change + 1)} className="todo-item-checkbox" onClick={() => handleTodo({ index }.index)}></input>
            <span name="todo-item-name" className='todo-item-name' onInput={e => handleEditTodoName(e.currentTarget.textContent, index)}>{item.name}</span><b> {item.date}</b>
            <div className='handleBtnContain'>
              <i className="fa-solid fa-check hanleBtn" onClick={() => handleEditConfirm({index}.index)}></i>
              <i className="fa-regular fa-pen-to-square handleBtn editBtn" onClick={() => handleEdit({ index }.index)}></i>
              <i className="fa-regular fa-circle-xmark handleBtn" onClick={() => deleteTodo({ index }.index)}></i>
            </div>
          </li>
          }
          else if(status == "All" && item.status == true)
          {
            return <li key={index} className="todo-item completed">
            <div className='checkbox'>
              <i class="fa-regular fa-circle"></i>
            </div>
            <input type={"checkbox"} onChange={() => setChange(change + 1)} className="todo-item-checkbox" onClick={() => handleTodo({ index }.index)} defaultChecked></input>
            <span name="todo-item-name" className='todo-item-name' onInput={e => handleEditTodoName(e.currentTarget.textContent, index)}>{item.name}</span><b> {item.date}</b>
            <div className='handleBtnContain'>
              <i className="fa-regular fa-circle-xmark handleBtn" onClick={() => deleteTodo({ index }.index)}></i>
            </div>
          </li>
          }
        }
        )}
      </ul>
    </div>
  );
}

export default App;
