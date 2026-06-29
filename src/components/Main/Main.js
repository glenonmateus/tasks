import { Component } from "react";
import "./Main.css";
import Form from "../Form";
import Tasks from "../Tasks";

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

        <Form
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          newTask={newTask}
        ></Form>

        <Tasks
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          tasks={tasks}
        ></Tasks>
      </div>
    );
  };
}
