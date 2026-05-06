import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaSpotify,
  FaSoundcloud,
  FaAmazon,
  FaMusic,
} from "react-icons/fa";
import { SiApplemusic, SiYoutubemusic, SiTidal } from "react-icons/si";
import { TbWaveSine } from "react-icons/tb";
import "./Music.css";

interface SongLink {
  platform: string;
  url: string;
}

interface Song {
  title: string;
  coverUrl: string;
  year: number;
  instrument: 'piano' | 'synthesizer' | 'guitar';
  description: string;
  story: string;
  links: SongLink[];
}

const discography: Song[] = [
  {
    title: 'Atlantis (Remastered)',
    coverUrl: 'https://i1.sndcdn.com/artworks-4Gwtty51YxOgXpRb-pw9lHQ-t500x500.jpg',
    year: 1998,
    instrument: 'synthesizer',
    description: 'Music carries you gently across the surging ocean to places unseen',
    story: 'Written in 1998 after finding a set of a couple instruments I liked and playing with it for a few hours, I recorded Atlantis in one take.',
    links: [
      {
        platform: 'SoundCloud',
        url: 'https://soundcloud.com/jessicamulein/atlantis-remastered?si=1ac829730f454f9d8d52e508474353d4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      },
      {
        platform: 'Amazon Music',
        url: 'https://music.amazon.com/albums/B09LCHLW6B?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_wK72FEtDhgIDKXSHVJOKvtaw5&trackAsin=B09LCLYWRL',
      },
      {
        platform: 'Tidal',
        url: 'https://tidal.com/track/204461815/u',
      },
      {
        platform: 'YouTube Music',
        url: 'https://music.youtube.com/watch?v=bM_-H13bqUM&si=4pXvGCsfSfCQQ1Z3',
      },
      {
        platform: 'Spotify',
        url: 'https://open.spotify.com/track/3Yrdv4e9EJOVY1tjVL1iaV?si=ee579c8c4f1f4e76',
      }
    ]
  },
  {
    title: 'Frozen in Time',
    coverUrl: 'https://i1.sndcdn.com/artworks-T3sjtueLnBTCcPiC-aEmjgA-t1080x1080.jpg',
    year: 2005,
    instrument: 'guitar',
    description: 'An echoey acoustic guitar piece that evokes a nostalgic feeling of remembrance',
    story: 'I recorded this at my office in Iowa at a time when my youngest son was about a year old. This song came from my playing with the delay pedal and a general feeling of nostalgia and sadness.',
    links: [
      {
        platform: 'SoundCloud',
        url: 'https://soundcloud.com/jessicamulein/frozen-in-time?in=jessicamulein/sets/guitar-music&si=e6468e8d67c84342ac5b09586e56db9e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      },
    ]
  },
  {
    title: 'Echoes',
    coverUrl: 'https://i1.sndcdn.com/artworks-XOVUKgqUvTlfa9yI-eExA6Q-t1080x1080.jpg',
    year: 2005,
    instrument: 'guitar',
    description: 'An echoey acoustic guitar piece with an extensive use of delay pedal creating a sense of recursion and an echo of the past.',
    story: 'I recorded this at my office in Iowa at a time when my youngest son was about a year old. This song came from my playing with the delay pedal and a general feeling of nostalgia and sadness.',
    links: [
      {
        platform: 'SoundCloud',
        url: 'https://soundcloud.com/jessicamulein/echoes?in=jessicamulein/sets/guitar-music&si=f0ff824f07d04109b1752e3142e1b398&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      }
    ]
  },
  {
    title: 'Where are You?',
    coverUrl: 'https://resources.tidal.com/images/2e6a7559/8f66/41db/bf08/2d5b7ed07e41/1280x1280.jpg',
    year: 2021,
    instrument: 'synthesizer',
    description: 'A sine wave carrier in search of its listeners. A mother whale looking for its babies.',
    story: 'I recorded this in my studio in Washington after my children were kidnapped in the hopes that one day my children would know how my heart looked for them everywhere and called out for them.',
    links: [
      {
        platform: 'Tidal',
        url: 'https://tidal.com/track/204630571/u',
      },
      {
        platform: 'YouTube Music',
        url: 'https://music.youtube.com/watch?v=bO9LrQWrfCU&si=Z_km7DhOnvFbA1X-',
      },
      {
        platform: 'Spotify',
        url: 'https://open.spotify.com/track/3kasHSaClzLVkMLS6x9S99?si=2f38774658f84428',
      },
      {
        platform: 'Amazon Music',
        url: 'https://music.amazon.com/albums/B09LHN1C7H?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_HwIoEKHLxfrISHky4KZbVYTxd&trackAsin=B09LHKNJDM',
      }
    ]
  },
  {
    title: 'I Was Here Once Upon A Time',
    coverUrl: 'https://i1.sndcdn.com/artworks-OLKi8im7kYjUF0Fy-ncoBJg-t1080x1080.jpg',
    year: 2021,
    instrument: 'piano',
    description: 'Poigniant piano over a backdrop of rain with a sonic footprint of the musician.',
    story: 'This piece was composed in 2021 in my studio in Washington but I intentionally left a microphone and a window open to capture the rain and the creaks of my chair to capture my sonic footprint. When you play back the song, I am literally in the room vibrationally with you. This song is for my children who were kidnapped. I also have cancer and this song is my legacy.',
    links: [
      {
        platform: 'SoundCloud',
        url: 'https://soundcloud.com/jessicamulein/2020-1-noodle-3-remaster-1?si=96abc8e8d96042ae97274dd00325d940&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      },
      {
        platform: 'Tidal',
        url: 'https://tidal.com/track/204631479/u',      
      },
      {
        platform: 'YouTube Music',
        url: 'https://music.youtube.com/watch?v=c6atNCiO3zU&si=YttQ76xOoljFbNCC',
      },
      {
        platform: 'Spotify',
        url: 'https://open.spotify.com/track/6YW5aij94xzXU4q2KBb9Pw?si=61d74bce9f4b43a5',
      },
      {
        platform: 'Amazon Music',
        url: 'https://music.amazon.com/albums/B09LHNFMV7?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_O9gxkaTZQM4iSZNGvAMvWJlwR&trackAsin=B09LHMXQRN',
      }
    ]
  },
  {
    title: 'Mallets on Glass',
    coverUrl: 'https://i1.sndcdn.com/artworks-zNxE6zwREnz6aSaa-PWplUA-t1080x1080.jpg',
    year: 2021,
    instrument: 'synthesizer',
    description: 'A mallet exploration through a cave of music. An homage to Phillip Glass.',
    story: 'This piece was composed in 2021 using an intelligent synthesizer from Native Instruments and is a blend of human and computer in harmony',
    links: [
      {
        platform: 'SoundCloud',
        url: 'https://soundcloud.com/jessicamulein/mallets-on-glass?si=32ff6d1bf60a4d84b199d7d64e773870&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      },
      {
        platform: 'Tidal',
        url: 'https://tidal.com/track/204631772/u',
      },
      {
        platform: 'YouTube Music',
        url: 'https://music.youtube.com/watch?v=1zcuVbsMkLE&si=qPlGzIQMTcCJLfVe',
      },
      {
        platform: 'Spotify',
        url: 'https://open.spotify.com/track/4RYf0XzaVAyrm4OdTlyX6O?si=88d3c87dae9b46c1',
      },
      {
        platform: 'Amazon Music',
        url: 'https://music.amazon.com/albums/B09LHN4BHK?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_ab9GjeAk8hoAaWOKommXgp4KI&trackAsin=B09LHKSGPW',
      }
    ]
  }
];

const platformIcon = (platform: string) => {
  switch (platform) {
    case "Apple Music":
      return <SiApplemusic />;
    case "Spotify":
      return <FaSpotify />;
    case "YouTube Music":
      return <SiYoutubemusic />;
    case "SoundCloud":
      return <FaSoundcloud />;
    case "Amazon Music":
      return <FaAmazon />;
    case "Tidal":
      return <SiTidal />;
    default:
      return <FaMusic />;
  }
};

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

        <motion.h3
          className="discography-title gradient-text"
          variants={itemVariants}
        >
          Discography
        </motion.h3>

        <motion.p className="discography-note" variants={itemVariants}>
          Most of these tracks are not only 'one take'—they are 'one time only.'
          I cannot reproduce them again. They are non-reproducible captures of a
          volatile state of being, frozen in time and never to be re-run.
        </motion.p>

        <div className="discography-grid">
          {discography.map((song, index) => (
            <motion.div
              key={index}
              className="song-card glass"
              variants={itemVariants}
              whileHover={{ y: -6 }}
            >
              <div className="song-cover">
                <img src={song.coverUrl} alt={`${song.title} cover art`} />
              </div>

              <div className="song-header">
                <h4 className="song-title">{song.title}</h4>
                <span className="song-year">{song.year}</span>
                <span className="song-instrument" aria-label={song.instrument} title={song.instrument}>
                  {{ guitar: '🎸', piano: '🎹', synthesizer: <TbWaveSine /> }[song.instrument]}
                </span>
              </div>

              <p className="song-description">{song.description}</p>

              <details className="song-story-details">
                <summary>The story behind this track</summary>
                <p className="song-story">{song.story}</p>
              </details>

              <div className="song-links">
                {song.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="song-link"
                  >
                    {platformIcon(link.platform)} {link.platform}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Music;
