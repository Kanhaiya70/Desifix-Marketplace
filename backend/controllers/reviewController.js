import Review from "../models/Review.js";

export const createReview = async(req, res) => {
  const { serviceId, rating, comment } = req.body;

  try {
    const alreadyReviewed = await Review.findOne({ service: serviceId, user: req.user._id });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this service'});
    }

    const review = new Review({ 
      user: req.user._id,
      service: serviceId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    console.log("Error submitting rewiew", err);
    res.status(500).json({ message: 'Error submitting review'});
  }
};

export const getReviewsForService = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load reviews' });
  }
};