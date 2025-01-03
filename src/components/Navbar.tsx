"use client";
import styles from "@/styles/navbar.module.css";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();

  return (
    <div className={styles.navbar}>
      <Link href={"/"} className={styles.navbarButton}>
        Home
      </Link>
      <Link href={"/cards"} className={styles.navbarButton}>
        Cards
      </Link>
      <Link href={"/learn"} className={styles.navbarButton}>
        Learn
      </Link>
      <Link
        href={"/resources"}
        className={`${styles.navbarButton} ${styles.navbarButtonSecondary}`}
      >
        Resources
      </Link>

      <div className={styles.navbarUserInfo}>
        {user?.picture ? (
          <Image
            src={user.picture}
            alt="User Image"
            width={40}
            height={40}
            className={styles.userImage}
          />
        ) : (
          <div>{user?.given_name?.[0]}</div>
        )}
        {isAuthenticated ? (
          <LogoutLink className={styles.logBtn}>Logout</LogoutLink>
        ) : (
          <LoginLink className={styles.logInBtn}>Login</LoginLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
