import { useEffect, useState } from "react";
import SmallCard from "../components/blog-cards/SmallCard";
import Carousel from "../components/carousel/Carousel"; // Ensure correct path

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`); // Use your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure to take only the first three posts for the carousel
  const mainPosts = posts.slice(0, 3);

  return (
    <main>
      <Carousel posts={mainPosts} />
      <div className="small-cards-container">
        {posts.slice(3).map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;
