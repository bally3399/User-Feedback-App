import { useState } from "react"
import styles from "../styles/index.module.css"

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.comment.trim()) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    const success = await onSubmit(formData)

    if (success) {
      setFormData({
        name: "",
        rating: 5,
        comment: "",
      })
      alert("Feedback submitted successfully!")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rating">Rating:</label>
        <select id="rating" name="rating" value={formData.rating} onChange={handleChange} required>
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Share your feedback..."
          rows="4"
          required
        />
      </div>

      <button type="submit" className={style.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  )
}

export default FeedbackForm
