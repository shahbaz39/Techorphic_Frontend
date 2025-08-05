'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function IndustryLeaders() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [cards, setCards] = useState([]);
  const animationRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const dragStateRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldStartDropAnimation, setShouldStartDropAnimation] = useState(false);

  const cardData = [
    {
      text: 'Long-Term Upgrade & Support Packages',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
      size: 'large',
    },
    {
      text: 'Native + Hybrid Mobile App Expertise',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
      size: 'large',
    },
    {
      text: '100% Client Satisfaction Rate',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
      size: 'large',
    },
    {
      text: 'Scalable Architecture Solutions',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
      size: 'large',
    },
    {
      text: 'Cross-Platform Development',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
      size: 'large',
    },
    {
      text: 'AI-Powered Development Tools',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
      size: 'large',
    },
  ];

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Start animation a bit before fully visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const initialCards = cardData.map((card, index) => {
      const width = 280;
      const height = 120;

      return {
        id: index,
        ...card,
        x: Math.random() * Math.max(100, dimensions.width - width),
        y: -height - index * 50, // Start above the container
        vx: 0,
        vy: 0,
        width,
        height,
        rotation: (Math.random() - 0.5) * 20,
        rotationVel: 0,
        isDragging: false,
        mass: 1,
        dragVx: 0,
        dragVy: 0,
        opacity: 1, // Start visible
        hasDropped: false,
      };
    });
    setCards(initialCards);

    // Trigger drop animation if section is already visible
    if (isVisible && !hasAnimated) {
      setShouldStartDropAnimation(true);
    }
  }, [dimensions]);

  // Trigger drop animation when cards are ready and section becomes visible
  useEffect(() => {
    if (isVisible && cards.length > 0 && !shouldStartDropAnimation) {
      setShouldStartDropAnimation(true);
    }
  }, [isVisible, cards.length, shouldStartDropAnimation]);

  // Handle the drop animation
  useEffect(() => {
    if (shouldStartDropAnimation && cards.length > 0) {
      cards.forEach((card, index) => {
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((c) =>
              c.id === card.id
                ? {
                    ...c,
                    vy: 2 + Math.random() * 2, // Initial drop velocity
                    rotationVel: (Math.random() - 0.5) * 3,
                    hasDropped: true,
                  }
                : c,
            ),
          );
        }, index * 200); // Stagger the drops
      });
    }
  }, [shouldStartDropAnimation, cards.length]);

  useEffect(() => {
    const checkCollision = (card1, card2) => {
      const buffer = 1;
      return (
        card1.x < card2.x + card2.width + buffer &&
        card1.x + card1.width + buffer > card2.x &&
        card1.y < card2.y + card2.height + buffer &&
        card1.y + card1.height + buffer > card2.y
      );
    };

    const findSupportingCards = (card, allCards) => {
      const supportThreshold = 5;
      const supportingCards = [];

      for (const otherCard of allCards) {
        if (otherCard.id === card.id) continue;

        if (
          otherCard.y > card.y + card.height - supportThreshold &&
          otherCard.y < card.y + card.height + supportThreshold &&
          card.x < otherCard.x + otherCard.width &&
          card.x + card.width > otherCard.x
        ) {
          supportingCards.push(otherCard);
        }
      }

      return supportingCards;
    };

    const isOnGround = (card) => {
      return card.y + card.height >= dimensions.height - 5;
    };

    const resolveCollision = (card1, card2) => {
      const overlapX = Math.min(card1.x + card1.width - card2.x, card2.x + card2.width - card1.x);
      const overlapY = Math.min(card1.y + card1.height - card2.y, card2.y + card2.height - card1.y);

      if (overlapX > 2 || overlapY > 2) {
        if (overlapX < overlapY) {
          const pushDistance = overlapX / 2 + 0.5;
          if (card1.x < card2.x) {
            card1.x -= pushDistance;
            card2.x += pushDistance;
          } else {
            card1.x += pushDistance;
            card2.x -= pushDistance;
          }
          const avgVx = (card1.vx + card2.vx) / 2;
          card1.vx = avgVx * 0.7;
          card2.vx = avgVx * 0.7;
        } else {
          const pushDistance = overlapY / 2 + 0.5;
          if (card1.y < card2.y) {
            card1.y -= pushDistance;
            card2.y += pushDistance;

            if (card1.vy > 0 && overlapY > 3) {
              card1.vy = 0;
              card1.vx *= 0.8;
            }

            if (card2.vy < 0) card2.vy *= 0.5;
          } else {
            card1.y += pushDistance;
            card2.y -= pushDistance;

            if (card2.vy > 0 && overlapY > 3) {
              card2.vy = 0;
              card2.vx *= 0.8;
            }

            if (card1.vy < 0) card1.vy *= 0.5;
          }
        }
      }
    };

    const animate = () => {
      setCards((prevCards) => {
        let newCards = prevCards.map((card) => {
          if (card.isDragging) {
            if (dragStateRef.current && dragStateRef.current.cardId === card.id) {
              return {
                ...card,
                x: dragStateRef.current.x,
                y: dragStateRef.current.y,
                vx: dragStateRef.current.vx,
                vy: dragStateRef.current.vy,
              };
            }
            return card;
          }

          let { x, y, vx, vy, rotation, rotationVel } = card;

          const supportingCards = findSupportingCards(card, prevCards);
          const hasSupport = supportingCards.length > 0 || isOnGround(card);

          if (!hasSupport && card.hasDropped) {
            vy += 0.4; // Gravity
          }

          if (hasSupport) {
            vx *= 0.85;
            vy *= 0.7;
            rotationVel *= 0.9;
          } else {
            vx *= 0.98;
            vy *= 0.99;
            rotationVel *= 0.95;
          }

          if (Math.abs(vx) < 0.05) vx = 0;
          if (Math.abs(vy) < 0.05 && hasSupport) vy = 0;
          if (Math.abs(rotationVel) < 0.05) rotationVel = 0;

          x += vx;
          y += vy;
          rotation += rotationVel;

          if (x < 0) {
            x = 0;
            vx = Math.abs(vx) * 0.4;
            rotationVel += (Math.random() - 0.5) * 2;
          }
          if (x + card.width > dimensions.width) {
            x = dimensions.width - card.width;
            vx = -Math.abs(vx) * 0.4;
            rotationVel += (Math.random() - 0.5) * 2;
          }
          if (y < 0) {
            y = 0;
            vy = Math.abs(vy) * 0.4;
          }

          if (y + card.height > dimensions.height) {
            y = dimensions.height - card.height;

            if (Math.abs(vy) > 5) {
              vy = -Math.abs(vy) * 0.3;
            } else {
              vy = 0;
            }

            vx *= 0.8;
            rotationVel *= 0.7;
          }

          return {
            ...card,
            x,
            y,
            vx,
            vy,
            rotation,
            rotationVel,
          };
        });

        for (let i = 0; i < newCards.length; i++) {
          for (let j = i + 1; j < newCards.length; j++) {
            if (checkCollision(newCards[i], newCards[j])) {
              if (newCards[i].isDragging && !newCards[j].isDragging) {
                const pushForce = 3;
                const dx = newCards[j].x - newCards[i].x;
                const dy = newCards[j].y - newCards[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;

                newCards[j].vx += (dx / distance) * pushForce;
                newCards[j].vy += (dy / distance) * pushForce;
                newCards[j].rotationVel += (Math.random() - 0.5) * 5;

                resolveCollision(newCards[i], newCards[j]);
              } else if (newCards[j].isDragging && !newCards[i].isDragging) {
                const pushForce = 3;
                const dx = newCards[i].x - newCards[j].x;
                const dy = newCards[i].y - newCards[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;

                newCards[i].vx += (dx / distance) * pushForce;
                newCards[i].vy += (dy / distance) * pushForce;
                newCards[i].rotationVel += (Math.random() - 0.5) * 5;

                resolveCollision(newCards[i], newCards[j]);
              } else if (!newCards[i].isDragging && !newCards[j].isDragging) {
                resolveCollision(newCards[i], newCards[j]);
              }
            }
          }
        }

        newCards = newCards.map((card) => ({
          ...card,
          x: Math.max(0, Math.min(dimensions.width - card.width, card.x)),
          y: Math.max(-card.height * 2, Math.min(dimensions.height - card.height, card.y)), // Allow cards to go above container before dropping
        }));

        return newCards;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (cards.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cards.length, dimensions]);

  const handleMouseDown = (cardId, e) => {
    e.preventDefault();

    if (e.button === 2) {
      kickCard(cardId);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const card = cards.find((c) => c.id === cardId);

    const offsetX = e.clientX - containerRect.left - card.x;
    const offsetY = e.clientY - containerRect.top - card.y;

    dragStateRef.current = {
      cardId,
      offsetX,
      offsetY,
      x: card.x,
      y: card.y,
      vx: 0,
      vy: 0,
      lastMouseX: e.clientX,
      lastMouseY: e.clientY,
      lastTime: Date.now(),
    };

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === cardId ? { ...c, isDragging: true, vx: 0, vy: 0, rotationVel: 0 } : c,
      ),
    );

    const handleMouseMove = (e) => {
      if (!dragStateRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const currentTime = Date.now();
      const deltaTime = currentTime - dragStateRef.current.lastTime;

      const newX = e.clientX - containerRect.left - dragStateRef.current.offsetX;
      const newY = e.clientY - containerRect.top - dragStateRef.current.offsetY;

      const card = cards.find((c) => c.id === cardId);
      const constrainedX = Math.max(0, Math.min(dimensions.width - card.width, newX));
      const constrainedY = Math.max(0, Math.min(dimensions.height - card.height, newY));

      const vx =
        deltaTime > 0 ? ((e.clientX - dragStateRef.current.lastMouseX) / deltaTime) * 16 : 0;
      const vy =
        deltaTime > 0 ? ((e.clientY - dragStateRef.current.lastMouseY) / deltaTime) * 16 : 0;

      dragStateRef.current = {
        ...dragStateRef.current,
        x: constrainedX,
        y: constrainedY,
        vx: Math.max(-20, Math.min(20, vx)),
        vy: Math.max(-20, Math.min(20, vy)),
        lastMouseX: e.clientX,
        lastMouseY: e.clientY,
        lastTime: currentTime,
      };
    };

    const handleMouseUp = () => {
      if (!dragStateRef.current) return;

      const finalVx = dragStateRef.current.vx * 0.5;
      const finalVy = dragStateRef.current.vy * 0.5;
      const finalX = dragStateRef.current.x;
      const finalY = dragStateRef.current.y;

      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === cardId
            ? {
                ...c,
                isDragging: false,
                x: finalX,
                y: finalY,
                vx: finalVx,
                vy: finalVy,
                rotationVel: (Math.random() - 0.5) * 2,
              }
            : c,
        ),
      );

      dragStateRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const kickCard = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              vx: (Math.random() - 0.5) * 20,
              vy: -15 - Math.random() * 10,
              rotationVel: (Math.random() - 0.5) * 15,
            }
          : card,
      ),
    );
  };

  const resetCards = () => {
    dragStateRef.current = null;
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        x: Math.random() * (dimensions.width - card.width),
        y: -card.height - Math.random() * 200, // Start above container
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 2,
        rotation: (Math.random() - 0.5) * 30,
        rotationVel: (Math.random() - 0.5) * 3,
        isDragging: false,
        hasDropped: true,
      })),
    );
  };

  return (
    <div
      ref={sectionRef}
      className="bg-black min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div
        className={`text-center mt-16 relative z-10 transition-all duration-1200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="text-6xl md:text-7xl lg:text-7xl font-black text-white leading-[0.85] tracking-tight">
          THE CHOICE OF
          <br />
          <span>INDUSTRY LEADERS</span>
        </h1>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl rounded-2xl overflow-hidden"
        style={{ height: '600px' }}
      >
        {cards.map((card) => {
          const textColor = 'text-black';

          return (
            <div
              key={card.id}
              className={`absolute cursor-grab select-none ${card.isDragging ? 'cursor-grabbing z-50' : 'z-10'}`}
              style={{
                left: `${card.x}px`,
                top: `${card.y}px`,
                transform: `rotate(${card.rotation}deg)`,
                opacity: card.opacity || 1,
                transition: card.isDragging
                  ? 'none'
                  : 'transform 0.1s ease-out, opacity 0.3s ease-out',
              }}
              onMouseDown={(e) => handleMouseDown(card.id, e)}
              onContextMenu={(e) => e.preventDefault()}
              onDoubleClick={() => kickCard(card.id)}
            >
              <div
                className={`${card.color} rounded-2xl shadow-2xl border-2 border-white/10 hover:shadow-3xl transition-all duration-300 px-8 py-6`}
                style={{
                  width: `${card.width}px`,
                  height: `${card.height}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow:
                    '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                }}
              >
                <h3 className={`text-lg font-bold ${textColor} text-center leading-tight`}>
                  {card.text}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions text */}
      {/* <div
        className={`text-center mt-8 transition-all duration-1200 delay-800 ease-out ${
          isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-white/70 text-sm">
          Drag cards around • Right-click or double-click to kick •
          <button
            onClick={resetCards}
            className="ml-2 text-green-400 hover:text-green-300 underline"
          >
            Reset positions
          </button>
        </p>
      </div> */}
    </div>
  );
}
