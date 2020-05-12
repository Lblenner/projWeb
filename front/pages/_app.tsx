import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-crop/dist/ReactCrop.css';

import { Provider } from 'react-redux';
import makeStore from '../Store/configureStore'
import withRedux from "next-redux-wrapper";

import cookie from "cookie"

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from '../src/theme';
import Head from 'next/head';


function MyApp(props) {

  const { Component, pageProps, store } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}


MyApp.getInitialProps = async ({ Component, ctx, }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  if (ctx.isServer) {
    //Si le client nous envoie des cookies on verifie si il y a ses logs
    if (ctx.req.headers.cookie) {
      let c = cookie.parse(ctx.req.headers.cookie).logged
      let username = cookie.parse(ctx.req.headers.cookie).username

      const action = { type: "SET_SESSION", value: c, username: username }
      ctx.store.dispatch(action)
    }
  }
  //Anything returned here can be access by the client
  return { pageProps: pageProps };
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withRedux(makeStore)(MyApp);
