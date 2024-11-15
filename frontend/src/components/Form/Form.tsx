import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormProps } from "../common/Types";
import "./Form.css";
import {
  angry,
  sad,
  happy,
  chill,
  amorous,
  excited,
} from "../../utilities/icons";

const Form = ({ getMoodyTunes, updateMood }: FormProps) => {
  const [mood, setMood] = useState("");
  const [moodName, setMoodName] = useState("");
  const [decade, setDecade] = useState("");

  const handleClick = (event: MouseEvent) => {
    getMoodyTunes(mood, decade, moodName);
    updateMood(moodName);
  };

  const getStylings = (selector: string, elementId: string) => {
    let className = selector === elementId ? "selected-choice" : "choice";
    return className;
  };

  const handleMood = (moodNum: string, moodWord: string) => {
    setMood(moodNum);
    setMoodName(moodWord);
  };

  const disableLink = () => {
    let isDisabled = mood ? "submit-link" : "disabled-link";
    return isDisabled;
  };

  const showActive = () => {
    let isActive = mood ? "submit-button" : "submit-button-inactive";
    return isActive;
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
        <div className="form-options">
          <p
            className={`icon ${getStylings(mood, ".8,.9")}`}
            onClick={(event) => handleMood(".8,.9", "Happy")}
          >
            {/* Happy
            valence .7-1
            energy .6-.9
            */}
            {happy}
            Happy
          </p>
          <p
            className={`icon ${getStylings(mood, ".1,.2")}`}
            onClick={(event) => handleMood(".1,.2", "Sad")}
          >
            {/* Sad
            valence 0 -.3
            energy .2 -.4
            */}
            {sad}
            Sad
          </p>
          <p
            className={`icon ${getStylings(mood, ".4,.5")}`}
            onClick={(event) => handleMood(".4,.5", "Chill")}
          >
            {/* Chill
            valence .4-.7
            energy .2-.5
            */}
            {chill}
            Chill
          </p>
          <p
            className={`icon ${getStylings(mood, ".9,.6")}`}
            onClick={(event) => handleMood(".9,.6", "Amorous")}
          >
            {/* Romantic
            valence .5-.9
            energy .3-.6
            */}
            {amorous}
            Amorous
          </p>
          <p
            className={`icon ${getStylings(mood, ".9,1")}`}
            onClick={(event) => handleMood(".9,1", "Excited")}
          >
            {/* Excited
            valence 
            energy 
            */}
            {excited}
            Excited
          </p>
          <p
            className={`icon ${getStylings(mood, ".1,.9")}`}
            // onClick={(event) => handleMood("895000,295000", "Angry")}
            onClick={(event) => handleMood(".1,.9", "Angry")}
          >
            {/* Angry
            valence 0-.2
            energy .8-1
            */}
            {angry}
            Angry
          </p>
        </div>
        <br />

        <p className="form-subheader">
          Please select a <b>Decade</b>:
        </p>
        <br />
        <div className="form-options decades">
          <p
            className={`icon ${getStylings(decade, "50")}`}
            onClick={(event) => setDecade("50")}
          >
            1950s
          </p>
          <br />
          <p
            className={`icon ${getStylings(decade, "60")}`}
            onClick={(event) => setDecade("60")}
          >
            1960s
          </p>
          <br />
          <p
            className={`icon ${getStylings(decade, "70")}`}
            onClick={(event) => setDecade("70")}
          >
            1970s
          </p>
          <br />
          <p
            className={`icon ${getStylings(decade, "80")}`}
            onClick={(event) => setDecade("80")}
          >
            1980s
          </p>
          <br />
          <p
            className={`icon ${getStylings(decade, "90")}`}
            onClick={(event) => setDecade("90")}
          >
            1990s
          </p>
          <br />
          <p
            className={`icon ${getStylings(decade, "00")}`}
            onClick={(event) => setDecade("00")}
          >
            2000s
          </p>
          <br />
          <p
            className={`icon ${getStylings(decade, "10")}`}
            onClick={(event) => setDecade("10")}
          >
            2010s
          </p>
          <br />
        </div>
        <br />
        <Link className={disableLink()} to="/results">
          <button
            className={showActive()}
            onClick={(event: React.MouseEvent<HTMLElement>) =>
              handleClick(event as any)
            }
          >
            Get Songs
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
