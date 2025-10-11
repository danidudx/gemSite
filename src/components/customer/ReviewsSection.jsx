export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      text: "Beautiful ring, excellent quality and amazing service. Highly recommend!",
      customer: "Customer 1",
    },
    {
      id: 2,
      text: "Beautiful ring, excellent quality and amazing service. Highly recommend!",
      customer: "Customer 2",
    },
    {
      id: 3,
      text: "Beautiful ring, excellent quality and amazing service. Highly recommend!",
      customer: "Customer 3",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-light text-center mb-12">REVIEWS</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="border p-6">
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm mb-4">"{review.text}"</p>
            <p className="text-xs text-gray-500">- {review.customer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
