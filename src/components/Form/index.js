import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import "./Form.css";

const Form = ({ handleSubmit, handleInput, newTask }) => {
  return (
    <form onSubmit={handleSubmit} className="form" action="#">
      <input
        onChange={handleInput}
        type="text"
        placeholder="Adicionar tarefa"
        value={newTask}
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};

export default Form;
