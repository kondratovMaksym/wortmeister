import Navbar from "@/components/Navbar";
import styles from "@/styles/homepage.module.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma";

import HeaderMainPage from "@/components/HeaderMainPage";

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    const userData = await prisma.user.findUnique({
      where: {
        user_id: user.id,
      },
    });
    if (userData === null) {
      await prisma.user.create({
        data: {
          user_id: user.id,
          username: `${user.given_name} ${user.family_name}`,
          bestTimeEasy: 0,
          bestTimeMid: 0,
          bestTimeHard: 0,
          wordsArray: [],
        },
      });
    }
  }
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.rightPart}>
        <div className={styles.content}>
          <HeaderMainPage logged={isLoggedIn} />
        </div>
      </div>
    </div>
  );
}
