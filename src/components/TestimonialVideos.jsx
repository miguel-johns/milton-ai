import { useState, useRef, useEffect } from 'react'

// Design tokens matching site theme
const colors = {
  bg: '#FAFBFC',
  bg2: '#F0F7F5',
  paper: '#FFFFFF',
  ink: '#0B1628',
  inkSoft: '#475569',
  inkMute: '#94A3B8',
  line: '#E2E8F0',
  lineSoft: '#F1F5F9',
  accent: '#2BBFAA',
  accentDeep: '#08455E',
  accentSoft: '#E6F8F4',
}

const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
}

// Testimonial data - videos will be added as they become available
const testimonials = [
  { 
    id: 1, 
    name: 'Coach Sarah', 
    role: 'Personal Trainer', 
    videoUrl: 'https://www.loom.com/embed/2e7b5b670846418abf50d4e245d89955',
  },
  { 
    id: 2, 
    name: 'Coach Mike', 
    role: 'Strength Coach', 
    videoUrl: 'https://www.loom.com/embed/c0bbd003d4bc4e17ab4c0283185e25b7',
  },
  { id: 3, name: 'Coach Emma', role: 'Nutrition Coach', videoUrl: 'https://www.loom.com/embed/f6ffb243633b46d69b27822a7889d553' },
  { id: 4, name: 'Coach James', role: 'Athletic Trainer', videoUrl: 'https://www.loom.com/embed/17df6bf0363d47a2b8f480bc843036a0' },
]

export default function TestimonialVideos({ mobile }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScroll)
      return () => ref.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = mobile ? 200 : 280
      const gap = mobile ? 16 : 24
      const scrollAmount = cardWidth + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section style={{
      padding: mobile ? '48px 0' : '80px 0',
      background: colors.bg2,
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: mobile ? 32 : 48,
          padding: mobile ? '0 16px' : '0 24px',
        }}>
          <span style={{
            display: 'inline-block',
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: colors.accent,
            marginBottom: 16,
          }}>
            Hear from coaches
          </span>
          <h2 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 28 : 40,
            lineHeight: 1.15,
            fontWeight: 500,
            color: colors.ink,
          }}>
            What coaches are saying
          </h2>
        </div>

        {/* Videos carousel */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: mobile ? 16 : 24,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingLeft: mobile ? 16 : 40,
            paddingRight: mobile ? 16 : 40,
            paddingBottom: 8,
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                flex: '0 0 auto',
                width: mobile ? 200 : 280,
                scrollSnapAlign: 'start',
              }}
            >
              {/* Video card - 9:16 aspect ratio for vertical mobile video */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '177.78%', // 9:16 aspect ratio
                background: colors.paper,
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${colors.line}`,
                boxShadow: '0 4px 16px rgba(11, 22, 40, 0.06)',
              }}>
                {testimonial.videoUrl ? (
                  /* Loom embed */
                  <iframe
                    src={testimonial.videoUrl}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    title={`Testimonial from ${testimonial.name}`}
                  />
                ) : (
                  /* Placeholder content */
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(180deg, ${colors.accentSoft} 0%, ${colors.bg} 100%)`,
                  }}>
                    {/* Play button placeholder */}
                    <div style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: colors.paper,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(11, 22, 40, 0.1)',
                      marginBottom: 16,
                    }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={colors.ink}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: fonts.sans,
                      fontSize: 13,
                      fontWeight: 500,
                      color: colors.inkMute,
                    }}>
                      Video coming soon
                    </span>
                  </div>
                )}

                {/* Name overlay at bottom - only show for placeholders */}
                {testimonial.placeholder && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: mobile ? '16px 12px' : '20px 16px',
                    background: 'linear-gradient(to top, rgba(11, 22, 40, 0.8), transparent)',
                  }}>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 14 : 15,
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: 2,
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: mobile ? 12 : 13,
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}>
                      {testimonial.role}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Swipe indicator arrows */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          marginTop: mobile ? 24 : 32,
        }}>
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: `1px solid ${canScrollLeft ? colors.line : colors.lineSoft}`,
              background: colors.paper,
              cursor: canScrollLeft ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              opacity: canScrollLeft ? 1 : 0.4,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={canScrollLeft ? colors.ink : colors.inkMute}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Swipe hint text */}
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            color: colors.inkMute,
            letterSpacing: '0.02em',
          }}>
            Swipe to see more
          </span>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: `1px solid ${canScrollRight ? colors.line : colors.lineSoft}`,
              background: colors.paper,
              cursor: canScrollRight ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              opacity: canScrollRight ? 1 : 0.4,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={canScrollRight ? colors.ink : colors.inkMute}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
