import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import TaskPage from "./pages/tasks/TaskPage";
import TasksPage from "./pages/tasks/TasksPage";
import { useCurrentUser } from "./context/CurrentUserContext";
import TaskEditForm from "./pages/tasks/TaskEditForm";
import TaskDeleteForm from "./pages/tasks/TaskDeleteForm";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TasksPage
                message="No tasks found. Time to create a few!"
                filter={`owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/tasks/completed"
            render={() => (
              <TasksPage
                message="No completed tasks found. Time to create and then finish a few!"
                filter={`owner__profile=${profile_id}&state=DON&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <SignInForm />} />
          <Route exact path="/register" render={() => <SignUpForm />} />
          <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
          <Route exact path="/tasks/:id" render={() => <TaskPage />} />
          <Route exact path="/tasks/:id/edit" render={() => <TaskEditForm />} />
          <Route
            exact
            path="/tasks/:id/delete"
            render={() => <TaskDeleteForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
