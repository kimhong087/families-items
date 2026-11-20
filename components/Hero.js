"use client";

import collection from "../collection.config.js";
import { LotusSpray } from "./Lotus";
import { useLanguage } from "../lib/language-context";
import "./home.css";

// To use a real photograph, drop it in public/images (e.g. angkor-hero.jpg)
// and change this one path. The gradient overlay blends any image into the teal.
const HERO_IMAGE = "/images/angkor-hero.svg";

// `children` is the search bar, so the page can own the search state.
export default function Hero({ children }) {
  const { t } = useLanguage();
  
  return (
    <section className="hero">
      <img className="hero-art" src={HERO_IMAGE} alt="" />
      <div className="hero-shade" />
      <LotusSpray className="hero-lotus hero-lotus-tl" />
      <LotusSpray className="hero-lotus hero-lotus-br" />
      <div className="container hero-inner">
        <p className="kicker">{t("hero.kicker")}</p>
        <h1>{t("hero.title")}</h1>
        <p className="hero-lead">{collection.description}</p>
        {children}
      </div>
    </section>
  );
}
