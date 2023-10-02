import React from "react";
import styles from "../../styles/Task.module.css";
import { Card, Media } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { OwnerDropdown } from "../../components/OwnerDropdown";

const Task = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    created_at,
    updated_at,
    title,
    body,
    state,
    priority,
    overdue,
    due_date,
    coowner,
    category,
    taskPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Task}>
      <Link to={`/task/${id}`}>
        <Card.Body className="text-left">
          {title && <Card.Title>{title}</Card.Title>}
          {body && <Card.Text>{body}</Card.Text>}
        </Card.Body>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              {!is_owner && <Avatar src={profile_image} height={55} owner={owner}/> } 
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && taskPage && <OwnerDropdown />}
            </div>
          </Media>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Task;
