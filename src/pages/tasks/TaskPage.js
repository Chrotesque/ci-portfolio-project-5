import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Task from "./Task";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";

function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: task }, { data: comments }] = await Promise.all([
          axiosReq.get(`/tasks/${id}`),
          axiosReq.get(`/comments/?task=${id}`),
        ]);

        if (task.is_owner) {
          setTask({ results: [task] });
          setComments(comments);
        } else {
          history.push("/");
        }
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id, history]);

  const taskView = (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Task {...task.results[0]} taskPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              task={id}
              setTask={setTask}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setTask={setTask}
                setComments={setComments}
              />
            ))
          ) : currentUser ? (
            <span>No comments yet, write a comment ...</span>
          ) : (
            <span>No comments yet.</span>
          )}
        </Container>
      </Col>
    </Row>
  );

  const login = (
    <>
      <span>You have to be logged in to view tasks!</span>
    </>
  );

  return <Container>{currentUser ? taskView : login}</Container>;
}

export default TaskPage;
