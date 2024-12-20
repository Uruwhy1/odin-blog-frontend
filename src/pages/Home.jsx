import { useContext, useEffect, useState } from "react";

import SmallCard from "../components/blog-cards/SmallCard";
import Carousel from "../components/carousel/Carousel";

import styles from "./Home.module.css";
import Loading from "../components/Loading";
import Pagination from "../components/pagination/Pagination";
import LoadingContext from "../contexts/LoadingContext";
import PopupContext from "../contexts/PopupContext";

import ModeButton from "../components/modeButton/ModeButton";

const Home = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainPosts, setMainPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const { fadeOut, loading, setLoading, setFadeOut } =
    useContext(LoadingContext);

  const { showPopup } = useContext(PopupContext);

  const [loadingSmall, setLoadingSmall] = useState(false);

  const calculatePostCount = () => {
    const horizontalSpace = window.innerWidth - 48;
    const cardWidth = getCardSizeInPixels(horizontalSpace);
    const postsPerRow = Math.floor(horizontalSpace / cardWidth);
    return postsPerRow * 2;
  };

  function getCardSizeInPixels(horizontalSpace) {
    const rootElement = document.documentElement;
    let cardSize = getComputedStyle(rootElement)
      .getPropertyValue("--home-card-size")
      .trim()
      .match(/\d+/g);

    if (horizontalSpace < 650) {
      cardSize = [90, Infinity];
    }

    const currentSize = Math.min(
      horizontalSpace * (cardSize[0] / 100),
      cardSize[1]
    );

    return currentSize;
  }

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [responseMain, responseSmall] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/posts?limit=3&carousel=true`),
          fetch(
            `${
              import.meta.env.VITE_API_URL
            }/posts?limit=${calculatePostCount()}&page=${currentPage}`
          ),
        ]);

        if (!responseMain.ok || !responseSmall.ok) {
          throw new Error("Failed to fetch posts.");
        }

        const [dataMain, dataSmall] = await Promise.all([
          responseMain.json(),
          responseSmall.json(),
        ]);

        setMainPosts(dataMain.posts);
        setPosts(dataSmall.posts);
        setTotalPosts(dataMain.totalPosts);
      } catch (err) {
        if (err.message.includes("NetworkError"))
          showPopup("Could not connect to the database.");
        else showPopup(err.message, false);
        console.error(err);
      } finally {
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => setLoading(false), 800);

        setTimeout(() => {
          setLoadingSmall(false);
        }, 500);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / calculatePostCount());
  const handlePageChange = (page) => {
    setLoadingSmall(true);
    setFadeOut(false);
    setCurrentPage(page);
  };

  return (
    <main>
      {loading && (
        <Loading
          style={{
            opacity: fadeOut ? 0 : 1,
            background: "var(--loading-white)",
          }}
        />
      )}
      <Carousel posts={mainPosts} />
      <div className={styles.secondSectionContainer}>
        {loadingSmall && (
          <Loading
            style={{
              opacity: fadeOut ? 0 : 1,
              position: "absolute",
              background: "var(--loading-white-transparency)",
            }}
          />
        )}
        <div className={styles.smallCardContainer}>
          {posts.map((post) => (
            <SmallCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <ModeButton />
    </main>
  );
};

export default Home;
