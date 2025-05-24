import React, { useState, useRef, useEffect } from 'react';
import './HogwartsEnvelope.css';
import ReactMarkdown from "react-markdown";

const MistralHogwartsLetter = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const [userData, setUserData] = useState({
    firstName: 'Harry',
    lastName: 'Potter',
    signature: 'Minerva McGonagall'
  });

  const lettersRef = useRef([]);
  const envelopeContainerRef = useRef(null);
  const lettersContainerRef = useRef(null);
  const zIndexCounter = useRef(10);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstName') || 'Harry';
    const lastName = urlParams.get('lastName') || 'Potter';
    const signature = urlParams.get('signature') || 'Minerva McGonagall';
    const rawContent = urlParams.get('content');

    const defaultContent = `
# Welcome, $fname $lname!

We are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry.

Please find enclosed a list of all necessary books and equipment.

Yours sincerely,

$signature
    `.trim();

    const contentToUse = rawContent || defaultContent;

    const replacedContent = contentToUse
      .replace(/\$fname/g, firstName)
      .replace(/\$lname/g, lastName)
      .replace(/\$signature/g, signature);

    setUserData({ firstName, lastName, signature });
    setLetterContent(replacedContent);
  }, []);

  const openEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  const closeLetter = (index) => {
    const updatedLetters = [...lettersRef.current];
    updatedLetters[index].style.display = 'none';
    lettersRef.current = updatedLetters;
  };

  const isOverflown = (element) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  };

  useEffect(() => {
    const letters = lettersRef.current;
    letters.forEach((letter, index) => {
      if (lettersContainerRef.current && letter) {
        lettersContainerRef.current.appendChild(letter);

        const containerRect = envelopeContainerRef.current.getBoundingClientRect();
        const letterRect = letter.getBoundingClientRect();

        const centerX = containerRect.left + containerRect.width / 2 - letterRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2 - letterRect.height / 2;

        letter.style.position = 'absolute';
        letter.style.left = `${centerX}px`;
        letter.style.top = `${centerY}px`;

        if (!isOverflown(letter)) {
          letter.classList.add("center");
        }

        let offsetX, offsetY;
        letter.addEventListener("mousedown", (e) => {
          if (e.target.tagName !== "BUTTON") {
            const rect = e.target.getBoundingClientRect();
            letter.style.position = "fixed";
            letter.style.left = `${rect.left}px`;
            letter.style.top = `${rect.top}px`;

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            letter.style.zIndex = zIndexCounter.current++;

            const moveAt = (posX, posY) => {
              letter.style.left = `${posX}px`;
              letter.style.top = `${posY}px`;
            };
            const onMouseMove = (moveEvent) => moveAt(moveEvent.clientX, moveEvent.clientY);
            const onMouseUp = () => {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          }
        });
      }
    });
  }, [isEnvelopeOpen]);

  return (
    <section className="cssletter">
      <div className={`envelope ${isEnvelopeOpen ? 'active' : ''}`} ref={envelopeContainerRef}>
        <div className="envelope-flap"></div>
        <button className="seal" id="openEnvelope" onClick={openEnvelope} aria-label="Open Envelope">
          H
        </button>
        <div className="envelope-folds">
          <div className="envelope-left"></div>
          <div className="envelope-right"></div>
          <div className="envelope-bottom"></div>
        </div>
      </div>
      <div className="letters" ref={lettersContainerRef}>
        <blockquote
          className="letter center"
          id="1"
          tabIndex="0"
          ref={(el) => (lettersRef.current[0] = el)}
          style={{ display: isEnvelopeOpen ? 'block' : 'none' }}
        >
          <button className="closeLetter" title="Close Letter" onClick={() => closeLetter(0)}>
            Close Letter
          </button>
          <ReactMarkdown>{letterContent}</ReactMarkdown>
        </blockquote>
      </div>
      <footer className='footer'>
      Inspire by  <a href='https://codepen.io/frills/pen/xbxxzBw'>https://codepen.io/frills/pen/xbxxzBw</a> 
    </footer>
    </section>


  );
};

export default MistralHogwartsLetter;
