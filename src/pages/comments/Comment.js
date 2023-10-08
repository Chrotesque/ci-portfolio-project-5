import React, { useState } from "react";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import CommentEditForm from "./CommentEditForm";

import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    body,
    id,
    setTask,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setTask((prevTask) => ({
        results: [
          {
            ...prevTask.results[0],
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Avatar src={profile_image} />
        <Media.Body className="align-self-center ml-2">
          {!is_owner && <span className={styles.Owner}>{owner}</span>}
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              body={body}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{body}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <OwnerDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
