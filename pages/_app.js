import "../styles/globals.css";
import { wrapper } from "../redux/store";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {" "}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(App);
