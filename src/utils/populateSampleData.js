import api from "../services/api";
import { sampleProducts, sampleBlogs, sampleHomepageData } from "./sampleData";

// Function to populate the database with sample data
export const populateSampleData = async () => {
  try {
    console.log("Starting to populate sample data...");

    // Create products
    console.log("Creating products...");
    const createdProducts = [];
    for (const product of sampleProducts) {
      try {
        console.log(`Creating product: ${product.name}`);
        const response = await api.createProduct(product);
        console.log("Product creation response:", response);
        createdProducts.push(response);
        console.log(`✅ Created product: ${product.name}`);
      } catch (error) {
        console.error(`❌ Failed to create product ${product.name}:`, error);
        console.error("Error details:", {
          message: error.message,
          status: error.status,
          response: error.response,
        });
      }
    }

    // Create blogs
    console.log("Creating blogs...");
    const createdBlogs = [];
    for (const blog of sampleBlogs) {
      try {
        console.log(`Creating blog: ${blog.title}`);
        const response = await api.createBlog(blog);
        console.log("Blog creation response:", response);
        createdBlogs.push(response);
        console.log(`✅ Created blog: ${blog.title}`);
      } catch (error) {
        console.error(`❌ Failed to create blog ${blog.title}:`, error);
        console.error("Error details:", {
          message: error.message,
          status: error.status,
          response: error.response,
        });
      }
    }

    // Update homepage data
    console.log("Updating homepage data...");
    try {
      // Map product names to IDs for featured items
      const gemProducts = createdProducts.filter((p) => p.type === "gem");
      const jewelryProducts = createdProducts.filter(
        (p) => p.type === "jewelry"
      );

      console.log("Gem products:", gemProducts);
      console.log("Jewelry products:", jewelryProducts);

      const homepageData = {
        ...sampleHomepageData,
        featuredGems: gemProducts.slice(0, 2).map((p) => p.id || p._id),
        featuredJewelry: jewelryProducts.slice(0, 4).map((p) => p.id || p._id),
        collections: sampleHomepageData.collections.map((collection) => ({
          ...collection,
          products: collection.products.map((productName) => {
            const product = createdProducts.find((p) => p.name === productName);
            return product ? product.id || product._id : productName;
          }),
        })),
      };

      console.log("Homepage data to update:", homepageData);
      await api.updateHomepage(homepageData);
      console.log("✅ Updated homepage data");
    } catch (error) {
      console.error("❌ Failed to update homepage data:", error);
      console.error("Error details:", {
        message: error.message,
        status: error.status,
        response: error.response,
      });
    }

    console.log("Sample data population completed!");
    console.log(`Created ${createdProducts.length} products`);
    console.log(`Created ${createdBlogs.length} blogs`);

    return {
      products: createdProducts,
      blogs: createdBlogs,
      homepage: sampleHomepageData,
    };
  } catch (error) {
    console.error("Error populating sample data:", error);
    throw error;
  }
};

// Function to clear all data (for testing)
export const clearAllData = async () => {
  try {
    console.log("Clearing all data...");

    // Get all products and delete them
    const products = await api.getProducts({ limit: 1000 });
    if (products.products) {
      for (const product of products.products) {
        try {
          await api.deleteProduct(product.id || product._id);
          console.log(`Deleted product: ${product.name}`);
        } catch (error) {
          console.error(`Failed to delete product ${product.name}:`, error);
        }
      }
    }

    // Get all blogs and delete them
    const blogs = await api.getBlogs({ limit: 1000 });
    if (blogs.blogs) {
      for (const blog of blogs.blogs) {
        try {
          await api.deleteBlog(blog.id || blog._id);
          console.log(`Deleted blog: ${blog.title}`);
        } catch (error) {
          console.error(`Failed to delete blog ${blog.title}:`, error);
        }
      }
    }

    // Reset homepage data
    try {
      await api.updateHomepage({
        featuredGems: [],
        featuredJewelry: [],
        collections: [],
        promotions: [],
      });
      console.log("Reset homepage data");
    } catch (error) {
      console.error("Failed to reset homepage data:", error);
    }

    console.log("All data cleared!");
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  }
};

// Test function to check API connectivity
export const testAPI = async () => {
  try {
    console.log("Testing API connectivity...");

    // Test products endpoint
    console.log("Testing products endpoint...");
    const products = await api.getProducts({ limit: 5 });
    console.log("Products response:", products);

    // Test blogs endpoint
    console.log("Testing blogs endpoint...");
    const blogs = await api.getBlogs({ limit: 5 });
    console.log("Blogs response:", blogs);

    // Test homepage endpoint
    console.log("Testing homepage endpoint...");
    const homepage = await api.getHomepage();
    console.log("Homepage response:", homepage);

    console.log("✅ API connectivity test passed!");
    return true;
  } catch (error) {
    console.error("❌ API connectivity test failed:", error);
    return false;
  }
};

// Make functions available globally for console testing
if (typeof window !== "undefined") {
  window.populateSampleData = populateSampleData;
  window.clearAllData = clearAllData;
  window.testAPI = testAPI;
  console.log("Sample data functions available:");
  console.log("- testAPI() - Test API connectivity");
  console.log("- populateSampleData() - Create sample data");
  console.log("- clearAllData() - Clear all data");
}
