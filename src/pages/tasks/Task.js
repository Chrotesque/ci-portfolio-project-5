import React from "react";
import styles from "../../styles/Task.module.css";
import { Card } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import Asset from "../../components/Asset";

import LO from "../../assets/priority/LO.png";
import MI from "../../assets/priority/MI.png";
import HI from "../../assets/priority/HI.png";
import CR from "../../assets/priority/CR.png";
import NEW from "../../assets/state/NEW.png";
import WIP from "../../assets/state/WIP.png";
import DON from "../../assets/state/DON.png";
import DEL from "../../assets/state/DEL.png";

const Task = (props) => {
  const { id, owner, created_at, title, body, state, priority, taskPage } =
    props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };

  const handleDelete = () => {
    history.push(`/tasks/${id}/delete`);
  };

  return (
    <Card className={styles.Task}>
      <div className="text-left">
        <Link to={`/tasks/${id}`}>
          {title && body && (
            <>
              <Card.Header>
                <Card.Title>{title}</Card.Title>
              </Card.Header>
              <Card.Body>{body}</Card.Body>
            </>
          )}

          {!title && body && <Card.Body>{body}</Card.Body>}

          {title && !body && (
            <Card.Header>
              <Card.Title>{title}</Card.Title>
            </Card.Header>
          )}

          <Card.Footer>
            <div className="d-flex align-items-center justify-content-between text-center">
              <div>
                {taskPage && <span>Priority </span>}
                {priority === "LO" && <Asset icon={LO} alt="Low Priority" />}
                {priority === "MI" && <Asset icon={MI} alt="Medium Priority" />}
                {priority === "HI" && <Asset icon={HI} alt="High Priority" />}
                {priority === "CR" && (
                  <Asset icon={CR} alt="Critical Priority" />
                )}
              </div>
              <div>
                {taskPage && <span>State </span>}
                {state === "NEW" && <Asset icon={NEW} alt="New" />}
                {state === "WIP" && <Asset icon={WIP} alt="Work in Progress" />}
                {state === "DON" && <Asset icon={DON} alt="Done" />}
                {state === "DEL" && <Asset icon={DEL} alt="Delayed" />}
              </div>
              {taskPage && (
                <div>
                  <span>Created: {created_at}</span>
                </div>
              )}

              {is_owner && taskPage && (
                <div>
                  <OwnerDropdown
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              )}
            </div>
          </Card.Footer>
        </Link>
      </div>
    </Card>
  );
};

export default Task;
