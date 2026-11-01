import { Gamepad2 } from 'lucide-react';
import './EasterEgg.css';

export default function EasterEgg() {
  return <section className="page-section hero-section easter-egg">
    <div className="bonus-screen">
      <Gamepad2 className="bonus-controller" size={72} strokeWidth={1.5} aria-hidden="true" />
      <h1>You found the easter egg</h1>
      <p>A little curiosity goes a long way.</p>
      <div className="bonus-score"><span>EXPLORATION</span><strong>+1,000 XP</strong></div>
      <a className="bonus-return" href="/map/">Back to the map <span aria-hidden="true">→</span></a>
    </div>
  </section>;
}
