"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const VIdeo = () => {
  const [videoSize, setVideoSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 700) {
        setVideoSize({ width: 350, height: 250 }); // Размер для маленьких экранов
      } else {
        setVideoSize({ width: 500, height: 300 }); // Размер для больших экранов
      }
    };

    updateSize(); // Устанавливаем размер при загрузке компонента
    window.addEventListener("resize", updateSize); // Слушатель для изменения размера окна

    return () => window.removeEventListener("resize", updateSize); // Очистка слушателя при размонтировании
  }, []);

  return (
    <div>
      <ReactPlayer
        url="https://youtu.be/-biWl7btRQs"
        width={videoSize.width}
        height={videoSize.height}
      />
    </div>
  );
};

export default VIdeo;
