"use client";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import styles from "@/styles/linkdiv.module.css";

const LinkDiv = () => {
  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.pulsingButtonWrapper}>
        <LoginLink className={styles.logLink}>Log in</LoginLink>
      </div>
    </div>
  );
};

export default LinkDiv;
