"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "@/styles/cardspage.module.css";
import {
  handleSubmit,
  revalidatePathFunc,
  getBestTime,
  updateBestTime,
} from "@/actions/action";
import { CSSTransition } from "react-transition-group";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ReactConfetti from "react-confetti";

interface WordData {
  id: number;
  word: string;
  translation: string;
  level: string;
  category: string;
}

const shuffleArray = (array: WordData[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
  }
  return shuffledArray;
};

const Page = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [level, setLevel] = useState("A1");
  const [category, setCategory] = useState("Food");
  const [difficulty, setDifficulty] = useState("Easy");
  const [showGame, setShowGame] = useState(false);
  const [mergedData, setMergedData] = useState<WordData[]>([]);
  const [firstActiveCard, setFirstActiveCard] = useState<number>(0);
  const [secondActiveCard, setSecondActiveCard] = useState<number>(0);
  const [firstCardIndex, setFirstCardIndex] = useState<number>(-1);
  const [secondCardIndex, setSecondCardIndex] = useState<number>(-1);
  const [winnersArray, setWinnersArray] = useState<number[]>([]);
  const [ability, setAbility] = useState(true);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [startGame, setStartGame] = useState(false);
  const [userBestTime, setUserBestTime] = useState(0);

  const closeModal = async () => {
    setModalVisible(false);
    setShowGame(false);
    setWinnersArray([]);
    setFlippedIndexes([]);
    setSeconds(0);
    const data = await handleSubmit({
      level: level,
      category: category,
      difficulty: difficulty,
    });

    if (data) {
      const shuffledData = shuffleArray(data);
      const shuffledCopiedData = shuffleArray(data);
      const merged = [...shuffledData, ...shuffledCopiedData];
      setMergedData(shuffleArray(merged));
      revalidatePathFunc();
    }
  };
  const handleShowGame = async () => {
    const userBT = await getBestTime(difficulty);
    if (userBT) {
      setUserBestTime(userBT);
    }
    setShowGame(true);
    setStartGame(true);
    const data = await handleSubmit({
      level: level,
      category: category,
      difficulty: difficulty,
    });

    if (data) {
      const shuffledData = shuffleArray(data);
      const shuffledCopiedData = shuffleArray(data);
      const merged = [...shuffledData, ...shuffledCopiedData];
      setMergedData(shuffleArray(merged));
    }
  };

  useEffect(() => {
    if (startGame === true) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [startGame]);

  const stopTimer = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      await updateBestTime(user?.id, difficulty, seconds);
    }
  };

  const handleClick = (id: number, index: number) => {
    if (ability && !flippedIndexes.includes(index)) {
      setFlippedIndexes([...flippedIndexes, index]);

      if (firstActiveCard === 0) {
        setFirstActiveCard(id);
        setFirstCardIndex(index);
      } else {
        setSecondCardIndex(index);
        setSecondActiveCard(id);
      }
    }
  };

  useEffect(() => {
    if (secondCardIndex !== -1 && firstCardIndex === secondCardIndex) {
      setFirstActiveCard(0);
      setSecondActiveCard(0);
      setFirstCardIndex(-1);
      setSecondCardIndex(-1);
    }
  }, [firstCardIndex, secondCardIndex]);

  useEffect(() => {
    if (firstActiveCard !== secondActiveCard && secondActiveCard !== 0) {
      setAbility(false);
      setIsWrong(true);
      setTimeout(() => {
        setFlippedIndexes((prev) =>
          prev.filter(
            (index) => index !== firstCardIndex && index !== secondCardIndex
          )
        );
        setFirstActiveCard(0);
        setSecondActiveCard(0);
        setFirstCardIndex(-1);
        setSecondCardIndex(-1);
        setAbility(true);
        setIsWrong(false);
      }, 1000);
    } else if (
      firstActiveCard === secondActiveCard &&
      secondActiveCard !== 0 &&
      firstCardIndex !== secondCardIndex &&
      secondCardIndex !== -1
    ) {
      setWinnersArray([...winnersArray, firstCardIndex, secondCardIndex]);
      setFirstCardIndex(-1);
      setSecondCardIndex(-1);
      setFirstActiveCard(0);
      setSecondActiveCard(0);
    }
  }, [firstActiveCard, secondActiveCard]);

  useEffect(() => {
    if (difficulty === "Easy") {
      if (winnersArray.length === 10) {
        setTimeout(async () => {
          setStartGame(false);
          stopTimer();

          setModalVisible(true);
        }, 1000);
      }
    }
    if (difficulty === "Mid") {
      if (winnersArray.length === 20) {
        setTimeout(() => {
          setStartGame(false);
          stopTimer();
          setModalVisible(true);
        }, 1000);
      }
    }
    if (difficulty === "Hard") {
      if (winnersArray.length === 30) {
        setTimeout(() => {
          setStartGame(false);
          stopTimer();
          setModalVisible(true);
        }, 1000);
      }
    }
  }, [winnersArray]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.rightPart}>
        <h1 className={styles.header}>Flashcards</h1>
        {showGame === true ? (
          <div>
            {isAuthenticated && userBestTime !== 0 && (
              <div className={styles.bestTime}>
                {userBestTime && (
                  <div>Your best time: {userBestTime} seconds</div>
                )}
              </div>
            )}

            <div className={styles.flashcards}>
              {mergedData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(item.id, index)}
                  className={`${styles.flashcard} ${
                    flippedIndexes.includes(index) ||
                    winnersArray.includes(index)
                      ? styles.flipped
                      : ""
                  }`}
                >
                  {winnersArray.includes(index) ? (
                    <div className={styles.cardContent}>
                      <h2 lang="de" className={styles.flashcardHeaderWin}>
                        {item.word}
                      </h2>
                      <p>{item.translation}</p>
                    </div>
                  ) : flippedIndexes.includes(index) ? (
                    <div className={styles.cardContent}>
                      <h2
                        lang="de"
                        className={
                          isWrong
                            ? styles.flashcardHeaderWrong
                            : styles.flashcardHeader
                        }
                      >
                        {item.word}
                      </h2>
                      <p>{item.translation}</p>
                    </div>
                  ) : (
                    <div className={styles.cardBack}>
                      <h2 className={styles.headerIndex}>{index + 1}</h2>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.formDiv}>
            <div className={styles.form}>
              {/* Level Category */}
              <div className={styles.category}>
                <label className={styles.categoryLabel}>Level</label>
                <div className={styles.radioGroup}>
                  <label htmlFor="la1" className={styles.radioLabel}>
                    <input
                      id="la1"
                      type="radio"
                      name="level"
                      value="A1"
                      className={styles.radioInput}
                      onChange={() => setLevel("A1")}
                      defaultChecked
                    />
                    A1
                  </label>
                  <label htmlFor="la2" className={styles.radioLabel}>
                    <input
                      id="la2"
                      type="radio"
                      name="level"
                      value="A2"
                      className={styles.radioInput}
                      onChange={() => setLevel("A2")}
                    />
                    A2
                  </label>
                  <label htmlFor="lb1" className={styles.radioLabel}>
                    <input
                      id="lb1"
                      type="radio"
                      name="level"
                      value="B1"
                      className={styles.radioInput}
                      onChange={() => setLevel("B1")}
                    />
                    B1
                  </label>
                  <label htmlFor="lb2" className={styles.radioLabel}>
                    <input
                      id="lb2"
                      type="radio"
                      name="level"
                      value="B2"
                      className={styles.radioInput}
                      onChange={() => setLevel("B2")}
                    />
                    B2
                  </label>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className={styles.category}>
                <label className={styles.categoryLabel}>Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  className={styles.selectInput}
                >
                  <option value="Food">Food</option>
                  <option value="Sport">Sport</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Hobby">Hobby</option>
                </select>
              </div>

              {/* Difficulty Category */}
              <div className={styles.category}>
                <label className={styles.categoryLabel}>Difficulty</label>
                <div className={styles.radioGroup}>
                  <label htmlFor="easy" className={styles.radioLabel}>
                    <input
                      id="easy"
                      type="radio"
                      name="difficulty"
                      value="easy"
                      className={styles.radioInput}
                      onChange={() => setDifficulty("Easy")}
                      defaultChecked
                    />
                    Easy
                  </label>
                  <label htmlFor="medium" className={styles.radioLabel}>
                    <input
                      id="medium"
                      type="radio"
                      name="difficulty"
                      value="medium"
                      className={styles.radioInput}
                      onChange={() => setDifficulty("Mid")}
                    />
                    Medium
                  </label>
                  <label htmlFor="hard" className={styles.radioLabel}>
                    <input
                      id="hard"
                      type="radio"
                      name="difficulty"
                      value="hard"
                      className={styles.radioInput}
                      onChange={() => setDifficulty("Hard")}
                    />
                    Hard
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleShowGame}
              >
                Start
              </button>
            </div>
          </div>
        )}

        <CSSTransition
          in={modalVisible}
          timeout={300}
          classNames={{
            enter: styles.modalEnter,
            enterActive: styles.modalEnterActive,
            exit: styles.modalExit,
            exitActive: styles.modalExitActive,
          }}
          unmountOnExit
        >
          <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
              <h2>
                {seconds + 1 < userBestTime ? "Wow! New Record!" : "Good Job!"}
              </h2>
              <h3>Your time: {seconds} seconds!</h3>
              {seconds < userBestTime && (
                <ReactConfetti
                  className={styles.coolConfetti}
                  numberOfPieces={250}
                  gravity={0.2}
                  colors={[
                    "#FF5733",
                    "#33FF57",
                    "#3357FF",
                    "#F0F033",
                    "#FF33F6",
                    "#33FFF5",
                    "#FF8033",
                  ]}
                />
              )}
              <button onClick={closeModal} className={styles.closeButton}>
                Try again
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Page;
