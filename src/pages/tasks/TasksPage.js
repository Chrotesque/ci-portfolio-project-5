import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Task from "./Task";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/TasksPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import { useCurrentUser } from "../../context/CurrentUserContext";

function TasksPage({ message, filter = "" }) {
  const currentUser = useCurrentUser();
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/tasks/?${filter}&search=${query}`
        );
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  const taskListing = (
    <>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={12}>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search tasks"
            />
          </Form>
          {hasLoaded ? (
            <>
              <Row>
                {tasks.results.length ? (
                  tasks.results.map((task) => (
                    <Col key={task.id} lg={3}>
                      <Task key={task.id} {...task} setTasks={setTasks} />
                    </Col>
                  ))
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset src={NoResults} message={message} />
                  </Container>
                )}
              </Row>
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </>
  );

  const loginOrRegister = (
    <>
      <span>
        Login to your account or register now to start creating tasks!
      </span>
    </>
  );

  return <Container>{currentUser ? taskListing : loginOrRegister}</Container>;
}

export default TasksPage;
