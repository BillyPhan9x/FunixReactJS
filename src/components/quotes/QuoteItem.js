import { Link } from "react-router-dom";

import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className="btn" to={`/quotes/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;

// 0 nên use thẻ a kết hợp vs attribute href sẽ gửi y/c và tải lại trang. => muốn 1 UD trang đơn SPAs và để React Router thực hiện việc change URL và cập nhật trang thì use { Link }

// - nhận props.id có tác dụng xđ QuoteItem cụ thể. Vì trong QuoteList đã thiết lập 1 prop id={quote.id} - XD path đến từng trích dẫn cụ thể có mặt trong list.
