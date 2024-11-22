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

const Form = ({ getMoodyTunes, updateMood }: FormProps) => {
  const [mood, setMood] = useState<string | null>(null);
  const [moodName, setMoodName] = useState("");
  const [decade, setDecade] = useState("");

  const handleClick = () => {
    if (mood) {
      getMoodyTunes(mood, moodName);
      updateMood(moodName);
    }
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
          {["40", "50", "60", "70", "80", "90", "00", "10", "20"].map((decadeStr) => (
            <p
              key={decadeStr}
              className={`icon ${getStylings(decade, decadeStr)}`}
              onClick={() => setDecade(decadeStr)}
            >
              {parseInt(decadeStr) <= 20 ? `20${decadeStr}s` : `19${decadeStr}s`}
            </p>
          ))}
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

// const Form = ({ getMoodyTunes, updateMood }: FormProps) => {
//   const [mood, setMood] = useState("");
//   const [moodName, setMoodName] = useState("");
//   const [decade, setDecade] = useState("");

//   const handleClick = (event: MouseEvent) => {
//     getMoodyTunes(mood, decade, moodName);
//     updateMood(moodName);
//   };

//   const getStylings = (selector: string, elementId: string) => {
//     let className = selector === elementId ? "selected-choice" : "choice";
//     return className;
//   };

//   const handleMood = (moodNum: string, moodWord: string) => {
//     setMood(moodNum);
//     setMoodName(moodWord);
//   };

//   const disableLink = () => {
//     let isDisabled = mood ? "submit-link" : "disabled-link";
//     return isDisabled;
//   };

//   const showActive = () => {
//     let isActive = mood ? "submit-button" : "submit-button-inactive";
//     return isActive;
//   };

//   return (
//     <div className="form-view">
//       <form action="/action_page.php">
//         <h2>Generate a list of songs that fit your mood.</h2>
//         <br />
//         <p className="form-subheader">
//           Please select your <b>Mood</b>:
//         </p>
//         <br />
//         <div className="form-options">
//           <p
//             className={`icon ${getStylings(mood, ".8,.9")}`}
//             onClick={(event) => handleMood(".8,.9", "Happy")}
//           >
//             {happy}
//             Happy
//           </p>
//           <p
//             className={`icon ${getStylings(mood, ".1,.2")}`}
//             onClick={(event) => handleMood(".1,.2", "Sad")}
//           >
//             {sad}
//             Sad
//           </p>
//           <p
//             className={`icon ${getStylings(mood, ".4,.5")}`}
//             onClick={(event) => handleMood(".4,.5", "Chill")}
//           >
//             {chill}
//             Chill
//           </p>
//           <p
//             className={`icon ${getStylings(mood, ".9,.6")}`}
//             onClick={(event) => handleMood(".9,.6", "Amorous")}
//           >
//             {amorous}
//             Amorous
//           </p>
//           <p
//             className={`icon ${getStylings(mood, ".9,1")}`}
//             onClick={(event) => handleMood(".9,1", "Excited")}
//           >
//             {excited}
//             Excited
//           </p>
//           <p
//             className={`icon ${getStylings(mood, ".1,.9")}`}
//             onClick={(event) => handleMood(".1,.9", "Angry")}
//           >
//             {angry}
//             Angry
//           </p>
//         </div>
//         <br />

//         <p className="form-subheader">
//           Please select a <b>Decade</b>:
//         </p>
//         <br />
//         <div className="form-options decades">
//           <p
//             className={`icon ${getStylings(decade, "50")}`}
//             onClick={(event) => setDecade("50")}
//           >
//             1950s
//           </p>
//           <br />
//           <p
//             className={`icon ${getStylings(decade, "60")}`}
//             onClick={(event) => setDecade("60")}
//           >
//             1960s
//           </p>
//           <br />
//           <p
//             className={`icon ${getStylings(decade, "70")}`}
//             onClick={(event) => setDecade("70")}
//           >
//             1970s
//           </p>
//           <br />
//           <p
//             className={`icon ${getStylings(decade, "80")}`}
//             onClick={(event) => setDecade("80")}
//           >
//             1980s
//           </p>
//           <br />
//           <p
//             className={`icon ${getStylings(decade, "90")}`}
//             onClick={(event) => setDecade("90")}
//           >
//             1990s
//           </p>
//           <br />
//           <p
//             className={`icon ${getStylings(decade, "00")}`}
//             onClick={(event) => setDecade("00")}
//           >
//             2000s
//           </p>
//           <br />
//           <p
//             className={`icon ${getStylings(decade, "10")}`}
//             onClick={(event) => setDecade("10")}
//           >
//             2010s
//           </p>
//           <br />
//         </div>
//         <br />
//         <Link className={disableLink()} to="/results">
//           <button
//             className={showActive()}
//             onClick={(event: React.MouseEvent<HTMLElement>) =>
//               handleClick(event as any)
//             }
//           >
//             Get Songs
//           </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

export default Form;
