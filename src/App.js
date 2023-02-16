import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import store from "./store";
import { Provider } from "react-redux";
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserPosts from "./pages/UserPosts";
import SignUp from "./pages/SignUp";
import PostDetails from "./pages/PostDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

//moment config
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');


checkForToken();

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation></Navigation>
        </div>
        <Container>
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<Posts />}></Route>
            <Route exact path="/signin" element={<SignIn />}></Route>
            <Route exact path="/signup" element={<SignUp />}></Route>
            <Route exact path="/posts" element={<PrivateRoute />}>
              <Route exact path="/posts" element={<UserPosts />}> </Route>
            </Route>
            <Route exact path="/post/:post_id" element={<PostDetails />}></Route>
            <Route exact path="/newpost" element={<PrivateRoute />}>
              <Route exact path="/newpost" element={<NewPost />}> </Route>
            </Route>
            <Route exact path="/editpost/:post_id" element={<PrivateRoute />}>
              <Route exact path="/editpost/:post_id" element={<EditPost />}> </Route>
            </Route>
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
