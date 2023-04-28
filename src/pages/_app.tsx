import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return   <Fragment>

    <Toaster />
    <Component {...pageProps} />
  </Fragment>

  
}


/*require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");

const port = 8000;
(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());
app.use("/api/v1", require("./routes/index.route"));
//
app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
*/
