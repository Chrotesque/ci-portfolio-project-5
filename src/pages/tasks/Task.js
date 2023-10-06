import React from "react";
import styles from "../../styles/Task.module.css";
import { Card, Media } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import { axiosRes } from "../../api/axiosDefaults";

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
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };

  const handleDelete = () => {
    history.push(`/tasks/${id}/delete`);
  };

  return (
    <Card className={styles.Task}>
      <Link to={`/tasks/${id}`}>
        <Card.Body className="text-left">
          {title && <Card.Title>{title}</Card.Title>}
          {body && <Card.Text>{body}</Card.Text>}
        </Card.Body>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              {!is_owner && (
                <Avatar src={profile_image} height={55} owner={owner} />
              )}
            </Link>
            <div className="d-flex align-items-center">
              <span>
                Created @ {created_at}, updated @ {updated_at}
              </span>
              {is_owner && taskPage && (
                <OwnerDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Task;
