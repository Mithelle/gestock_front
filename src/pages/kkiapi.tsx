import {
    openKkiapayWidget,
    addKkiapayListener,
    removeKkiapayListener,
  } from "kkiapay";


  function Home() {
    function open() {
      openKkiapayWidget({
        amount: 4000,
        api_key: "xxxxxxxxxxxxxxxxxx",
        sandbox: true,
        email: "randomgail@gmail.com",
        phone: "97000000",
      });
    }
  
    return (
      <div>
        <button onClick={open}>click me</button>
      </div>
    );
  }