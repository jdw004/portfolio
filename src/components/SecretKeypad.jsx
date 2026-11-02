import { useRef } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import './SecretKeypad.css';

const cheatCode = 'Up Up Down Down Left Right Left Right';
const directions = [
  ['Up', ArrowUp],
  ['Left', ArrowLeft],
  ['Right', ArrowRight],
  ['Down', ArrowDown],
];

export default function SecretKeypad() {
  const inputs = useRef([]);
  const unlocked = useRef(false);

  const enterDirection = (direction) => {
    if (unlocked.current) return;
    inputs.current = [...inputs.current, direction].slice(-8);
    if (inputs.current.join(' ') === cheatCode) {
      unlocked.current = true;
      window.location.assign('/easter-egg/');
    }
  };

  return <div className="secret-keypad" role="group" aria-label="Game keypad. Use the buttons or arrow keys while focused." onKeyDown={(event) => {
    const direction = event.key.replace('Arrow', '');
    if (!directions.some(([name]) => name === direction) || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    if (!event.repeat) enterDirection(direction);
  }}>
    <span className="secret-keypad-question" aria-hidden="true">?</span>
    <div className="secret-keypad-buttons">
      {directions.map(([direction, Icon]) => <button key={direction} className={`secret-keypad-${direction.toLowerCase()}`} type="button" aria-label={direction} onClick={() => enterDirection(direction)}>
        <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
      </button>)}
      <span className="secret-keypad-center" aria-hidden="true" />
    </div>
  </div>;
}
