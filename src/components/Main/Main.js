import { Component } from "react";
import { FaPlus, FaEdit, FaWindowClose } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: "",
      tasks: [],
      index: -1,
    };
  }

  componentDidMount = (prevProps, prevState) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) return;
    this.setState({ tasks });
  };

  componentDidUpdate = (_, prevState) => {
    const { tasks } = this.state;
    if (tasks === prevState.tasks) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  handleInput = (event) => {
    this.setState({ newTask: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newTask, tasks, index } = this.state;
    if (newTask === "") return;
    if (tasks.indexOf(newTask) !== -1) return;
    if (index === -1) {
      this.setState({
        newTask: "",
        tasks: [...tasks, newTask.trim()],
      });
    } else {
      this.setState({
        tasks: tasks.map((task, i) => (i === index ? newTask.trim() : task)),
        index: -1,
      });
    }
  };

  handleDelete = (_, index) => {
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter((_, i) => i !== index), index });
  };

  handleEdit = (_, index) => {
    const { tasks } = this.state;
    this.setState({
      newTask: tasks.find((_, i) => i === index),
      index,
    });
  };

  render = () => {
    const { newTask, tasks } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <form onSubmit={this.handleSubmit} className="form" action="#">
          <input
            onChange={this.handleInput}
            type="text"
            placeholder="Adicionar tarefa"
            value={newTask}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>
        <ul className="tasks">
          {tasks.length ? (
            tasks.map((task, index) => {
              return (
                <li key={task}>
                  {task}
                  <span>
                    <FaEdit
                      onClick={(event) => this.handleEdit(event, index)}
                      className="edit"
                    />
                    <FaWindowClose
                      onClick={(event) => this.handleDelete(event, index)}
                      className="delete"
                    />
                  </span>
                </li>
              );
            })
          ) : (
            <li>
              <span></span>
            </li>
          )}
        </ul>
      </div>
    );
  };
}
