import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import FeedbackList from "../components/FeedbackList";
import styles from "../styles/index.module.css";

const Homepage = () => {
    const [feedback, setFeedback] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRating, setSelectedRating] = useState("all");
    const [currentView, setCurrentView] = useState("list");
    const [formData, setFormData] = useState({
        name: "",
        rating: 5,
        comment: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const API_BASE_URL = "http://localhost:3000";

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/feedback`);
            if (!response.ok) {
                throw new Error("Failed to fetch feedback");
            }

            const data = await response.json();
            setFeedback(data);
            setFilteredFeedback(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterFeedback = (feedbackData, rating) => {
        if (rating === "all") {
            setFilteredFeedback(feedbackData);
        } else {
            const filtered = feedbackData.filter((item) => item.rating === Number.parseInt(rating));
            setFilteredFeedback(filtered);
        }
    };

    const handleFilterChange = (rating) => {
        setSelectedRating(rating);
        filterFeedback(feedback, rating);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number.parseInt(value) : value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.comment.trim()) {
            alert("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit feedback");
            }

            const newFeedback = await response.json();
            setFeedback((prev) => [newFeedback, ...prev]);
            setFilteredFeedback((prev) => [newFeedback, ...prev]);

            setFormData({
                name: "",
                rating: 5,
                comment: "",
            });
            alert("Feedback submitted successfully!");
            setCurrentView("list");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    return (
        <div className={styles.app}>
            <nav className={styles.navigation}>
                <div className={styles.navContainer}>
                    <a href="/" className={styles.navBrand}>
                        Feedback App
                    </a>
                    <button
                        className={styles.hamburger}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                    <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
                        <button
                            className={`${styles.navLink} ${currentView === "list" ? styles.active : ""}`}
                            onClick={() => {
                                setCurrentView("list");
                                setIsMenuOpen(false);
                            }}
                        >
                            View Feedback
                        </button>
                        <button
                            className={`${styles.navLink} ${currentView === "form" ? styles.active : ""}`}
                            onClick={() => {
                                setCurrentView("form");
                                setIsMenuOpen(false);
                            }}
                        >
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </nav>

            <header className={styles.appHeader}>
                <h1>{currentView === "list" ? "User Feedback Dashboard" : "Submit Your Feedback"}</h1>
                <p>
                    {currentView === "list"
                        ? "View and filter all user feedback"
                        : "Share your thoughts and help us improve"}
                </p>
            </header>

            <main className={styles.appMain}>
                <div className={styles.container}>
                    {currentView === "list" ? (
                        <section className={styles.feedbackListSection}>
                            <div className={styles.sectionHeader}>
                                <h2>All Feedback</h2>
                                <FilterBar selectedRating={selectedRating} onFilterChange={handleFilterChange} />
                            </div>

                            {error && (
                                <div className={styles.errorMessage}>
                                    <p>Error: {error}</p>
                                    <button onClick={fetchFeedback} className={styles.retryButton}>
                                        Try Again
                                    </button>
                                </div>
                            )}

                            <FeedbackList feedback={filteredFeedback} loading={loading} error={error} />
                        </section>
                    ) : (
                        <section className={styles.feedbackFormSection}>
                            {error && (
                                <div className={styles.errorMessage}>
                                    <p>Error: {error}</p>
                                </div>
                            )}

                            <form onSubmit={handleFormSubmit} className={styles.feedbackForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="rating">Rating:</label>
                                    <select id="rating" name="rating" value={formData.rating} onChange={handleFormChange} required>
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
                                        onChange={handleFormChange}
                                        placeholder="Share your feedback..."
                                        rows="4"
                                        required
                                    />
                                </div>

                                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                                </button>
                            </form>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Homepage;