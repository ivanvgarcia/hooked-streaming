import React from "react";
import { Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Navbar from "./Navbar";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import history from "../history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Navbar />
          <Container>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit" exact component={StreamEdit} />
            <Route path="/streams/delete" exact component={StreamDelete} />
            <Route path="/streams/:id/show" exact component={StreamShow} />
          </Container>
        </div>
      </Router>
    </div>
  );
};

export default App;
