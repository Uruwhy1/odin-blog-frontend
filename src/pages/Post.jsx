import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import LoadingContext from "../contexts/LoadingContext";

import styles from "./Post.module.css";
import MainCard from "../components/blog-cards/MainCard";

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);
  const { fadeOut, loading, setLoading, setFadeOut } =
    useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }

        const data = await response.json();
        setPost(data);
        console.log(post);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  return (
    <main className={styles.container}>
      {loading ? (
        <Loading
          style={{
            opacity: fadeOut ? 0 : 1,
            position: "absolute",
            background: "var(--loading-white)",
          }}
        />
      ) : (
        ""
      )}
      {post ? <MainCard post={post} individualPage={true} /> : ""}
    </main>
  );
};
export default Post;
