import React, { useRef, useState, useEffect } from "react";

const sampleReels = [
  {
    id: 1,
    username: "tech_girl",
    caption: "Exploring React animations #react",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: 2,
    username: "foodlover",
    caption: "Making a quick recipe 🍳",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: 3,
    username: "travel_with_me",
    caption: "Sunset timelapse 🌅",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  }
];

function Reel() {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);
  const [likes, setLikes] = useState(() => sampleReels.map(() => ({ liked: false, count: Math.floor(Math.random() * 500) + 20 })));

  // helper functions are declared early so they can be used in effects below
  function playAt(index) {
    videoRefs.current.forEach((v, i) => {
      try {
        if (!v) return;
        if (i === index) {
          v.play().catch(() => {});
        } else {
          v.pause();
          v.currentTime = 0;
        }
      } catch {
        // ignore
      }
    });
  }

  function scrollToIndex(i) {
    if (i < 0) i = 0;
    if (i >= sampleReels.length) i = sampleReels.length - 1;
    const el = containerRef.current?.querySelector(`[data-index="${i}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  }
  

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setCurrent(index);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );

    const items = el.querySelectorAll(".reel-item");
    items.forEach((it) => observer.observe(it));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // whenever current changes, ensure only that video plays
    playAt(current);

    const onKey = (e) => {
      if (e.key === "ArrowDown") scrollToIndex(current + 1);
      if (e.key === "ArrowUp") scrollToIndex(current - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);
 

  const togglePlay = (i) => {
    const v = videoRefs.current[i];
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleLike = (i) => {
    setLikes((prev) => {
      const copy = [...prev];
      const item = copy[i];
      if (!item) return prev;
      item.liked = !item.liked;
      item.count += item.liked ? 1 : -1;
      return copy;
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {sampleReels.map((r, i) => (
        <div
          key={r.id}
          className="reel-item d-flex align-items-end"
          data-index={i}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // center the card horizontally
            width: "100%"
          }}
        >
          {/* centered narrow card */}
          <div
            className="reel-frame"
            style={{
              width: "45vh",
              height: "90vh",
              overflow: "hidden",
              borderRadius: 12,
              boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000"
            }}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={r.src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0
              }}
            muted
            playsInline
            loop
          />

          {/* overlay UI */}
          <div style={{ position: "absolute", left: "calc(50% - 22.5vh)", bottom: 32, maxWidth: 260 }}>
            <strong style={{ display: "block", fontSize: 18 }}>{r.username}</strong>
            <div style={{ marginTop: 8 }}>{r.caption}</div>
          </div>

          <div style={{ position: "absolute", right: "calc(50% - 22.5vh)", bottom: 32, textAlign: "center" }}>
            <button
              onClick={() => toggleLike(i)}
              style={{
                display: "block",
                marginBottom: 12,
                background: "transparent",
                border: "none",
                color: likes[i]?.liked ? "#ff2d55" : "#fff",
                fontSize: 22,
                cursor: "pointer"
              }}
              aria-label="Like"
            >
              {likes[i]?.liked ? "❤️" : "🤍"}
            </button>
            <div style={{ fontSize: 14, marginBottom: 18 }}>{likes[i]?.count}</div>

            <button
              style={{
                display: "block",
                marginBottom: 12,
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer"
              }}
              aria-label="Comment"
            >
              💬
            </button>

            <button
              style={{
                display: "block",
                marginBottom: 12,
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer"
              }}
              aria-label="Share"
            >
              ➡️
            </button>
          </div>

          {/* Click to toggle play/pause (frame overlay) */}
          <div
            onClick={() => togglePlay(i)}
            style={{ position: "absolute", inset: 0, cursor: "pointer", width: "45vh", marginLeft: "calc(-22.5vh)", left: "50%" }}
          />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reel;
