const Rating = ({ rating, feedback, setRating, setFeedback, onSubmit }) => {
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ rating, feedback });
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="mt-5">
        {/* Star Rating System */}
        <div className="rating rating-lg rating-half">
          {[1, 2, 3, 4, 5].map((star) => {
            return (
              <div key={star} className="flex items-center">
                <input
                  type="radio"
                  name="rating-10"
                  className={`mask mask-star-2 mask-half-1 ${
                    rating >= star
                      ? "bg-green"
                      : rating % 1 === 0.5 && rating + (rating % 1) >= star
                      ? "bg-green"
                      : "bg-gray-300"
                  }`}
                  value={star - 0.5}
                  onChange={() => handleRatingChange(star - 0.5)}
                />
                <input
                  type="radio"
                  name="rating-10"
                  className={`mask mask-star-2 mask-half-2 ${
                    rating >= star ? "bg-green" : "bg-gray-300"
                  }`}
                  value={star}
                  onChange={() => handleRatingChange(star)}
                />
              </div>
            );
          })}
          {rating && (
            <div className="pt-2 text-xl font-bold ml-20 text-green">
              {rating}
            </div>
          )}
        </div>

        {/* Feedback Textarea */}
        <textarea
          className="mt-3 w-full border p-2"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rating;
