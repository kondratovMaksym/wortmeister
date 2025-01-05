"use client";
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "@/styles/headermainpage.module.css";
import LinkDiv from "./LinkDiv";
import Image from "next/image";
import cards from "@/images/icons8-flashcards-50.png";
import books from "@/images/icons8-books-50.png";
import learning from "@/images/icons8-learn-50.png";
import VIdeo from "./VIdeo";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const HeaderMainPage: React.FC<{ logged: boolean }> = ({ logged }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showSubHeader, setShowSubHeader] = useState(false);
  const [showEveryhting, setShowEverything] = useState(false);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    setShowHeader(true); // Запускаем анимацию h1 сразу
    setTimeout(() => setShowSubHeader(true), 1000); // Подзаголовок появляется через 1 сек.
    setTimeout(() => setShowEverything(true), 1500);
  }, []);

  return (
    <>
      <CSSTransition
        in={showHeader}
        timeout={1000} // Длительность анимации для h1: 1 секунда
        classNames={{
          enter: styles.h1Enter,
          enterActive: styles.h1EnterActive,
          exit: styles.h1Exit,
          exitActive: styles.h1ExitActive,
        }}
        unmountOnExit
      >
        <h1 className={styles.header}>Wortmeister</h1>
      </CSSTransition>

      <CSSTransition
        in={showSubHeader}
        timeout={500} // Длительность анимации для p: 0.5 сек.
        classNames={{
          enter: styles.pEnter,
          enterActive: styles.pEnterActive,
          exit: styles.pExit,
          exitActive: styles.pExitActive,
        }}
        unmountOnExit
      >
        <p className={styles.subHeader}>Master words, master yourself!</p>
      </CSSTransition>

      <>
        <CSSTransition
          in={showEveryhting}
          timeout={1500}
          classNames={{
            enter: styles.gameEnter,
            enterActive: styles.gameEnterActive,
            exit: styles.gameExit,
            exitActive: styles.gameExitActive,
          }}
          unmountOnExit
        >
          <>
            <div>
              {!logged ? (
                <LinkDiv />
              ) : (
                <div className={styles.userNameHeaderDiv}>
                  <div className={styles.userNameHeader}>
                    Welcome back {user?.given_name}
                  </div>
                </div>
              )}

              <div className={styles.subText}>
                <div>Wortmeister helps you master German with ease.</div>
                <div>
                  Learn new words , practice with flashcards and find helpful
                  resources.
                </div>
                <div>
                  Whether you are a beginner or advancing your skills,
                  Wortmeister keeps you motivated and on track.
                </div>
                <div>Start your journey today!</div>
              </div>

              <div className={styles.videoDiv}>
                <div className={styles.video}>
                  <VIdeo />
                </div>
              </div>

              <div className={styles.gameText}>
                Explore cool games, learn, and practice German!
              </div>

              <div className={styles.games}>
                <Link className={styles.linktogame} href={"/cards"}>
                  <div className={styles.game}>
                    <div className={styles.topPart}>
                      <div className={styles.gamePicture}>
                        <Image
                          className={styles.imageItself}
                          src={cards}
                          width={50}
                          height={50}
                          alt="cards"
                        ></Image>
                      </div>
                    </div>
                    <div className={styles.bottomPart}>
                      <div className={styles.gameDescription}>
                        Practice your German vocabulary with interactive
                        flashcards. Flip through words and their meanings, test
                        your memory, and improve your language skills in a fun
                        way.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link className={styles.linktogame} href={"/learn"}>
                  <div className={styles.game}>
                    <div className={styles.topPart}>
                      <div className={styles.gamePicture2}>
                        <Image
                          className={styles.imageItself}
                          src={learning}
                          width={50}
                          height={50}
                          alt="cards"
                        ></Image>
                      </div>
                    </div>
                    <div className={styles.bottomPart}>
                      <div className={styles.gameDescription}>
                        Discover new German words daily along with their
                        meanings. Improve your vocabulary with fresh words, and
                        expand your language skills one step at a time.
                      </div>
                    </div>
                  </div>
                </Link>

                <Link className={styles.linktogame} href={"/resources"}>
                  <div className={styles.gameLast}>
                    <div className={styles.topPart}>
                      <div className={styles.gamePicture3}>
                        <Image
                          className={styles.imageItself}
                          src={books}
                          width={50}
                          height={50}
                          alt="cards"
                        ></Image>
                      </div>
                    </div>
                    <div className={styles.bottomPart}>
                      <div className={styles.gameDescription}>
                        Discover a variety of external resources to support your
                        learning journey. Find websites, books, podcasts, and
                        more to enhance your German language skills.
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        </CSSTransition>
      </>
    </>
  );
};

export default HeaderMainPage;
