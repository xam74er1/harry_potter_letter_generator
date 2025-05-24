import React from 'react';
import './LoveEnvelope.css';

const HogwartsLetter = () => {
  return (
    <div className="envelope">
      <div className="envelope-flap"></div>
      <div className="envelope-body"></div>
      <div className="letter">
        <h1>Hogwarts School of Witchcraft and Wizardry</h1>
        <p>Dear Student,</p>
        <p>
          We are pleased to inform you that you have been accepted at Hogwarts School of
          Witchcraft and Wizardry. Please find enclosed a list of all necessary books and equipment.
        </p>
        <p>
          Term begins on 1 September. We await your owl by no later than 31 July.
        </p>
        <p>Yours sincerely,</p>
        <p><strong>Minerva McGonagall</strong><br/>Deputy Headmistress</p>
      </div>
    </div>
  );
};

export default HogwartsLetter;