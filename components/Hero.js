import collection from "../collection.config.js";
import { LotusSpray } from "./Lotus";
import "./home.css";

// To use a real photograph, drop it in public/images (e.g. angkor-hero.jpg)
// and change this one path. The gradient overlay blends any image into the teal.
const HERO_IMAGE = "/images/angkor-hero.svg";

// `children` is the search bar, so the page can own the search state.
export default function Hero({ children }) {
  return (
    <section className="hero">
      <img className="hero-art" src={HERO_IMAGE} alt="" />
      <div className="hero-shade" />
      <LotusSpray className="hero-lotus hero-lotus-tl" />
      <LotusSpray className="hero-lotus hero-lotus-br" />
      <div className="container hero-inner">
        <p className="kicker">People · Objects · Stories · Generations</p>
        <h1>Preserving Khmer stories for tomorrow.</h1>
        <p className="hero-lead">{collection.description}</p>
        {children}
      </div>
    </section>
  );
}
