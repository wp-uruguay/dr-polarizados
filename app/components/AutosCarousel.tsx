"use client";

import { useRef, useEffect, useCallback, useState } from "react";

const images = [
  "/autos/1233.jpg",
  "/autos/12679.jpg",
  "/autos/12721 (1).jpg",
  "/autos/12721.jpg",
  "/autos/15632.jpg",
  "/autos/1625.jpg",
  "/autos/2151948193.jpg",
  "/autos/26.jpg",
  "/autos/3542.jpg",
  "/autos/3600.jpg",
  "/autos/42263.jpg",
  "/autos/4478.jpg",
  "/autos/5082.jpg",
  "/autos/65.jpg",
  "/autos/8148.jpg",
  "/autos/975.jpg",
  "/autos/cars-97.jpg",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SPEED_NORMAL = 0.6; // px per frame
const SPEED_SLOW = 0.15;
const SPEED_BOOST = 1.4;
const LERP = 0.04;
const BOOST_MS = 700;

export default function AutosCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const speed = useRef(SPEED_NORMAL);
  const target = useRef(SPEED_NORMAL);
  const boostTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number>(0);
  const [orderedImages, setOrderedImages] = useState(images);

  useEffect(() => {
    setOrderedImages(shuffle(images));
  }, []);

  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    speed.current += (target.current - speed.current) * LERP;
    offset.current -= speed.current;

    const half = track.scrollWidth / 2;
    if (Math.abs(offset.current) >= half) {
      offset.current += half;
    }

    track.style.transform = `translateX(${offset.current}px)`;
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [tick]);

  const handleMouseEnter = () => {
    if (boostTimer.current) clearTimeout(boostTimer.current);
    target.current = SPEED_SLOW;
  };

  const handleMouseLeave = () => {
    target.current = SPEED_BOOST;
    boostTimer.current = setTimeout(() => {
      target.current = SPEED_NORMAL;
    }, BOOST_MS);
  };

  const allImages = [...orderedImages, ...orderedImages];

  return (
    <div
      className="autos-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="autos-carousel-track" ref={trackRef}>
        {allImages.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            className="autos-carousel-img"
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
