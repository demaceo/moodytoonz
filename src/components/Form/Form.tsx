import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormProps } from "../common/Types";
import "./Form.css";
import { moodsData } from "../common/moods";
import {
  angry,
  sad,
  happy,
  chill,
  amorous,
  excited,
  melancholic,
  motivational,
  dreamy,
  // adventure,
  // dark,
  // surreal,
  peaceful,
  // hypnotic,
  // spiritual,
} from "../../utilities/icons";

const Form = ({ getMoodyTunes, updateMood, setDecade }: FormProps) => {
  const [mood, setMood] = useState<string | null>(null);
  const [moodName, setMoodName] = useState("");
  const [decade, setLocalDecade] = useState("");

  const handleClick = () => {
    if (mood) {
      getMoodyTunes(mood, moodName);
      updateMood(moodName);
    }
  };

  const handleDecadeClick = (decadeStr: string) => {
    setLocalDecade(decadeStr);
    setDecade(decadeStr); // Update decade state in App.tsx
  };

  const getStylings = (selector: string, elementId: string) => {
    return selector === elementId ? "selected-choice" : "choice";
  };

  const handleMood = (moodWord: string) => {
    const moodObj = moodsData.find(
      (item) => item.mood.toLowerCase() === moodWord.toLowerCase()
    );
    if (moodObj) {
      const { target_valence, target_energy } = moodObj;
      setMood(
        `${target_valence[0]},${target_valence[1]},${target_energy[0]},${target_energy[1]}`
      );
      setMoodName(moodWord);
    }
  };

  const disableLink = () => {
    return mood ? "submit-link" : "disabled-link";
  };

  const showActive = () => {
    return mood ? "submit-button" : "submit-button-inactive";
  };

  return (
    <div className="form-view">
      <form action="/action_page.php">
        <h2>Generate a list of songs that fit your mood.</h2>
        <br />
        <p className="form-subheader">
          Please select your <b>Mood</b>:
        </p>
        <br />
        <div className="form-options moods">
          {moodsData.map((item) => (
            <p
              key={item.mood}
              className={`icon ${getStylings(moodName, item.mood)}`}
              onClick={() => handleMood(item.mood)}
            >
              {item.mood === "Happy"
                ? happy
                : item.mood === "Sad"
                ? sad
                : item.mood === "Chill"
                ? chill
                : item.mood === "Amorous"
                ? amorous
                : item.mood === "Angry"
                ? angry
                : item.mood === "Melancholic"
                ? melancholic
                : item.mood === "Motivational"
                ? motivational
                : item.mood === "Dreamy"
                ? dreamy
                : // : item.mood === "Adventure"
                // ? adventure
                // : item.mood === "Dark"
                // ? dark
                // : item.mood === "Surreal"
                // ? surreal
                item.mood === "Peaceful"
                ? peaceful
                : // : item.mood === "Hypnotic"
                  // ? hypnotic
                  // : item.mood === "Spiritual"
                  // ? spiritual
                  excited}
              <span>{item.mood}</span>
            </p>
          ))}
        </div>
        <br />

        <p className="form-subheader">
          Please select a <b>Decade</b> <i>(optional)</i>:
        </p>
        <br />
        <div className="form-options decades">
          {["40", "50", "60", "70", "80", "90", "00", "10", "20"].map(
            (decadeStr) => (
              <p
                key={decadeStr}
                className={`icon ${getStylings(decade, decadeStr)}`}
                onClick={() => handleDecadeClick(decadeStr)}
              >
                {parseInt(decadeStr) <= 20
                  ? `20${decadeStr}s`
                  : `19${decadeStr}s`}
              </p>
            )
          )}
        </div>
        <br />
        <Link className={disableLink()} to="/results">
          <button className={showActive()} onClick={handleClick}>
            Get Songs
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
