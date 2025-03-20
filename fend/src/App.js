import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import { ApolloProvider, ApolloClient, InMemoryCache, from } from '@apollo/client';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing,incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: process.env.REACT_APP_BEND_URL,
  cache,
})


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header/>
          <div className="container ">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/projects/:id" element={<Project/>} />
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>

    </>
  );
}

export default App;
