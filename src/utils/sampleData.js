// Sample data for products, blogs, and homepage
export const sampleProducts = [
  {
    name: "Diamond Ring - Classic Solitaire",
    type: "jewelry",
    category: "Rings",
    price: 2500,
    images: ["/uploads/images/gem.jpg"],
    image360: "/uploads/images/gem.jpg",
    description:
      "A timeless classic solitaire diamond ring featuring a brilliant cut diamond in a simple, elegant setting.",
    specifications: {
      color: "D",
      carat: 1.0,
      cut: "Excellent",
      clarity: "VVS1",
      origin: "South Africa",
      certification: "GIA",
      shape: "Round",
      metalType: "White Gold",
      setting: "Prong",
      gemstone: "Diamond",
    },
    availability: "in_stock",
    rarity: "Premium",
    guides: "Care instructions included",
    certificateUrl: "/uploads/certificates/diamond-ring.pdf",
  },
  {
    name: "Sapphire Earrings - Princess Cut",
    type: "jewelry",
    category: "Earrings",
    price: 1200,
    images: ["/uploads/images/jwell.jpg"],
    image360: "/uploads/images/jwell.jpg",
    description:
      "Elegant princess cut sapphire earrings set in white gold with diamond accents.",
    specifications: {
      color: "Blue",
      carat: 2.5,
      cut: "Very Good",
      clarity: "VS1",
      origin: "Sri Lanka",
      certification: "AGL",
      shape: "Princess",
      metalType: "White Gold",
      setting: "Prong",
      gemstone: "Sapphire",
    },
    availability: "in_stock",
    rarity: "Rare",
    guides: "Care instructions included",
    certificateUrl: "/uploads/certificates/sapphire-earrings.pdf",
  },
  {
    name: "Emerald Gemstone - Colombian",
    type: "gem",
    category: "Emeralds",
    price: 800,
    images: ["/uploads/images/gem.jpg"],
    image360: "/uploads/images/gem.jpg",
    description:
      "Premium Colombian emerald with exceptional color and clarity, perfect for custom jewelry.",
    specifications: {
      color: "Green",
      carat: 3.2,
      cut: "Excellent",
      clarity: "VS2",
      origin: "Colombia",
      certification: "GIA",
      shape: "Oval",
      metalType: "",
      setting: "",
      gemstone: "Emerald",
    },
    availability: "in_stock",
    rarity: "Premium",
    guides: "Gemstone care guide included",
    certificateUrl: "/uploads/certificates/emerald-gemstone.pdf",
  },
  {
    name: "Ruby Necklace - Vintage Style",
    type: "jewelry",
    category: "Necklaces",
    price: 3500,
    images: ["/uploads/images/jwell.jpg"],
    image360: "/uploads/images/jwell.jpg",
    description:
      "Vintage-style ruby necklace featuring multiple stones in an intricate gold setting.",
    specifications: {
      color: "Red",
      carat: 4.8,
      cut: "Good",
      clarity: "SI1",
      origin: "Myanmar",
      certification: "GIA",
      shape: "Round",
      metalType: "Yellow Gold",
      setting: "Pave",
      gemstone: "Ruby",
    },
    availability: "in_stock",
    rarity: "Rare",
    guides: "Care instructions included",
    certificateUrl: "/uploads/certificates/ruby-necklace.pdf",
  },
  {
    name: "Diamond Bracelet - Tennis Style",
    type: "jewelry",
    category: "Bracelets",
    price: 1800,
    images: ["/uploads/images/jwell.jpg"],
    image360: "/uploads/images/jwell.jpg",
    description:
      "Elegant tennis bracelet with brilliant cut diamonds in a flexible white gold setting.",
    specifications: {
      color: "D-F",
      carat: 2.0,
      cut: "Very Good",
      clarity: "VS2",
      origin: "Canada",
      certification: "GIA",
      shape: "Round",
      metalType: "White Gold",
      setting: "Channel",
      gemstone: "Diamond",
    },
    availability: "in_stock",
    rarity: "Premium",
    guides: "Care instructions included",
    certificateUrl: "/uploads/certificates/diamond-bracelet.pdf",
  },
  {
    name: "Amethyst Gemstone - Brazilian",
    type: "gem",
    category: "Amethysts",
    price: 450,
    images: ["/uploads/images/gem.jpg"],
    image360: "/uploads/images/gem.jpg",
    description:
      "Beautiful Brazilian amethyst with deep purple color and excellent clarity.",
    specifications: {
      color: "Purple",
      carat: 5.5,
      cut: "Good",
      clarity: "VS1",
      origin: "Brazil",
      certification: "AGL",
      shape: "Emerald",
      metalType: "",
      setting: "",
      gemstone: "Amethyst",
    },
    availability: "in_stock",
    rarity: "Common",
    guides: "Gemstone care guide included",
    certificateUrl: "/uploads/certificates/amethyst-gemstone.pdf",
  },
];

