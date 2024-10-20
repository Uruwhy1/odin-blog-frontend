import PropTypes from "prop-types";
import styles from "./cards.module.css";

import User from "./subcomponents/User";

const MainCard = ({ post }) => {
  if (!post.imageLink) {
    post.imageLink = "../../public/test-image.jpg";
  }

  return (
    <div
      className={`${styles.image} ${styles.big}`}
      style={{
        backgroundImage: `url(${post.imageLink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <h2>{post.title}</h2>
        <div>
          <User username={post.user.username} />
          <p className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

MainCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageLink: PropTypes.string,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainCard;