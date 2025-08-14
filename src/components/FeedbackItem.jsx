import styles from "../styles/index.module.css";
import React from "react";
import { Rating } from "@mui/material";

const FeedbackItem = ({ feedback }) => {
  const { name, rating, comment, createdAt } = feedback;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
      <div className={styles.feedbackItem}>
        <div className={styles.feedbackHeader}>
          <div className={styles.feedbackAuthor}>
            <h4>{name}</h4>
            <div className={styles.feedbackRating}>
              <Rating value={rating} max={5} readOnly precision={1} />
              <span className={styles.ratingNumber}>({rating}/5)</span>
            </div>
          </div>
          <div className={styles.feedbackDate}>{formatDate(createdAt)}</div>
        </div>
        <div className={styles.feedbackComment}>
          <p>{comment}</p>
        </div>
      </div>
  );
};

export default FeedbackItem;