export const sampleBlogs = [
  {
    title: "The Complete Guide to Diamond Buying",
    content:
      "Diamonds are forever, but choosing the right one can be overwhelming. In this comprehensive guide, we'll walk you through the 4 Cs of diamond buying: Cut, Color, Clarity, and Carat weight. Learn how to balance these factors to find the perfect diamond within your budget.",
    excerpt:
      "Learn everything you need to know about buying diamonds, from the 4 Cs to certification and setting options.",
    featuredImage: "/uploads/images/blog.jpg",
    author: "Sarah Johnson",
    tags: ["diamonds", "buying guide", "jewelry", "education"],
    publishedAt: new Date().toISOString(),
    isPublished: true,
  },
  {
    title: "Understanding Gemstone Certifications",
    content:
      "When purchasing precious gemstones, certification is crucial for ensuring authenticity and quality. This article explains the different certification bodies like GIA, AGL, and EGL, what their reports contain, and why they matter for your investment.",
    excerpt:
      "Everything you need to know about gemstone certifications and why they're important for your purchase.",
    featuredImage: "/uploads/images/blog.jpg",
    author: "Michael Chen",
    tags: ["certification", "gemstones", "quality", "investment"],
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    isPublished: true,
  },
  {
    title: "Caring for Your Fine Jewelry",
    content:
      "Proper care and maintenance can keep your fine jewelry looking beautiful for generations. Learn about cleaning methods, storage techniques, and when to seek professional maintenance for your precious pieces.",
    excerpt:
      "Essential tips for maintaining and caring for your fine jewelry collection.",
    featuredImage: "/uploads/images/blog.jpg",
    author: "Emma Rodriguez",
    tags: ["care", "maintenance", "jewelry", "tips"],
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    isPublished: true,
  },
];

export const sampleHomepageData = {
  featuredGems: ["3", "6"], // IDs of gem products
  featuredJewelry: ["1", "2", "4", "5"], // IDs of jewelry products
  collections: [
    {
      name: "Diamond Collection",
      description:
        "Our finest diamond pieces, hand-selected for their exceptional quality and brilliance.",
      type: "gem",
      image: "/uploads/images/gem.jpg",
      products: ["1", "3"], // Product IDs
    },
    {
      name: "Elegant Jewelry Set",
      description:
        "Timeless jewelry pieces that combine classic design with modern craftsmanship.",
      type: "jewelry",
      image: "/uploads/images/jwell.jpg",
      products: ["2", "4", "5"], // Product IDs
    },
  ],
  promotions: [
    {
      title: "Summer Collection Launch",
      description:
        "Discover our new summer collection featuring vibrant gemstones and contemporary designs.",
      image: "/uploads/images/blog.jpg",
      link: "/collections/summer",
      isActive: true,
    },
    {
      title: "Free Shipping on Orders Over $1000",
      description:
        "Enjoy complimentary shipping on all orders over $1000. Valid for a limited time.",
      image: "/uploads/images/blog.jpg",
      link: "/shipping",
      isActive: true,
    },
  ],
};

// Function to create sample data
export const createSampleData = async () => {
  try {
    console.log("Creating sample data...");

    // Note: In a real implementation, you would call your API endpoints here
    // For now, this is just the data structure

    console.log("Sample products:", sampleProducts);
    console.log("Sample blogs:", sampleBlogs);
    console.log("Sample homepage data:", sampleHomepageData);

    return {
      products: sampleProducts,
      blogs: sampleBlogs,
      homepage: sampleHomepageData,
    };
  } catch (error) {
    console.error("Error creating sample data:", error);
    throw error;
  }
};
