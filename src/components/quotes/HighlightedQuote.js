import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  // thực hiện kết xuất và tạo kiểu cho some trích dẫn.
  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
