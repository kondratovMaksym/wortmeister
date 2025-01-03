import LearnComponent from "@/components/LearnComponent";
import Navbar from "@/components/Navbar";
import styles from "@/styles/learnpage.module.css";
const Page = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.rightPart}>
        <h1 className={styles.header}>Learn</h1>
        <div>
          <LearnComponent />
        </div>
      </div>
    </div>
  );
};

export default Page;
