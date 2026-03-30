import { useState, useEffect } from "react";

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

const f = "'DM Sans', sans-serif";
const serif = "'Instrument Serif', serif";
const navy = "#061c27";
const teal = "#0d9aa5";

export default function Terms() {
  const { mobile } = useBreakpoint();
  const px = mobile ? 20 : 40;

  const sectionStyle = {
    marginBottom: 32,
  };

  const headingStyle = {
    fontFamily: f,
    fontSize: mobile ? 18 : 20,
    fontWeight: 700,
    color: "#fff",
    margin: "32px 0 12px 0",
  };

  const paragraphStyle = {
    fontFamily: f,
    fontSize: mobile ? 14 : 15,
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.6)",
    margin: "0 0 16px 0",
  };

  const listStyle = {
    fontFamily: f,
    fontSize: mobile ? 14 : 15,
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.6)",
    margin: "0 0 16px 0",
    paddingLeft: 24,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${navy} 0%, #0a2a38 100%)`,
      padding: `120px ${px}px 60px`,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <p style={{
          fontFamily: f,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: teal,
          margin: "0 0 12px 0",
        }}>Legal</p>
        
        <h1 style={{
          fontFamily: serif,
          fontSize: mobile ? 32 : 44,
          fontWeight: 400,
          color: "#fff",
          margin: "0 0 8px 0",
        }}>Website Terms of Use</h1>
        
        <p style={{
          fontFamily: f,
          fontSize: 14,
          color: "rgba(255,255,255,0.4)",
          margin: "0 0 40px 0",
        }}>Last Modified: January 8, 2026</p>

        {/* Content */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Acceptance of the Terms of Use</h2>
          <p style={paragraphStyle}>
            These terms of use are entered into by and between you and MMNT Inc. ("Company," "we," or "us"). The following terms and conditions, together with any documents they expressly incorporate by reference (collectively, "Terms of Use"), govern your access to and use of getmilton.com, including any content, functionality, and services offered on or through getmilton.com (the "Website"), whether as a guest or a registered user.
          </p>
          <p style={paragraphStyle}>
            Please read the Terms of Use carefully before you start to use the Website. By using the Website or by clicking to accept or agree to the Terms of Use when this option is made available to you, you accept and agree to be bound and abide by these Terms of Use and our Privacy Policy, incorporated herein by reference. If you do not want to agree to these Terms of Use or the Privacy Policy, you must not access or use the Website.
          </p>
          <p style={paragraphStyle}>
            This Website is offered and available to users who are 18 years of age or older, and reside in the United States or any of its territories or possessions. By using this Website, you represent and warrant that you are of legal age to form a binding contract with the Company and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Website.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Changes to the Terms of Use</h2>
          <p style={paragraphStyle}>
            We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Website thereafter. Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Accessing the Website and Account Security</h2>
          <p style={paragraphStyle}>
            We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period.
          </p>
          <p style={paragraphStyle}>You are responsible for both:</p>
          <ul style={listStyle}>
            <li>Making all arrangements necessary for you to have access to the Website.</li>
            <li>Ensuring that all persons who access the Website through your internet connection are aware of these Terms of Use and comply with them.</li>
          </ul>
          <p style={paragraphStyle}>
            If you choose, or are provided with, a username, password, or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to this Website or portions of it using your username, password, or other security information.
          </p>
          <p style={paragraphStyle}>
            We have the right to disable any username, password, or other identifier, whether chosen by you or provided by us, at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms of Use.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Intellectual Property Rights</h2>
          <p style={paragraphStyle}>
            The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p style={paragraphStyle}>
            These Terms of Use permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as follows:
          </p>
          <ul style={listStyle}>
            <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
            <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
            <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
            <li>If we provide desktop, mobile, or other applications for download, you may download a single copy to your computer or mobile device solely for your own personal, non-commercial use.</li>
            <li>If we provide social media features with certain content, you may take such actions as are enabled by such features.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Trademarks</h2>
          <p style={paragraphStyle}>
            The Company name, the Company logo, and all related names, logos, product and service names, designs, and slogans are trademarks of the Company or its affiliates or licensors. You must not use such marks without the prior written permission of the Company.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Prohibited Uses</h2>
          <p style={paragraphStyle}>
            You may use the Website only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Website:
          </p>
          <ul style={listStyle}>
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the Content Standards set out in these Terms of Use.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website.</li>
          </ul>
          <p style={paragraphStyle}>Additionally, you agree not to:</p>
          <ul style={listStyle}>
            <li>Use the Website in any manner that could disable, overburden, damage, or impair the site.</li>
            <li>Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose.</li>
            <li>Use any device, software, or routine that interferes with the proper working of the Website.</li>
            <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website.</li>
            <li>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Disclaimer of Warranties</h2>
          <p style={paragraphStyle}>
            YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p style={paragraphStyle}>
            TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Limitation on Liability</h2>
          <p style={paragraphStyle}>
            TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Governing Law and Jurisdiction</h2>
          <p style={paragraphStyle}>
            All matters relating to the Website and these Terms of Use, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the State of Kansas without giving effect to any choice or conflict of law provision or rule.
          </p>
          <p style={paragraphStyle}>
            Any legal suit, action, or proceeding arising out of, or related to, these Terms of Use or the Website shall be instituted exclusively in the federal courts of the United States or the courts of the State of Kansas, located in the City of Wichita and County of Sedgwick.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>Contact Information</h2>
          <p style={paragraphStyle}>
            This website is operated by MMNT Inc., 440 N. Quentin, Wichita, Kansas 67208.
          </p>
          <p style={paragraphStyle}>
            All other feedback, comments, requests for technical support, and other communications relating to the Website should be directed to: <a href="mailto:support@getmilton.com" style={{ color: teal }}>support@getmilton.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
