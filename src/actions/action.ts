"use server";
import prisma from "@/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

interface Word {
  id: number;
  word: string;
  translation: string;
  level: string;
  category: string;
}
const { isAuthenticated } = getKindeServerSession();
const shuffleArray = (array: Word[]): Word[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Меняем местами элементы
  }
  return array;
};

export const handleSubmit = async ({
  level,
  category,
  difficulty,
}: {
  level: string;
  category: string;
  difficulty: string;
}) => {
  const data = await prisma.word.findMany({
    where: {
      level: level,
      category: category,
    },
  });

  let numberOfCards = 0;
  switch (difficulty) {
    case "Easy":
      numberOfCards = 5;
      break;
    case "Mid":
      numberOfCards = 10;
      break;
    case "Hard":
      numberOfCards = 15;
      break;
    default:
      numberOfCards = 1; // по умолчанию
  }
  const shuffledData = shuffleArray(data);
  return shuffledData.slice(0, numberOfCards);
};

export const revalidatePathFunc = () => {
  revalidatePath("/cards");
};

export const getBestTime = async (difficulty: string | undefined | null) => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const userLogging = await getUser();

  if (!isLoggedIn || !userLogging.id) {
    return;
  }

  const data = await prisma.user.findUnique({
    where: {
      user_id: userLogging.id,
    },
  });

  if (difficulty === "Easy") {
    return data?.bestTimeEasy;
  }
  if (difficulty === "Mid") {
    return data?.bestTimeMid;
  }
  if (difficulty === "Hard") {
    return data?.bestTimeHard;
  }
};

export const updateBestTime = async (
  user: string | undefined,
  difficulty: string | undefined | null,
  seconds: number
) => {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    return;
  }

  const userData = await prisma.user.findUnique({
    where: {
      user_id: user,
    },
  });

  if (difficulty === "Easy") {
    if (userData?.bestTimeEasy && seconds + 1 < userData.bestTimeEasy) {
      await prisma.user.update({
        where: {
          user_id: user,
        },
        data: {
          bestTimeEasy: seconds + 1,
        },
      });
    } else {
      if (userData?.bestTimeEasy === 0) {
        await prisma.user.update({
          where: {
            user_id: user,
          },
          data: {
            bestTimeEasy: seconds + 1,
          },
        });
      }
      return;
    }
  } else if (difficulty === "Mid") {
    if (userData?.bestTimeMid && seconds + 1 < userData.bestTimeMid) {
      await prisma.user.update({
        where: {
          user_id: user,
        },
        data: {
          bestTimeMid: seconds + 1,
        },
      });
    } else {
      if (userData?.bestTimeMid === 0) {
        await prisma.user.update({
          where: {
            user_id: user,
          },
          data: {
            bestTimeMid: seconds + 1,
          },
        });
      }
      return;
    }
  } else if (difficulty === "Hard") {
    if (userData?.bestTimeHard && seconds + 1 < userData.bestTimeHard) {
      await prisma.user.update({
        where: {
          user_id: user,
        },
        data: {
          bestTimeHard: seconds + 1,
        },
      });
    } else {
      if (userData?.bestTimeHard === 0) {
        await prisma.user.update({
          where: {
            user_id: user,
          },
          data: {
            bestTimeHard: seconds + 1,
          },
        });
      }
      return;
    }
  } else {
    return;
  }
};
