import Navbar from "@/components/Navbar";
import styles from "@/styles/resourcespage.module.css";
import Image from "next/image";
import res from "@/images/icons8-books-50.png";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.rightPart}>
        <h1 className={styles.header}>Resources</h1>
        <div>
          <div className={styles.allResources}>
            <div className={styles.resource}>
              <div className={styles.topPart}>
                <div className={styles.logo}>
                  <Image
                    className={styles.picture}
                    src={res}
                    alt="Resource"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.resName}>Lingolia German</div>
              </div>
              <div className={styles.bottomPart}>
                <div className={styles.description}>
                  Offers free materials on grammar, vocabulary, and exercises
                  for German learners.
                </div>
              </div>
              <div className={styles.visitBtn}>
                <Link
                  target="blank"
                  className={styles.visitLink}
                  href={"https://deutsch.lingolia.com/en/"}
                >
                  Visit
                </Link>
              </div>
            </div>

            <div className={styles.resource}>
              <div className={styles.topPart}>
                <div className={styles.logo}>
                  <Image
                    className={styles.picture}
                    src={res}
                    alt="Resource"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.resName}>Learn German Online</div>
              </div>
              <div className={styles.bottomPart}>
                <div className={styles.description}>
                  Gathers the best online resources for learning German,
                  including courses, dictionaries, and study materials.
                </div>
              </div>
              <div className={styles.visitBtn}>
                <Link
                  target="blank"
                  className={styles.visitLink}
                  href={"https://www.learn-german-online.net"}
                >
                  Visit
                </Link>
              </div>
            </div>

            <div className={styles.resource}>
              <div className={styles.topPart}>
                <div className={styles.logo}>
                  <Image
                    className={styles.picture}
                    src={res}
                    alt="Resource"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.resName}>Deutsch lernen mit DW</div>
              </div>
              <div className={styles.bottomPart}>
                <div className={styles.description}>
                  Free online courses from Deutsche Welle for all levels, with
                  videos, audio, and interactive exercises.
                </div>
              </div>
              <div className={styles.visitBtn}>
                <Link
                  target="blank"
                  className={styles.visitLink}
                  href={"https://learngerman.dw.com/de/anfänger/s-62079021"}
                >
                  Visit
                </Link>
              </div>
            </div>

            <div className={styles.resource}>
              <div className={styles.topPart}>
                <div className={styles.logo}>
                  <Image
                    className={styles.picture}
                    src={res}
                    alt="Resource"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={styles.resName}>Open Culture</div>
              </div>
              <div className={styles.bottomPart}>
                <div className={styles.description}>
                  Provides free audio lessons and resources for learning German
                  online.
                </div>
              </div>
              <div className={styles.visitBtn}>
                <Link
                  target="blank"
                  className={styles.visitLink}
                  href={"https://www.openculture.com/free_german_lessons"}
                >
                  Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
