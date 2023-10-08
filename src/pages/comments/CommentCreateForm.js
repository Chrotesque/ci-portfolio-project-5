import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { task, setTask, setComments, profileImage, profile_id } = props;
  const [body, setBody] = useState("");

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        body,
        task,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setTask((prevTask) => ({
        results: [
          {
            ...prevTask.results[0],
          },
        ],
      }));
      setBody("");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profileImage} />
        </Link>
        <Form.Control
          className={styles.Form}
          placeholder="Write a comment ..."
          as="textarea"
          name="body"
          value={body}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!body.trim()}
        type="submit"
      >
        Comment
      </button>
    </Form>
  );
}

export default CommentCreateForm;
