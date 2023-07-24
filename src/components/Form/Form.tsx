import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FormProps} from '../common/Types';
import './Form.css';
import { angry, sad, happy, chill, amorous, excited } from '../../utilities/icons';

const Form = ({ getMoodyTunes, updateMood }: FormProps) => {
  const [mood, setMood] = useState('');
  const [moodName, setMoodName] = useState('');
  const [decade, setDecade] = useState('');

  const handleClick = (event: MouseEvent) => {
    getMoodyTunes(mood, decade);
    updateMood(moodName)
  }

const getStylings = (selector:string, elementId:string) => {
  let className = selector === elementId ? 'selected-choice' : 'choice';
  return className
}

const handleMood = (moodNum: string, moodWord: string) => {
  setMood(moodNum);
  setMoodName(moodWord);
}

const disableLink = () => {
  let isDisabled = mood ? 'submit-link' : 'disabled-link';
  return isDisabled
}

const showActive = () => {
  let isActive = mood ? 'submit-button' : 'submit-button-inactive';
  return isActive
}

  return (
    <div className='form-view'>
      <form action="/action_page.php">
        <h2>Generate a list of songs that fit your mood.</h2>
        <br/>
        <p className='form-subheader'>Please select your <b>Mood</b>:</p>
        <br/>
        <div className='form-options'>
          <p className= { `icon ${getStylings(mood, '580000,950000')}` } onClick={ event => handleMood('580000,950000', 'Happy') }>
          { happy }
          Happy
          </p>
          <p className= { `icon ${getStylings(mood, '235000,91000')}` } onClick={ event => handleMood('235000,91000', 'Sad') }>
            { sad }
          Sad
          </p>
          <p className= { `icon ${getStylings(mood, '100000,900000')}` } onClick={ event => handleMood('100000,900000', 'Chill') }>
          { chill }
          Chill
          </p>
          <p className= { `icon ${getStylings(mood, '925000, 607500')}` } onClick={ event => handleMood('925000, 607500', 'Amorous') }>
          { amorous }
          Amorous
          </p>
          <p className= { `icon ${getStylings(mood, '862500, 850000')}` } onClick={ event => handleMood('862500, 850000', 'Excited') }>
          { excited }
          Excited
          </p>
          <p className= { `icon ${getStylings(mood, '895000,295000')}` } onClick={ event => handleMood('895000,295000', 'Angry') }>
          { angry }
          Angry
          </p>
        </div>
        <br/>

        <p className='form-subheader'>Please select a <b>Decade</b>:</p>
        <br/>
        <div className='form-options decades'>
        <p className={ `icon ${getStylings(decade, 'date50')}` } onClick={ event => setDecade('date50')}>1950s</p><br/>
        <p className={ `icon ${getStylings(decade, 'date60')}` } onClick={ event => setDecade('date60')}>1960s</p><br/>
        <p className={ `icon ${getStylings(decade, 'date70')}` } onClick={ event => setDecade('date70')}>1970s</p><br/>
        <p className={ `icon ${getStylings(decade, 'date80')}` } onClick={ event => setDecade('date80')}>1980s</p><br/>
        <p className={ `icon ${getStylings(decade, 'date90')}` } onClick={ event => setDecade('date90')}>1990s</p><br/>
        <p className={ `icon ${getStylings(decade, 'date00')}` } onClick={ event => setDecade('date00')}>2000s</p><br/>
        <p className={ `icon ${getStylings(decade, 'date10')}` } onClick={ event => setDecade('date10')}>2010s</p><br/>
        </div>
        <br/>
        <Link
          className={ disableLink() }
          to='/results'>
          <button
            className={ showActive() }
            onClick={ (event: React.MouseEvent<HTMLElement>) => handleClick(event as any) }>
            Get Songs
          </button>
        </Link>
      </form>
    </div>
   );
}

export default Form;
