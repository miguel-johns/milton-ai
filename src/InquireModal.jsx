import { useState, useEffect } from "react";

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { mobile: w < 640 };
}

const f = "'DM Sans', sans-serif";
const serif = "'Cormorant Garamond', serif";
const teal = "#0d9aa5";
const mint = "#9af198";

export default function InquireModal({ isOpen, onClose }) {
  const { mobile } = useBreakpoint();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    productType: '',
    website: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ companyName: '', contactName: '', email: '', productType: '', website: '', message: '' });
    }, 2000);
  };

  const inputStyle = {
    width: '100%',
    fontFamily: f,
    fontSize: 14,
    color: '#fff',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontFamily: f,
    fontSize: 13,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    display: 'block',
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(6,28,39,0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: mobile ? 16 : 24,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#0a1f2a',
          border: '1px solid rgba(13,154,165,0.3)',
          borderRadius: mobile ? 16 : 20,
          padding: mobile ? '32px 24px' : '40px 36px',
          maxWidth: 520,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: mobile ? 16 : 20,
            right: mobile ? 16 : 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(154,241,152,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: serif, fontSize: 28, color: '#fff', margin: '0 0 12px 0' }}>Thank you!</h3>
            <p style={{ fontFamily: f, fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>We&apos;ll be in touch soon about your partnership inquiry.</p>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: serif,
              fontSize: mobile ? 26 : 32,
              fontWeight: 400,
              color: '#fff',
              margin: '0 0 8px 0',
            }}>Become a Connected Partner</h2>
            
            <p style={{
              fontFamily: f,
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 28px 0',
            }}>Tell us about your product and how it could integrate with Milton.</p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = teal}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Contact Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = teal}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = teal}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Product Type *</label>
                <select
                  required
                  value={formData.productType}
                  onChange={e => setFormData({ ...formData, productType: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                  onFocus={e => e.target.style.borderColor = teal}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <option value="" style={{ background: '#0a1f2a' }}>Select a category...</option>
                  <option value="wearable" style={{ background: '#0a1f2a' }}>Wearable Device</option>
                  <option value="body-scan" style={{ background: '#0a1f2a' }}>Body Composition Analyzer</option>
                  <option value="equipment" style={{ background: '#0a1f2a' }}>Strength / Cardio Equipment</option>
                  <option value="software" style={{ background: '#0a1f2a' }}>Management Software</option>
                  <option value="app" style={{ background: '#0a1f2a' }}>Nutrition / Fitness App</option>
                  <option value="other" style={{ background: '#0a1f2a' }}>Other</option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = teal}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Tell us about your integration</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="What data does your product provide? How could it benefit Milton users?"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                  onFocus={e => e.target.style.borderColor = teal}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  fontFamily: f,
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#061c27',
                  background: mint,
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.background = '#b8f5b6'}
                onMouseLeave={e => e.target.style.background = mint}
              >
                Submit Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
