"use client"

import ColorSelectors from "@/app/ColorSelectors";
import {useEffect, useState} from "react";
import tinycolor from "tinycolor2";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import {Properties} from "csstype";
import {Leaderboard} from "@/app/Leaderboard";

export default function Home() {
  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [quizColor, setQuizColor] = useState(randomColor());
  const [color, setColor] = useState(randomColor());
  const [highestAcc, setHighestAcc] = useState("0");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const maxDiff = ((255 ** 2) * 3) ** .5;
  const confettiDuration = 5;

  useEffect(() => {
    setQuizColor(randomColor());
    setColor(randomColor());
  }, []);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, (confettiDuration * .75) * 1000);
    }
  }, [showConfetti]);

  const quizColorContainer: Properties<string | number, string & object> = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: "50%",
    background: quizColor,
    zIndex: -1,
  };

  const colorContainer: Properties<string | number, string & object> = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    right: 0,
    background: color,
    zIndex: -1,
  };

  const onSubmit = () => {
    const rgb = tinycolor(color).toRgb();
    const qRgb = tinycolor(quizColor).toRgb();
    const diff = ((rgb.r - qRgb.r) ** 2 + (rgb.g - qRgb.g) ** 2 + (rgb.b - qRgb.b) ** 2) ** .5;
    const acc = ((maxDiff - diff) * 100 / maxDiff).toPrecision(4);
    alert(`${quizColor}\n${color}\ndiff: ${diff}\n${acc}% accuracy\nhighestAcc: ${highestAcc}`);

    if (acc > highestAcc) {
      setHighestAcc(acc);
      setShowConfetti(true);
    }
    setQuizColor(randomColor);
  };

  const roundedButton = (label: string, callback: (() => void)) =>
    <button
      onClick={callback}
      className="w-40 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500">
      {label}
    </button>;

  return (
    <div
      className="duration-200 flex flex-col items-center justify-items-center min-h-screen p-5 font-[family-name:var(--font-geist-sans)]">
      {showConfetti && <Realistic autorun={{speed: 50, duration: confettiDuration}}/>}
      {showLeaderboard && <Leaderboard onBackClicked={() => setShowLeaderboard(false)}/>}
      <header className="flex w-full">
        <div className="flex flex-col gap-5">
          <div className="text-3xl text-gray-800 text-center bg-white p-3 rounded-xl font-black drop-shadow-lg">
            Highest: {highestAcc}%
          </div>
          {roundedButton("Leaderboard", () => setShowLeaderboard(true))}
        </div>
      </header>
      <main className="flex-1 items-center sm:items-start">
        <div style={colorContainer}/>
        <div style={quizColorContainer}/>
      </main>
      <div className="flex m-5 gap-5">
        {roundedButton("Skip", () => setQuizColor(randomColor))}
        {roundedButton("Submit", onSubmit)}
      </div>
      <footer
        className="flex flex-wrap gap-5 items-center justify-center p-5 rounded-2xl bg-white drop-shadow-xl">
        <ColorSelectors color={color} onChange={setColor}/>
      </footer>
    </div>
  );
}
