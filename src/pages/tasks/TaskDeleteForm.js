import React, { useEffect, useState } from "react";

import { Button, Row, Col, Container } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Task from "./Task";
import { useCurrentUser } from "../../context/CurrentUserContext";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
        ]);
        setTask({ results: [task] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}`);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const buttons = (
    <div className="text-center">
      <span>Are you sure you want to delete this task?</span>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
        variant="primary"
        onClick={() => handleDelete()}
      >
        Delete it!
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Spacer} ${btnStyles.Wide} ${btnStyles.Dark}`}
        variant="primary"
        onClick={() => history.goBack()}
      >
        I've changed my mind
      </Button>
    </div>
  );

  const overview = (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Task {...task.results[0]} />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {buttons}
      </Col>
    </Row>
  );

  const login = (
    <>
      <span>You have to be logged in to delete a tasks!</span>
    </>
  );

  return <Container>{currentUser ? overview : login}</Container>;
}

export default TaskPage;
