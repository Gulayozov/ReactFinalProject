import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import "./EvasiveButton.css";

const EvasiveButton = () => {
  const [positions, setPositions] = useState([{ x: 0, y: 0 }]);
  const [messages, setMessages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [buttonCount, setButtonCount] = useState(1);
  const [buttonsClicked, setButtonsClicked] = useState({});
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [santaMessage, setSantaMessage] = useState(0);

  const taunts = [
    "Nice try! 😏",
    "Too slow! 🏃‍♂️",
    "Almost got me! 😅",
    "Keep trying! 🎯",
    "Not today! 😎",
    "Deadline extended! 📅",
    "Like catching up with syllabus! 📚",
    "Error 404: Button not found! 💻",
    "Taking attendance... 📝",
    "Pop quiz time! 📋",
    "Submit before midnight! ⏰",
    "Need more coffee? ☕",
    "Stack overflow can't help here! 💻"
  ];

  const levelUpMessages = [
    `Level %level%! It's like you haven't finished your assigment yet but get a second one 📚😈`,
    `Level %level%! Your professor says: "While you're at it, here's %count% more tasks!" 📝`,
    `Level %level%! Congrats! You've unlocked %count% more assignments due tonight! 🌙`,
    `Level %level%! Plot twist: %count% more buttons added to your workload! 📚`,
    `Level %level%! Think you're stressed now? Try catching %count% buttons! 🎯`,
    `Level %level%! Your academic advisor suggests catching %count% more buttons! 🎓`
  ];

  const santaTaunts = [
    "HOHOHO! Everyone's celebrating New Year's... but you're here catching buttons! 🎊",
    "Still here? Your friends are probably having fun right now! 🎉",
    "Time check: You've been here for a while... dedication or desperation? 😅",
    "Your New Year's resolution should be: Learn to catch buttons faster! 🎯",
    "Maybe next year you'll be better at this... HOHOHO! 🎄",
    "Did you miss the countdown for this? Worth it! 🕛"
  ];

  // Rotate Santa's messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSantaMessage(prev => (prev + 1) % santaTaunts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check for adding new buttons
  useEffect(() => {
    if (attempts > 0 && attempts % 20 === 0 && !showSuccess) {
      const newButtonCount = Math.floor(attempts / 20) + 1;
      if (newButtonCount > buttonCount) {
        // Trigger level up effects
        setIsLevelUp(true);
        setTimeout(() => setIsLevelUp(false), 1000);

        // Shake all existing buttons
        const buttons = document.querySelectorAll('.logout-button');
        buttons.forEach(button => {
          button.style.animation = 'shake 0.5s ease-in-out';
          setTimeout(() => {
            button.style.animation = '';
          }, 500);
        });

        setButtonCount(newButtonCount);
        setPositions(prev => [
          ...prev,
          { x: `${Math.random() * 90}vw`, y: `${Math.random() * 90}vh` }
        ]);

        // Show warning message with random level-up message
        const randomMessage = levelUpMessages[Math.floor(Math.random() * levelUpMessages.length)]
            .replace('%level%', newButtonCount)
            .replace('%count%', newButtonCount);

        const warningMessage = {
          id: `warning-${Date.now()}`,
          text: randomMessage,
          x: '50%',
          y: window.innerHeight / 3,
          isWarning: true
        };

        setMessages(prev => [...prev, warningMessage]);

        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== warningMessage.id));
        }, 3000);
      }
    }
  }, [attempts, buttonCount, showSuccess]);

  const handleClick = useCallback((buttonId) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    setButtonsClicked(prev => ({ ...prev, [buttonId]: true }));

    // Check if all buttons are clicked
    const allClicked = Object.values({
      ...buttonsClicked,
      [buttonId]: true
    }).filter(Boolean).length === buttonCount;

    if (allClicked) {
      setShowSuccess(true);
      // ... existing celebration logic ...

      setTimeout(() => {
        setShowSuccess(false);
        setMessages([]);
        setButtonsClicked({});
        // Reset positions
        setPositions(prev => prev.map(() => ({
          x: `${Math.random() * 90}vw`,
          y: `${Math.random() * 90}vh`
        })));
      }, 3000);
    }
  }, [buttonCount, buttonsClicked]);

  const handleHover = useCallback((buttonId) => (e) => {
    if (showSuccess) return;

    setAttempts(prev => prev + 1);

    // Update position for the specific button
    setPositions(prev => prev.map((pos, index) =>
        index === buttonId ? {
          x: `${Math.random() * 90}vw`,
          y: `${Math.random() * 90}vh`
        } : pos
    ));

    // Add taunt message
    const tauntMessage = {
      id: `taunt-${Date.now()}`,
      text: taunts[Math.floor(Math.random() * taunts.length)],
      x: '50%',
      y: e.clientY,
      isSuccess: false
    };

    setMessages(prev => [...prev.filter(m => !m.id.startsWith('taunt-')), tauntMessage]);

    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== tauntMessage.id));
    }, 1000);
  }, [showSuccess]);

  // Get current level
  const currentLevel = Math.floor(attempts / 20) + 1;

  // Get cursor class based on level
  const getCursorClass = (level) => {
    const levelMod = level > 7 ? ((level - 1) % 7) + 1 : level;
    return `cursor-level-${levelMod}`;
  };

  return (
      <div className={`button-container ${isLevelUp ? 'level-up' : ''} ${getCursorClass(currentLevel)}`}>
        <div className="background-effects">
          {[...Array(15)].map((_, i) => (
              <div key={i} className="bubble" />
          ))}
        </div>

        {/* Updated Santa with rotating messages */}
        <div className="santa">
          <div className="santa-speech">
            {santaTaunts[santaMessage]}
          </div>
          🎅
        </div>

        {/* Attempt Counter */}
        <motion.div
            className="attempt-display"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            key={attempts}
        >
          <div className="level-indicator">LEVEL {Math.floor(attempts / 20) + 1}</div>
          <div className="attempt-count">{attempts}</div>
          <div className="attempt-label">ATTEMPTS</div>
        </motion.div>

        <AnimatePresence mode="sync">
          {messages.map(message => (
              <motion.div
                  key={message.id}
                  className={`taunt-message 
              ${message.isSuccess ? 'success-message' : ''} 
              ${message.isWarning ? 'warning-message' : ''}`}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    y: -50,
                    scale: message.isWarning ? 1.5 : 1
                  }}
                  exit={{ opacity: 0, y: -100, scale: 0.5 }}
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                  style={{
                    position: 'fixed',
                    top: message.y,
                    pointerEvents: 'none'
                  }}
              >
                {message.text}
              </motion.div>
          ))}
        </AnimatePresence>

        {[...Array(buttonCount)].map((_, index) => (
            <motion.button
                key={index}
                initial={index === buttonCount - 1 ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                animate={{
                  rotate: showSuccess ? [0, 360] : [0, 10, -10, 0],
                  scale: showSuccess ? [1, 1.2, 1] : 1,
                  opacity: 1
                }}
                className={`logout-button ${showSuccess ? 'success' : ''} ${buttonsClicked[index] ? 'clicked' : ''}`}
                style={{
                  left: positions[index]?.x,
                  top: positions[index]?.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                onHoverStart={handleHover(index)}
                onClick={handleClick(index)}
                whileHover={{ scale: showSuccess ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              Logout {buttonCount > 1 ? `${index + 1}` : ''}
            </motion.button>
        ))}
      </div>
  );
};

export default EvasiveButton; 