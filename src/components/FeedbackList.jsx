import FeedbackItem from "./FeedbackItem"
import styles from "../styles/index.module.css"

const FeedbackList = ({ feedback, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading feedback...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Unable to load feedback. Please try again later.</p>
      </div>
    )
  }

  if (feedback.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No feedback found. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className={styles.feedbackList}>
      {feedback.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  )
}

export default FeedbackList
