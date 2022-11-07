import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";
import NewCommentForm from "./NewCommentForm";

import classes from "./Comments.module.css";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;
  // Điều kiện đang chờ xử lý, đang tải, chờ phản hồi
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  // Điều kiện kiểm tra xem trạng thái gửi y/c đã hoàn thành chưa (tìm nạp commnents & đã tải comments)
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }
  // Điều kiện kiểm tra xem trạng thái gửi y/c hoàn thành chưa và nếu 0 có any bình luận nào
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;

/*
📌 Nếu 0 use useCallback() hàm addedCommentHandler sẽ dc tạo lại whenever component parent của nó hiển thị lại. => Tạo ra 1 vòng lặp vô hạn.

📌 useCallback() đảm bảo rằng hàm sẽ 0 dc tạo lại mỗi khi thành phần dc đánh giá lại để tránh các chu kỳ kết xuất lại 0 cần thiết và tránh vòng lặp vô hạn.
*/
