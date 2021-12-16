import "@/config/axiosConfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "./store";
import themeConfig from "./config/themeConfig";

import Home from "./views/pages/Home";
import Services from "./views/pages/Services";
import Users from "./views/pages/Users";
import User from "./views/pages/Users/User";
import Artists from "./views/pages/Artists";
import Albums from "./views/pages/Albums";
import Tweets from "./views/pages/Tweets";
import Portfolio from "./views/pages/Portfolio";
import ErrorBoundary from "./hoc/ErrorBoundary";
import Layout from "@/views/layouts";

import Snackbar from "@/hoc/@app/Snackbar";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={themeConfig}>
          <ErrorBoundary>
            <Snackbar />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="services" element={<Services />} />
                  <Route path="portfolios" element={<Portfolio />} />
                  <Route path="users" element={<Users />}>
                    <Route path=":userId" element={<User />} />
                  </Route>
                  <Route path="artistes">
                    <Route index element={<Artists />} />
                    <Route path=":userId/albums" element={<Albums />} />
                  </Route>
                  <Route path="tweets" element={<Tweets />}>
                    <Route path=":tweetId" element={<Albums />} />
                  </Route>
                </Routes>
              </Layout>
            </BrowserRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
