"use client";

import { useState } from "react";
import styles from "@/styles/learncomponent.module.css";
import { handleLearnSubmit } from "@/actions/action";
import { CSSTransition } from "react-transition-group";
import restart from "@/images/icons8-restart-50.png";
import Image from "next/image";

interface WordData {
  id: number;
  word: string;
  translation: string;
  level: string;
  category: string;
}

const LearnComponent = () => {
  const [showGame, setShowGame] = useState(false);
  const [level, setLevel] = useState("A1");
  const [category, setCategory] = useState("Food");
  const [words, setWords] = useState<WordData[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [animation, setAnimation] = useState(false);

  const handleShowGame = async () => {
    setTimeout(() => {
      setAnimation(true);
    }, 100);
    setShowGame(true);
    const wordsArray = await handleLearnSubmit(level, category);
    setWords(wordsArray);
  };

  const handleStartAgain = () => {
    setShowGame(false);
    setWords([]);
    setLevel("A1");
    setCategory("Food");
    setWordIndex(0);
    setAnimation(false);
  };

  const handleChangeIndex = (value: string) => {
    if (value === "Next") {
      if (wordIndex !== words.length - 1) {
        setWordIndex((prev) => prev + 1);
      }
    } else {
      if (wordIndex !== 0) {
        setWordIndex((prev) => prev - 1);
      } else {
        return;
      }
    }
  };

  return (
    <>
      {showGame === true ? (
        <CSSTransition
          in={animation}
          timeout={500}
          classNames={{
            enter: styles.pEnter,
            enterActive: styles.pEnterActive,
            exit: styles.pExit,
            exitActive: styles.pExitActive,
          }}
          unmountOnExit
        >
          <div className={styles.wordDiv}>
            {words.map((item, index) => (
              <>
                {index === wordIndex ? (
                  <div className={styles.wordCard} lang="de">
                    <div className={styles.wordContent}>
                      <div
                        className={styles.againBtnDiv}
                        onClick={handleStartAgain}
                      >
                        <div className={styles.picDiv}>
                          <Image
                            className={styles.rotatePic}
                            src={restart}
                            alt="restart"
                            width={25}
                            height={25}
                          />
                        </div>
                      </div>
                      <div className={styles.word} key={item.id}>
                        {item.word}
                      </div>
                      <div className={styles.translation}>
                        {item.translation}
                      </div>
                      <div className={styles.definition}>
                        <a
                          target="blank"
                          href={`https://en.wikipedia.org/wiki/${item.translation}`}
                        >
                          Definition
                        </a>
                      </div>

                      <>
                        <div className={styles.navBtns}>
                          <button
                            className={styles.nextBtn}
                            onClick={() => handleChangeIndex("Prev")}
                            disabled={wordIndex === 0}
                          >
                            Prev
                          </button>
                          <button
                            className={styles.nextBtn}
                            onClick={() => handleChangeIndex("Next")}
                            disabled={wordIndex === words.length - 1}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </CSSTransition>
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
    </>
  );
};

export default LearnComponent;
