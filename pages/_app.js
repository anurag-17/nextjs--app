import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";

import "./";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/loader.css";
import { store } from "../redux/store/store";
import Layout from "../components/Layout";
import Script from "next/script";


function MyApp({ Component, pageProps }) {


  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  useEffect(() => {
    const authToken = sessionStorage.getItem("token");
    console.log("authToken", authToken);
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Ecommerce-website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </Provider>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
