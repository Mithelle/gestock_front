import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient(
  {
    defaultOptions:{
      queries:{
        cacheTime:0,
        networkMode:'always'
      }
    }
  }
)

export default function App({ Component, pageProps }: AppProps) {
  return   <Fragment>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
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
