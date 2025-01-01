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
      <form onSubmit={handleSubmit} className="mt-5  text-center">
        {/* Star Rating System */}
        <div className="rating rating-md  rating-half justify-center flex">
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
            <div className=" pt-2 text-end text-xl font-bold ml-12 text-green">
              {rating}
            </div>
          )}
        </div>

        {/* Feedback Textarea */}
        <textarea
          className="mt-3 w-[90%] border p-2 "
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 shadow-gray-500/50 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-gray-500/30 hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rating;
