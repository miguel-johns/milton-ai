import { useState } from 'react'

// Design tokens
const colors = {
  bg: '#FAFBFC',
  bg2: '#F1F5F9',
  paper: '#FFFFFF',
  ink: '#0B1628',
  inkSoft: '#475569',
  inkMute: '#94A3B8',
  accent: '#2BBFAA',
  accentSoft: 'rgba(43, 191, 170, 0.12)',
  accentDeep: '#08455E',
  mint: '#9AF198',
  line: '#E2E8F0',
}

const fonts = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', system-ui, -apple-system, sans-serif",
}

// Milton logo image
const logoImage = "/images/milton-logo.png"

// Social icons component
function SocialIcon({ name }) {
  const icons = {
    Facebook: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3v9h4v-9z"/></svg>,
    Instagram: <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>,
    X: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    Threads: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.757-.503-.586-1.279-.883-2.309-.89h-.029c-.825 0-1.947.227-2.66 1.284l-1.668-1.119c.95-1.408 2.498-2.183 4.394-2.183h.043c3.171.02 5.06 1.985 5.247 5.4.107.046.214.094.319.143 1.485.7 2.572 1.76 3.143 3.066.798 1.823.871 4.793-1.548 7.16-1.85 1.81-4.094 2.628-7.236 2.65z"/></svg>,
    TikTok: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.84-.12z"/></svg>,
    YouTube: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    LinkedIn: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  }
  return icons[name] || null
}

export default function Footer({ mobile, onOpenChat }) {
  return (
    <>
    <style>{`
      .footer-link {
        transition: color 0.2s ease;
      }
      .footer-link:hover {
        color: ${colors.accent} !important;
      }
      .footer-social {
        transition: color 0.2s ease, background 0.2s ease;
      }
      .footer-social:hover {
        color: ${colors.accent} !important;
        background: ${colors.accentSoft};
      }
      .footer-chat-btn {
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
      }
      .footer-chat-btn:hover {
        background: ${colors.accentSoft} !important;
        border-color: ${colors.accent} !important;
      }
    `}</style>
    <footer style={{
      padding: mobile ? '48px 20px 32px' : '64px 40px 48px',
      borderTop: `1px solid ${colors.line}`,
      background: 'linear-gradient(180deg, transparent 0%, rgba(43, 191, 170, 0.02) 100%)',
    }}>
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          marginBottom: mobile ? 28 : 36,
        }}>
          <img 
            src={logoImage}
            alt="Milton"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
            }}
          />
          <p style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.4,
            color: colors.inkSoft,
            maxWidth: 380,
          }}>
            <em>Milton learns your way of coaching. It does not replace it.</em>
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: mobile ? 'center' : 'center',
          justifyContent: 'space-between',
          gap: 24,
          marginBottom: mobile ? 28 : 36,
          flexWrap: 'wrap',
          flexDirection: mobile ? 'column' : 'row',
        }}>
          <button 
            className="footer-chat-btn"
            onClick={onOpenChat}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              color: colors.ink,
              padding: '10px 16px',
              borderRadius: 100,
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Talk to a human</span>
          </button>

          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {['Facebook', 'Instagram', 'X', 'Threads', 'TikTok', 'YouTube', 'LinkedIn'].map((social) => (
              <a 
                key={social}
                href="#"
                aria-label={social}
                className="footer-social"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  color: colors.inkSoft,
                }}
              >
                <SocialIcon name={social} />
              </a>
            ))}
          </nav>
        </div>

        <div style={{
          height: 1,
          background: colors.line,
          margin: '0 0 24px',
        }} />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: mobile ? 8 : 12,
          fontSize: mobile ? 12 : 13,
          color: colors.inkMute,
        }}>
          <span>© 2026 Milton AI</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <a href="#" className="footer-link" style={{ color: colors.inkMute, textDecoration: 'none' }}>Terms of Service</a>
          <span style={{ opacity: 0.5 }}>·</span>
          <a href="#" className="footer-link" style={{ color: colors.inkMute, textDecoration: 'none' }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
    </>
  )
}
