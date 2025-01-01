const Rating = ({ rating, feedback, setRating, setFeedback }) => {
  const handleRatingChange = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  console.log("Rating   : ", rating % 1);

  return (
    <div className="mt-5">
      {/* Star Rating System */}
      <div className="rating rating-lg rating-half">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            //rating 2.5      star 3
            <div key={star} className="flex items-center">
              <input
                type="radio"
                name="rating-10"
                className={` mask mask-star-2 mask-half-1 ${
                  rating >= star
                    ? "bg-green"
                    : rating % 1 == 0.5 && rating + (rating % 1) >= star
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
              <h4>{star}</h4>
            </div>
          );
        })}
      </div>

      {/* Feedback Textarea */}
      <textarea
        className="mt-3 w-full border p-2"
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={handleFeedbackChange}
      />
    </div>
  );
};

export default Rating;
