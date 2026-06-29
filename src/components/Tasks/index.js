import PropTypes from "prop-types";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import "./Tasks.css";

const Tasks = ({ handleEdit, handleDelete, tasks }) => {
  return (
    <ul className="tasks">
      {tasks.length ? (
        tasks.map((task, index) => {
          return (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  onClick={(event) => handleEdit(event, index)}
                  className="edit"
                />
                <FaWindowClose
                  onClick={(event) => handleDelete(event, index)}
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
  );
};

Tasks.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Tasks;
