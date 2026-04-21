import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaSpotify,
  FaSoundcloud,
  FaAmazon,
  FaMusic,
} from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic, SiTidal } from "react-icons/si";
import "./Music.css";

const platforms = [
  {
    name: "Apple Music",
    icon: <SiApplemusic />,
    url: "https://music.apple.com/us/artist/jessica-mulein/1563523073",
    color: "#FA243C",
  },
  {
    name: "Spotify",
    icon: <FaSpotify />,
    url: "https://open.spotify.com/artist/7JbTYZ8EIOAb20H29pVbHm",
    color: "#1DB954",
  },
  {
    name: "YouTube Music",
    icon: <SiYoutubemusic />,
    url: "https://music.youtube.com/channel/UCri5fxVbXrFmlR_slBdP2MA",
    color: "#FF0000",
  },
  {
    name: "SoundCloud",
    icon: <FaSoundcloud />,
    url: "https://soundcloud.com/jessicamulein",
    color: "#FF5500",
  },
  {
    name: "Amazon Music",
    icon: <FaAmazon />,
    url: "https://music.amazon.com/artists/B092799HML/jessica-mulein",
    color: "#FF9900",
  },
  {
    name: "Tidal",
    icon: <SiTidal />,
    url: "https://tidal.com/artist/24370637",
    color: "#000000",
  },
];

const Music = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="music" id="music" ref={ref}>
      <motion.div
        className="music-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="section-title gradient-text"
          variants={itemVariants}
        >
          <FaMusic style={{ marginRight: "0.5rem" }} />
          Music
        </motion.h2>

        <motion.p className="music-description" variants={itemVariants}>
          Beyond the terminal, I'm a musician and composer. You can find my
          music on these platforms:
        </motion.p>

        <motion.div className="music-platforms" variants={containerVariants}>
          {platforms.map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="music-platform-card glass"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{ "--platform-color": platform.color } as React.CSSProperties}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Music;
