import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';
import App from 'next/app';
import { Provider } from 'react-redux';
import makeStore from '../Store/configureStore'
import withRedux from "next-redux-wrapper";
import cookie from "cookie"
import { Store } from 'redux';


interface Props {
  store: Store;
}

class MyApp extends App<Props> {

  static async getInitialProps({ Component, ctx, }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    
    if (ctx.isServer) {
      
      //Si le client nous envoie des cookies on verifie si il y a ses logs
      if (ctx.req.headers.cookie){
        let c = cookie.parse(ctx.req.headers.cookie).logged

        const action = { type: "SET_SESSION", value: c}
        ctx.store.dispatch(action)
      }
    

    }

    //Anything returned here can be access by the client
    return { pageProps: pageProps };
  }



  render() {
    const { Component, pageProps, store } = this.props;

    return <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  }

}
//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
