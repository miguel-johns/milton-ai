import { useState, useEffect } from "react";
import Footer from './components/Footer';

function useBreakpoint() {
  const [state, setState] = useState({ mobile: false, tablet: false, desktop: true });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setState({ mobile: w < 768, tablet: w >= 768 && w < 1024, desktop: w >= 1024 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return state;
}

const colors = {
  ink: '#0B1628',
  inkSoft: '#475569',
  inkMute: '#94A3B8',
  accent: '#2BBFAA',
  accentSoft: 'rgba(43, 191, 170, 0.1)',
  paper: '#FFFFFF',
  bg: '#F7F4ED',
  line: '#E2E8F0',
  lineSoft: 'rgba(11, 22, 40, 0.08)',
};

const fonts = {
  sans: "'DM Sans', system-ui, sans-serif",
  serif: "'Cormorant Garamond', Georgia, serif",
};

const logoImage = "/images/milton-logo.png";

export default function Privacy() {
  const { mobile } = useBreakpoint();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionStyle = {
    marginBottom: 32,
  };

  const headingStyle = {
    fontFamily: fonts.sans,
    fontSize: mobile ? 18 : 20,
    fontWeight: 600,
    color: colors.ink,
    margin: "32px 0 12px 0",
  };

  const subheadingStyle = {
    fontFamily: fonts.sans,
    fontSize: mobile ? 16 : 17,
    fontWeight: 600,
    color: colors.ink,
    margin: "20px 0 8px 0",
  };

  const paragraphStyle = {
    fontFamily: fonts.sans,
    fontSize: mobile ? 15 : 16,
    lineHeight: 1.75,
    color: colors.inkSoft,
    margin: "0 0 16px 0",
  };

  const listStyle = {
    fontFamily: fonts.sans,
    fontSize: mobile ? 15 : 16,
    lineHeight: 1.75,
    color: colors.inkSoft,
    margin: "0 0 16px 0",
    paddingLeft: 24,
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.paper }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        padding: mobile ? '20px' : '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/" style={{
          fontFamily: fonts.sans,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: colors.ink,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <img 
            src={logoImage}
            alt="Milton"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04), 0 1px 3px rgba(11, 22, 40, 0.06)',
            }}
          />
          <span>Milton</span>
        </a>

        {/* Desktop Nav */}
        {!mobile && (
          <nav style={{
            display: 'flex',
            gap: 28,
            fontSize: 14,
            color: colors.inkSoft,
            alignItems: 'center',
          }}>
            <a href="/coaches" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Coaches</a>
            <a href="/gyms" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>For Gyms</a>
            <a href="/insights" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</a>
            <a href="/about" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="#" className="nav-btn" style={{
              color: 'inherit',
              textDecoration: 'none',
              border: `1px solid ${colors.line}`,
              padding: '8px 16px',
              borderRadius: 8,
              background: colors.paper,
            }}>Sign in</a>
          </nav>
        )}

        {/* Mobile menu toggle */}
        {mobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${colors.line}`,
              background: colors.paper,
              borderRadius: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 60,
            }}
          >
            <span style={{
              display: 'block',
              width: 18,
              height: 1.5,
              background: mobileMenuOpen ? 'transparent' : colors.ink,
              borderRadius: 1,
              position: 'relative',
              transition: 'all 0.3s',
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: mobileMenuOpen ? 0 : -6,
                transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
              <span style={{
                position: 'absolute',
                left: 0,
                width: 18,
                height: 1.5,
                background: colors.ink,
                borderRadius: 1,
                top: mobileMenuOpen ? 0 : 6,
                transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                transition: 'all 0.3s',
              }} />
            </span>
          </button>
        )}
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(11, 22, 40, 0.3)',
              zIndex: 40,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '80%',
            maxWidth: 320,
            height: '100vh',
            background: colors.paper,
            zIndex: 50,
            padding: '80px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <a href="/coaches" style={{ fontFamily: fonts.sans, fontSize: 18, color: colors.ink, textDecoration: 'none', padding: '12px 0' }}>For Coaches</a>
            <a href="/gyms" style={{ fontFamily: fonts.sans, fontSize: 18, color: colors.ink, textDecoration: 'none', padding: '12px 0' }}>For Gyms</a>
            <a href="/insights" style={{ fontFamily: fonts.sans, fontSize: 18, color: colors.ink, textDecoration: 'none', padding: '12px 0' }}>Insights</a>
            <a href="/about" style={{ fontFamily: fonts.sans, fontSize: 18, color: colors.ink, textDecoration: 'none', padding: '12px 0' }}>About</a>
            <div style={{ height: 1, background: colors.line, margin: '12px 0' }} />
            <a href="#" style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              color: colors.paper,
              background: colors.accent,
              textDecoration: 'none',
              padding: '14px 20px',
              borderRadius: 10,
              textAlign: 'center',
              marginTop: 8,
            }}>Sign in</a>
          </div>
        </>
      )}
      
      {/* Hero */}
      <div style={{
        background: `
          radial-gradient(ellipse 60% 50% at 10% 25%, rgba(43, 191, 170, 0.12), transparent 50%),
          radial-gradient(ellipse 50% 40% at 85% 75%, rgba(43, 191, 170, 0.08), transparent 45%),
          radial-gradient(ellipse 70% 60% at 95% 15%, rgba(154, 241, 152, 0.1), transparent 50%),
          radial-gradient(ellipse 55% 45% at 5% 85%, rgba(248, 230, 200, 0.15), transparent 45%),
          #FFFFFF
        `,
        padding: mobile ? '120px 20px 60px' : '140px 40px 80px',
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Header */}
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: "uppercase",
            color: colors.accent,
            margin: "0 0 12px 0",
          }}>Legal</p>
          
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: mobile ? 36 : 48,
            fontWeight: 400,
            color: colors.ink,
            margin: "0 0 8px 0",
            lineHeight: 1.1,
          }}>Privacy Policy</h1>
          
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: colors.inkSoft,
            margin: "0",
          }}>Last updated: January 8, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        background: colors.paper,
        padding: mobile ? '40px 20px 60px' : '60px 40px 80px',
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Notice */}
          <div style={{
            background: colors.accentSoft,
            border: `1px solid ${colors.accent}`,
            borderRadius: 12,
            padding: mobile ? 16 : 20,
            marginBottom: 32,
          }}>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 600,
              color: colors.accent,
              margin: 0,
            }}>
              NOTICE: We may sell your sensitive and biometric personal data.
            </p>
          </div>

          <div style={sectionStyle}>
            <p style={paragraphStyle}>
              MMNT Inc. ("Company", "we", "our", or "us") respects your privacy and is committed to protecting it through compliance with this policy. This policy describes how we collect, process, retain, and disclose personal data about you when providing services to you through our websites, applications, products, and services that link to this policy (our "Services") and our practices for using, maintaining, protecting, and disclosing that information.
            </p>
            <p style={paragraphStyle}>
              This policy applies only to information we collect through the Services and in communications, including email, text, chat, and other electronic messages, between you and the Services.
            </p>
            <p style={paragraphStyle}>It does not apply to information collected by:</p>
            <ul style={listStyle}>
              <li>Us offline or through any other means, including on any other website operated by Company or any third party that does not link to this policy; or</li>
              <li>Any third party, including through any application or content (including advertising) that may link to or be accessible from or through the Services.</li>
            </ul>
            <p style={paragraphStyle}>
              Please read this policy carefully to understand our policies and practices regarding your information and how we treat it. By interacting with our Services or providing us with your information, you agree to the collection, use, and sharing of your information as described in this privacy policy.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>{"Children's"} and {"Minors'"} Data</h2>
            <p style={paragraphStyle}>
              Our Services are not intended for, and we do not knowingly collect any personal data from, children under the age of 18. If we learn we have collected or received personal data from a child under 18 years old without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 18, please contact us at <a href="mailto:support@getmilton.com" style={{ color: colors.accent }}>support@getmilton.com</a>.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>The Personal Data That We Collect or Process</h2>
            <p style={paragraphStyle}>
              "Personal data" is information that identifies, relates to, or describes, directly or indirectly, you as an individual, such as your name, email address, telephone number, home address, or payment information.
            </p>
            <p style={paragraphStyle}>The types and categories of personal data we collect or process include:</p>
            <ul style={listStyle}>
              <li>Account and contact information, including name, address, email address, phone number, username, and other contact information you provide us.</li>
              <li>Payment information, including credit card or debit card information and information about the payment methods and services you use in connection with the Services.</li>
              <li>Account history, including information about your subscription, account, and account transactions.</li>
              <li>Demographic information, including your age and gender.</li>
              <li>Location information, including general geographic location such as country, state or province, or city.</li>
              <li>Device information, including your IP address, device identifiers, operating system and version, preferred language, hardware identifiers, browser type and settings, and other device information.</li>
              <li>Content and information you elect to provide as part of your profile or in any reviews you make through the Services or emails, chats, or other communications sent to us.</li>
              <li>Images, voice recordings, and videos collected or stored in connection with the Services.</li>
              <li>Biometric information you provide through the Services, such as sleep, health, diet, or exercise data.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>How We Collect Your Personal and Other Data</h2>
            <h3 style={subheadingStyle}>You Provide Information to Us</h3>
            <p style={paragraphStyle}>
              We collect information about you when you interact with our Services, such as when you subscribe, download, or access the Services, create or update an account, participate in surveys or promotions, or create, upload, or post content to the Services.
            </p>
            
            <h3 style={subheadingStyle}>Automatically Through Our Services</h3>
            <p style={paragraphStyle}>
              As you navigate through and interact with our Services, we may use automatic data collection technologies to collect information that may include personal data. The technologies we use may include:
            </p>
            <ul style={listStyle}>
              <li><strong>Cookies.</strong> A cookie is a small file placed on your device when you interact with the Services. You may refuse to accept or disable cookies by activating the appropriate setting on your browser or device.</li>
              <li><strong>Web Beacons.</strong> Some parts of the Services and our emails may contain small electronic files known as web beacons that permit the Company to count users who have visited those parts or opened an email.</li>
            </ul>

            <h3 style={subheadingStyle}>From Business Partners and Service Providers</h3>
            <p style={paragraphStyle}>
              We may receive personal data about you from other sources and combine that with information we collect directly from you.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>How We Use Your Information</h2>
            <p style={paragraphStyle}>We use information that we collect about you or that you provide to us, including any personal data, to:</p>
            <ul style={listStyle}>
              <li>Provide you with the Services and any content, features, information, products, or services that we make available through the Services.</li>
              <li>Fulfill and manage subscriptions and payments.</li>
              <li>Provide you with notices about your account or subscription, including expiration and renewal notices.</li>
              <li>Improve our Services, including by analyzing your information and creating aggregated data. Our analysis may include the use of technology like machine learning and large language models.</li>
              <li>Promote our Services, business, and offerings by publishing advertising on our own Services and by placing ads on third parties' services.</li>
              <li>Carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
              <li>Notify you when Services updates are available.</li>
              <li>For any other purpose with your consent.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Who We Disclose Your Information To</h2>
            <p style={paragraphStyle}>
              We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may also disclose personal data:
            </p>
            <ul style={listStyle}>
              <li>To our subsidiaries and affiliates.</li>
              <li>To contractors, service providers, and other third parties we use to support our organization.</li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of MMNT Inc.{"'s"} assets.</li>
              <li>To third parties to market their products or services to you if you have not opted out of these disclosures.</li>
              <li>To fulfill the purpose for which you provide it.</li>
              <li>To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
              <li>To enforce or apply our terms of use and other agreements.</li>
              <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of our organization, our customers, clients, members, business partners, or others.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Your Rights and Choices About Your Information</h2>
            <p style={paragraphStyle}><strong>Cookies and Other Tracking Technologies.</strong> You can set your browser to refuse all or some browser cookies. If you disable or refuse cookies, some Services features may be inaccessible or not function properly.</p>
            <p style={paragraphStyle}><strong>Promotions by the Company.</strong> If you do not wish us to use your information to promote products or services, you can opt out by adjusting your account settings or emailing <a href="mailto:support@getmilton.com" style={{ color: colors.accent }}>support@getmilton.com</a>.</p>
            <p style={paragraphStyle}><strong>Targeted Advertising.</strong> If you do not want us to deliver targeted advertisements, you can opt out by adjusting your account settings or emailing <a href="mailto:support@getmilton.com" style={{ color: colors.accent }}>support@getmilton.com</a>.</p>
            <p style={paragraphStyle}><strong>Location Data.</strong> You can choose whether or not to allow the Services to collect and use real-time information about your device{"'s"} location through the device{"'s"} privacy settings.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Your State Privacy Rights</h2>
            <p style={paragraphStyle}>Depending on your state of residency, you may have certain rights related to your personal data, including:</p>
            <ul style={listStyle}>
              <li><strong>Access and Data Portability.</strong> You may confirm whether we process your personal data and access a copy.</li>
              <li><strong>Correction.</strong> You may request that we correct inaccuracies in your personal data.</li>
              <li><strong>Deletion.</strong> You may request that we delete personal data about you, subject to certain exceptions.</li>
              <li><strong>Opt Out.</strong> You may request that we do not use your personal data for targeted advertising, profiling, and sales.</li>
            </ul>
            <p style={paragraphStyle}>
              To exercise any of these rights, please email us at <a href="mailto:support@getmilton.com" style={{ color: colors.accent }}>support@getmilton.com</a>.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>How We Protect Your Personal Data</h2>
            <p style={paragraphStyle}>
              We use commercially reasonable administrative, physical, and technical measures designed to protect your personal data from accidental loss or destruction and from unauthorized access, use, alteration, and disclosure. However, no website, mobile application, system, electronic storage, or online service is completely secure, and we cannot guarantee the security of your personal data.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>How We Retain Your Personal Data</h2>
            <p style={paragraphStyle}>
              We keep the categories of personal data described in this policy for as long as reasonably necessary to fulfill the purposes described or for as otherwise legally permitted or required. At the end of the retention period, personal data will be deleted, destroyed, or deidentified.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Changes to Our Privacy Policy</h2>
            <p style={paragraphStyle}>
              We may update this policy from time to time, and we will provide notice of any such changes to the policy as required by law. The date the privacy policy was last updated is identified at the top of the page.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Contact Information</h2>
            <p style={paragraphStyle}>
              To exercise your rights or ask questions or comment about this privacy policy or our privacy practices, contact us at: <a href="mailto:support@getmilton.com" style={{ color: colors.accent }}>support@getmilton.com</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
