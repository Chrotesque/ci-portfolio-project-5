import React, { useEffect, useState } from "react";

import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

import styles from "../../styles/TaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function TaskEditForm() {
  const currentUser = useCurrentUser();

  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    body: "",
    state: "",
    priority: "",
    category: "",
    due_date: "",
  });

  const { title, body, state, priority, category, due_date } = taskData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id} `);
        const { title, body, due_date, state, priority, is_owner } = data;

        is_owner
          ? setTaskData({ title, body, due_date, state, priority })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);
    // formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("state", state);

    try {
      await axiosReq.put(`/tasks/${id}`, formData);
      history.push(`/tasks/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={9}
          name="body"
          value={body}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.body?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  const selectFields = (
    <div className="text-center">
      {/* <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="due_date"
          placeholder="Due Date"
          value={due_date}
          onChange={handleChange}
        />
      </Form.Group> */}
      {errors?.due_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={priority}
          onChange={handleChange}
        >
          <option value="LO">Low</option>
          <option value="MI">Medium</option>
          <option value="HI">High</option>
          <option value="CR">Critical</option>
        </Form.Control>
      </Form.Group>
      {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Control
          as="select"
          name="state"
          value={state}
          onChange={handleChange}
        >
          <option value="NEW">New</option>
          <option value="WIP">Work in Progress</option>
          <option value="DEL">Delayed</option>
          <option value="DON">Completed</option>
        </Form.Control>
      </Form.Group>
      {errors?.state?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  const buttons = (
    <div className="text-center">
      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
        variant="primary"
        type="submit"
      >
        Save Changes
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Spacer} ${btnStyles.Wide} ${btnStyles.Dark}`}
        variant="primary"
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
    </div>
  );

  const form = (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={8} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              {textFields}
            </Container>
          </Col>
          <Col className="py-2 p-0 p-md-2" md={4} lg={4}>
            <Container className={appStyles.Content}>
              {selectFields}
              {buttons}
            </Container>
          </Col>
        </Row>
      </Form>
    </>
  );

  const login = (
    <>
      <span>You have to be logged in to create new tasks!</span>
    </>
  );

  return <Container>{currentUser ? form : login}</Container>;
}

export default TaskEditForm;
