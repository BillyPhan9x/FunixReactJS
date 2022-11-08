import { useRef } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
  const emailEl = useRef();
  const fetcher = useFetcher();

  const signupForNewsletterHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailEl.current.value;
    // could validate input here
    fetcher.submit(
      // better: use fetcher.Form instead
      { email: enteredEmail },
      { method: "post", action: "/newsletter" }
    );
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up for our weekly newsletter</h2>
      <form onSubmit={signupForNewsletterHandler}>
        <input
          ref={emailEl}
          id="email"
          type="email"
          placeholder="Your email"
          aria-label="Your email address."
        />
        <button>Sign Up</button>
      </form>
    </section>
  );
};

export default NewsletterSignup;
