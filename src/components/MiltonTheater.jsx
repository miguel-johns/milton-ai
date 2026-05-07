import { useState, useEffect, useRef } from 'react';

const miltonMascot = '/images/milton-logo.png';

const colors = {
  navy: '#0B1628',
  navySoft: '#1A2438',
  teal: '#2BBFAA',
  tealDeep: '#1FA08D',
  tealSoft: 'rgba(43, 191, 170, 0.08)',
  mint: '#9AF198',
  mintSoft: '#C7F5C5',
  mintBg: '#E8FAE6',
  mintBgSoft: '#F0FBEE',
  cream: '#F7F4ED',
  creamWarm: '#F1ECDF',
  paper: '#FDFCF8',
  stageBg: '#ECEDE8',
  stageBg2: '#E8E9E4',
  orangeFlag: '#F4B788',
  orangeFlagBg: '#FBE4D1',
  ink90: 'rgba(11, 22, 40, 0.92)',
  ink70: 'rgba(11, 22, 40, 0.72)',
  ink60: 'rgba(11, 22, 40, 0.6)',
  ink50: 'rgba(11, 22, 40, 0.5)',
  ink40: 'rgba(11, 22, 40, 0.4)',
  ink25: 'rgba(11, 22, 40, 0.25)',
  ink15: 'rgba(11, 22, 40, 0.15)',
  ink08: 'rgba(11, 22, 40, 0.08)',
  ink05: 'rgba(11, 22, 40, 0.05)',
  ink04: 'rgba(11, 22, 40, 0.04)',
};

const fonts = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', -apple-system, sans-serif",
  mono: "ui-monospace, 'SF Mono', 'Menlo', monospace",
};

const SCENE_DURATION = 8000;

// Scene data
const scenes = [
  {
    id: 1,
    chatStatus: 'Workout, drafted',
    chatMessages: [
      { type: 'milton', text: 'You have <strong>8 sessions</strong> today and <strong>5 clients</strong> needing your attention. The brief is on the right.' },
      { type: 'milton', text: "Kathleen's at 9, I'll prompt you about her around 7am with the prep. Want to walk through the morning now, or wait for those?" },
      { type: 'user', text: "Draft Kathleen's Tuesday workout" },
      { type: 'milton', text: "Drafted. Phase 2 Week 6, shoulder rehab continuation. Same A-block warmup we've been running, B-block goblet's at 35 like she earned, C-block keeps the RDL light." },
      { type: 'milton', text: 'Tell me to send it, swap anything, or adjust loads.' },
    ],
    chips: [{ text: 'Send to Kathleen', primary: true }, { text: 'Swap goblet' }, { text: 'Drop side plank' }],
    mobileBubble: "Drafted Kathleen's Tuesday workout. Talk to me to refine or send.",
    indicatorLabel: 'On demand',
  },
  {
    id: 2,
    chatStatus: 'Your daily brief',
    chatMessages: [
      { type: 'milton', text: 'You have <strong>8 sessions</strong> today and <strong>5 clients</strong> needing your attention. The brief is on the right.' },
      { type: 'milton', text: "Kathleen's at 9, I'll prompt you about her around 7am with the prep. Want to walk through the morning now, or wait for those?" },
    ],
    chips: [{ text: 'Reply to Marcus', primary: true }, { text: "Kathleen's Tuesday" }, { text: 'Help the sleep flag' }],
    mobileBubble: '8 sessions today, 5 need your attention. Your brief is ready.',
    indicatorLabel: 'Morning brief',
  },
  {
    id: 3,
    chatStatus: 'Client profile',
    chatMessages: [
      { type: 'milton', text: 'You have <strong>8 sessions</strong> today and <strong>5 clients</strong> needing your attention. The brief is on the right.' },
      { type: 'milton', text: "Kathleen's at 9, I'll prompt you about her around 7am with the prep. Want to walk through the morning now, or wait for those?" },
      { type: 'user', text: 'Pull up Sarah' },
      { type: 'milton', text: "<strong>Sarah Chen.</strong> 14 weeks together. Strong week, she PR'd her squat at 145, the goal weight number she's been chasing. Weekend nutrition's still soft." },
    ],
    chips: [{ text: 'Weight trend', primary: true }, { text: 'Build her report' }, { text: 'Show timeline' }],
    mobileBubble: "Sarah Chen, 14 weeks together. She PR'd her squat at 145 this week.",
    indicatorLabel: 'Profile',
  },
  {
    id: 4,
    chatStatus: 'Personalized drafts',
    chatMessages: [
      { type: 'milton', text: 'You have <strong>8 sessions</strong> today and <strong>5 clients</strong> needing your attention. The brief is on the right.' },
      { type: 'user', text: 'Send a recovery video to anyone with sleep complaints recently' },
      { type: 'milton', text: 'Found 4 matches across the last 10 days. Each one has a specific reason on the canvas, drop or add names if any look off.' },
      { type: 'user', text: 'Drafts please' },
      { type: 'milton', text: 'Drafted 4 personalized messages. Each one references the specific reason that pulled them into the audience, highlighted in mint.' },
    ],
    chips: [{ text: 'Send all', primary: true }, { text: 'Make shorter' }, { text: "Rewrite Marcus's" }],
    mobileBubble: '4 personalized drafts, in your voice for each one. Ready to send.',
    indicatorLabel: 'Drafts',
  },
  {
    id: 5,
    chatStatus: 'Trend chart',
    chatMessages: [
      { type: 'milton', text: 'You have <strong>8 sessions</strong> today and <strong>5 clients</strong> needing your attention. The brief is on the right.' },
      { type: 'user', text: 'Pull up Sarah' },
      { type: 'milton', text: "<strong>Sarah Chen.</strong> 14 weeks together. Strong week, she PR'd her squat at 145, the goal weight number she's been chasing. Weekend nutrition's still soft." },
      { type: 'user', text: 'Show me her weight trend' },
      { type: 'milton', text: "Sarah's weight, the last twelve weeks. She's down 14 from where she started, no plateaus past three days." },
    ],
    chips: [{ text: 'Make full report', primary: true }, { text: 'Switch to body fat' }, { text: 'Show her timeline' }],
    mobileBubble: "Sarah's weight, 12 weeks. Down 14, no plateaus past three days.",
    indicatorLabel: 'Trend',
  },
  {
    id: 6,
    chatStatus: 'About you',
    chatMessages: [
      { type: 'milton', text: 'You have <strong>8 sessions</strong> today and <strong>5 clients</strong> needing your attention. The brief is on the right.' },
      { type: 'user', text: 'Show me what you know about me' },
      { type: 'milton', text: "Here's the picture I built from your handbook, your client agreements, and the last 60 days of your messaging. Tell me what's right, what's wrong, what I'm missing." },
    ],
    chips: [{ text: 'Update the deload point', primary: true }, { text: 'Add what you missed' }, { text: 'Show full doc' }],
    mobileBubble: 'The coach I see, built from your handbook and 60 days of messaging.',
    indicatorLabel: 'About you',
  },
];

// Chat Panel Component
function ChatPanel({ scene }) {
  return (
    <aside style={{
      background: 'white',
      borderRadius: 14,
      boxShadow: '0 1px 0 rgba(11, 22, 40, 0.04), 0 4px 12px -4px rgba(11, 22, 40, 0.06), 0 18px 40px -16px rgba(11, 22, 40, 0.18)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <header style={{
        padding: '18px 20px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        borderBottom: `1px solid ${colors.ink04}`,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          flexShrink: 0,
          overflow: 'hidden',
          backgroundImage: `url(${miltonMascot})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04)',
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: fonts.body, fontSize: 15, fontWeight: 600, color: colors.navy, lineHeight: 1.2, marginBottom: 3 }}>Milton</div>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.tealDeep, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.teal, flexShrink: 0 }} />
            {scene.chatStatus}
          </div>
        </div>
      </header>

      {/* Conversation */}
      <div style={{
        flex: 1,
        padding: '18px 20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {scene.chatMessages.map((msg, i) => (
          msg.type === 'milton' ? (
            <div key={i} style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.55, color: colors.navy }} dangerouslySetInnerHTML={{ __html: msg.text }} />
          ) : (
            <div key={i} style={{
              alignSelf: 'flex-end',
              background: colors.mintBg,
              color: colors.navy,
              fontSize: 13,
              fontWeight: 500,
              padding: '8px 14px',
              borderRadius: 18,
              maxWidth: '88%',
              lineHeight: 1.4,
            }}>{msg.text}</div>
          )
        ))}
      </div>

      {/* Chips */}
      <div style={{
        padding: '12px 16px 8px',
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 8,
        overflowX: 'auto',
        borderTop: `1px solid ${colors.ink04}`,
      }}>
        {scene.chips.map((chip, i) => (
          <button key={i} style={{
            fontFamily: fonts.body,
            fontSize: 12.5,
            fontWeight: 500,
            padding: '8px 14px',
            borderRadius: 20,
            border: chip.primary ? 'none' : `1px solid ${colors.ink15}`,
            background: chip.primary ? colors.navy : 'white',
            color: chip.primary ? colors.cream : colors.navy,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            flexShrink: 0,
          }}>{chip.text}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          flex: 1,
          border: `1px solid ${colors.ink15}`,
          borderRadius: 22,
          padding: '10px 16px',
          fontFamily: fonts.display,
          fontStyle: 'italic',
          fontSize: 13,
          color: colors.ink40,
          background: 'white',
        }}>Try: pull up Sarah, reply to Marcus</div>
        <button style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: colors.navy,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.cream,
          flexShrink: 0,
          cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </aside>
  );
}

// Scene 1: Workout Canvas
function WorkoutCanvas({ mobile }) {
  return (
    <div style={{ padding: mobile ? '16px' : '28px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.ink40, marginBottom: mobile ? 10 : 14, marginTop: mobile ? 4 : 10 }}>
        Workout · Tuesday
      </div>
      <div style={{
        border: `1px solid ${colors.ink08}`,
        borderLeft: `2px solid ${colors.teal}`,
        borderRadius: 10,
        padding: mobile ? '14px 12px' : '22px 24px',
        background: 'white',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: mobile ? 12 : 18 }}>
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: mobile ? 14 : 18, fontWeight: 600, color: colors.navy, marginBottom: 4 }}>Tuesday · Kathleen Reyes</div>
            <div style={{ fontSize: mobile ? 11 : 12, color: colors.ink60 }}>Shoulder rehab · Phase 2 · Week 6</div>
          </div>
          <span style={{ display: 'inline-block', background: colors.mintBg, color: colors.tealDeep, fontSize: mobile ? 9 : 10, fontWeight: 700, padding: mobile ? '4px 8px' : '5px 11px', borderRadius: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Workout</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['#', 'Exercise', 'Sets', 'Reps', 'Load'].map((h, i) => (
                <th key={h} style={{ fontSize: mobile ? 9 : 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.ink40, textAlign: i >= 2 ? 'right' : 'left', padding: mobile ? '6px 0 8px' : '8px 0 12px', borderBottom: `1px solid ${colors.ink08}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['A1', 'Band pull-apart', '3', '15', 'Light'],
              ['A2', 'Wall slide', '3', '10', 'BW'],
              ['B1', 'Goblet squat', '4', '8', '35 lb'],
              ['B2', 'Cable row', '4', '10', '40 lb'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    padding: mobile ? '8px 0' : '11px 0',
                    color: j === 0 ? colors.ink40 : j === 1 ? colors.navy : colors.ink70,
                    fontFamily: j === 0 ? fonts.mono : fonts.body,
                    fontSize: j === 0 ? (mobile ? 9 : 11) : (mobile ? 12 : 13.5),
                    fontWeight: j === 1 ? 500 : 400,
                    textAlign: j >= 2 ? 'right' : 'left',
                    borderBottom: `1px solid ${colors.ink04}`,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: mobile ? 12 : 18, fontSize: mobile ? 11 : 12, color: colors.ink60 }}>
          <span><strong style={{ color: colors.navy, fontWeight: 600 }}>16</strong> total sets</span>
          <span>Est: <strong style={{ color: colors.navy, fontWeight: 600 }}>45 min</strong></span>
        </div>
      </div>
    </div>
  );
}

// Scene 2: Morning Brief Canvas
function MorningBriefCanvas({ mobile }) {
  return (
    <div style={{ padding: mobile ? '16px' : '28px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.ink40, marginBottom: mobile ? 8 : 14, marginTop: mobile ? 4 : 10 }}>Tuesday · May 7</div>
      <h2 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: mobile ? 28 : 44, lineHeight: 1.05, letterSpacing: '-0.01em', color: colors.navy, marginBottom: 8 }}>Your morning</h2>
      
      <div style={{ marginTop: mobile ? 16 : 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mobile ? 10 : 14, marginTop: mobile ? 4 : 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: mobile ? 14 : 16, fontWeight: 600, color: colors.navy }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors.teal }} />
            Sessions today
          </div>
          <span style={{ fontSize: 12, color: colors.ink50 }}>8 sessions</span>
        </div>

        {[
          { time: '9:00', period: 'AM', name: 'Kathleen Reyes', meta: 'Shoulder rehab', pill: 'Ready', pillType: 'ok', active: true },
          { time: '11:00', period: 'AM', name: 'Devon Wright', meta: 'Strength', pill: 'Sleep', pillType: 'warn' },
        ].map((s, i) => (
          <div key={i} style={{
            background: s.active ? 'white' : colors.cream,
            borderRadius: 10,
            padding: mobile ? '12px 14px' : '16px 18px',
            display: 'grid',
            gridTemplateColumns: mobile ? '55px 1fr auto' : '80px 1fr auto',
            gap: mobile ? 10 : 16,
            alignItems: 'center',
            marginBottom: 8,
            borderLeft: s.active ? `2px solid ${colors.teal}` : '2px solid transparent',
            boxShadow: s.active ? '0 2px 12px -4px rgba(11, 22, 40, 0.06)' : 'none',
          }}>
            <div style={{ fontFamily: fonts.body, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
              <div style={{ fontSize: mobile ? 14 : 18, fontWeight: 600, color: colors.navy }}>{s.time}</div>
              <div style={{ fontSize: mobile ? 9 : 10, fontWeight: 600, letterSpacing: '0.12em', color: colors.ink50 }}>{s.period}</div>
            </div>
            <div>
              <div style={{ fontSize: mobile ? 12 : 14, fontWeight: 600, color: colors.navy, marginBottom: 2 }}>{s.name}</div>
              <div style={{ fontSize: mobile ? 11 : 12, color: colors.ink60 }}>{s.meta}</div>
            </div>
            <span style={{
              display: 'inline-block',
              background: s.pillType === 'warn' ? colors.orangeFlagBg : colors.mintBg,
              color: s.pillType === 'warn' ? '#B85F2A' : colors.tealDeep,
              fontSize: mobile ? 9 : 10,
              fontWeight: 700,
              padding: mobile ? '4px 8px' : '5px 11px',
              borderRadius: 20,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>{s.pill}</span>
          </div>
        ))}

        <div style={{ textAlign: 'center', margin: mobile ? '10px 0 14px' : '14px 0 22px', fontFamily: fonts.display, fontStyle: 'italic', fontSize: mobile ? 12 : 13, color: colors.ink50 }}>
          +6 more today
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mobile ? 10 : 14, marginTop: mobile ? 4 : 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: mobile ? 14 : 16, fontWeight: 600, color: colors.navy }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors.orangeFlag }} />
            Needs attention
          </div>
          <span style={{ fontSize: 12, color: colors.ink50 }}>5</span>
        </div>

        <div style={{
          background: colors.cream,
          borderRadius: 10,
          padding: mobile ? '12px 14px' : '16px 18px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: mobile ? 10 : 14,
          borderLeft: `2px solid ${colors.orangeFlag}`,
        }}>
          <div>
            <div style={{ fontSize: mobile ? 12 : 14, fontWeight: 600, color: colors.navy, marginBottom: 4 }}>Marcus Johnson</div>
            <div style={{ fontSize: mobile ? 11 : 12.5, color: colors.ink60, lineHeight: 1.5 }}>Shoulder feels 80%, ready to test.</div>
          </div>
          <button style={{
            background: colors.mintBg,
            color: colors.tealDeep,
            fontSize: mobile ? 10 : 11,
            fontWeight: 600,
            padding: mobile ? '4px 10px' : '5px 12px',
            borderRadius: 16,
            letterSpacing: '0.04em',
            flexShrink: 0,
            cursor: 'pointer',
            border: 'none',
            fontFamily: fonts.body,
          }}>Reply</button>
        </div>
      </div>
    </div>
  );
}

// Scene 3: Client Profile Canvas
function ClientProfileCanvas({ mobile }) {
  return (
    <div style={{ padding: mobile ? '16px' : '28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: mobile ? 12 : 20, marginBottom: 6 }}>
        <div style={{
          width: mobile ? 44 : 64,
          height: mobile ? 44 : 64,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.tealDeep} 0%, ${colors.teal} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: mobile ? 16 : 22,
          flexShrink: 0,
          marginTop: mobile ? 4 : 6,
        }}>SC</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: mobile ? 10 : 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.ink40, marginBottom: mobile ? 8 : 14 }}>Client profile</div>
          <h2 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: mobile ? 26 : 44, lineHeight: 1.05, letterSpacing: '-0.01em', color: colors.navy, marginBottom: 8 }}>Sarah Chen.</h2>
          <div style={{ fontSize: mobile ? 12 : 14, color: colors.ink60, lineHeight: 1.55, marginBottom: mobile ? 14 : 22 }}>14 weeks · fat loss · goal: 145</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: mobile ? 8 : 10, marginBottom: mobile ? 14 : 22 }}>
        {[
          { label: 'Weight', value: '154', unit: 'lb', delta: '−14' },
          { label: 'Sessions', value: '23', unit: '/24', delta: '96%', muted: true },
        ].map((stat, i) => (
          <div key={i} style={{ background: colors.cream, borderRadius: 10, padding: mobile ? '10px 12px' : '14px 16px' }}>
            <div style={{ fontSize: mobile ? 8 : 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.ink50, marginBottom: mobile ? 4 : 8 }}>{stat.label}</div>
            <div style={{ fontFamily: fonts.body, fontSize: mobile ? 18 : 22, fontWeight: 600, color: colors.navy, lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>
              {stat.value}<span style={{ fontSize: mobile ? 10 : 11, color: colors.ink50, fontWeight: 500, marginLeft: 2 }}>{stat.unit}</span>
            </div>
            <div style={{ fontSize: mobile ? 10 : 11, color: stat.muted ? colors.ink50 : colors.tealDeep, fontWeight: 500 }}>{stat.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: colors.cream, borderRadius: 10, padding: mobile ? '12px 14px' : '18px 20px' }}>
        <div style={{ fontSize: mobile ? 9 : 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.ink50, marginBottom: mobile ? 6 : 8 }}>The read</div>
        <div style={{ fontFamily: fonts.display, fontStyle: 'italic', fontSize: mobile ? 14 : 17, lineHeight: 1.5, color: colors.ink90, letterSpacing: '-0.005em' }}>
          {"Strong week. PR'd squat at 145. Weekend nutrition soft."}
        </div>
      </div>
    </div>
  );
}

// Scene 4: Personalized Drafts Canvas
function DraftsCanvas({ mobile }) {
  return (
    <div style={{ padding: mobile ? '16px' : '28px' }}>
      <div style={{ fontSize: mobile ? 10 : 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.ink40, marginBottom: mobile ? 8 : 14, marginTop: mobile ? 4 : 10 }}>Drafts · 4 messages</div>
      <h2 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: mobile ? 24 : 44, lineHeight: 1.05, letterSpacing: '-0.01em', color: colors.navy, marginBottom: 8 }}>In your voice.</h2>
      
      <div style={{ marginTop: mobile ? 16 : 26 }}>
        {[
          { name: 'Marcus J.', channel: 'SMS', body: 'Hey <span class="reason">Marcus</span>, saw <span class="reason">your text about sleep</span>. Sent you a recovery flow to try tonight.' },
          { name: 'Devon W.', channel: 'SMS', body: '<span class="reason">Devon</span>, <span class="reason">session notes showing fatigue</span>. Recovery video coming your way.' },
        ].map((draft, i) => (
          <div key={i} style={{ background: colors.cream, borderRadius: 10, padding: mobile ? '12px 14px' : '16px 18px', marginBottom: mobile ? 8 : 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mobile ? 8 : 10 }}>
              <span style={{ fontSize: mobile ? 12 : 14, fontWeight: 600, color: colors.navy }}>{draft.name}</span>
              <span style={{ fontSize: mobile ? 9 : 10, fontWeight: 600, letterSpacing: '0.14em', color: colors.ink50 }}>{draft.channel}</span>
            </div>
            <div 
              style={{ fontFamily: fonts.display, fontStyle: 'italic', fontSize: mobile ? 13 : 14.5, lineHeight: 1.55, color: colors.ink90, letterSpacing: '-0.005em' }}
              dangerouslySetInnerHTML={{ __html: draft.body.replace(/<span class="reason">/g, `<span style="background: ${colors.mintBg}; color: ${colors.navy}; padding: 1px 6px; border-radius: 3px; font-style: normal; font-family: 'DM Sans', sans-serif; font-size: ${mobile ? 11 : 13}px; font-weight: 500;">`) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Scene 5: Trend Chart Canvas
function TrendChartCanvas({ isActive, mobile }) {
  return (
    <div style={{ padding: mobile ? '16px' : '28px' }}>
      <div style={{ fontSize: mobile ? 10 : 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.ink40, marginBottom: mobile ? 8 : 14, marginTop: mobile ? 4 : 10 }}>Weight trend</div>
      <h2 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: mobile ? 24 : 44, lineHeight: 1.05, letterSpacing: '-0.01em', color: colors.navy, marginBottom: 8 }}>{"Sarah's weight."}</h2>
      
      <div style={{ background: colors.cream, borderRadius: 10, padding: mobile ? '14px 12px' : '24px 26px 22px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: mobile ? 12 : 18 }}>
          <div>
            <div style={{ fontSize: mobile ? 12 : 14, fontWeight: 600, color: colors.navy, marginBottom: 4 }}>Body weight</div>
            <div style={{ fontSize: mobile ? 9 : 10, fontWeight: 700, letterSpacing: '0.18em', color: colors.ink50 }}>12 weeks</div>
          </div>
          <div style={{ textAlign: 'right', lineHeight: 1.1 }}>
            <div style={{ fontFamily: fonts.body, fontSize: mobile ? 20 : 28, fontWeight: 600, color: colors.navy, fontVariantNumeric: 'tabular-nums' }}>
              154<span style={{ fontSize: mobile ? 10 : 12, color: colors.ink50, fontWeight: 500, marginLeft: 2 }}>lb</span>
            </div>
            <div style={{ display: 'inline-block', marginTop: 4, background: colors.mintBg, color: colors.tealDeep, fontSize: mobile ? 10 : 11, fontWeight: 600, padding: mobile ? '2px 8px' : '3px 10px', borderRadius: 14 }}>−14</div>
          </div>
        </div>

        <div style={{ position: 'relative', height: mobile ? 140 : 200 }}>
          <svg viewBox="0 0 700 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4B788" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#F4B788" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Gridlines */}
            <line stroke={colors.ink08} strokeWidth="1" strokeDasharray="2 3" x1="40" y1="40" x2="680" y2="40" />
            <line stroke={colors.ink08} strokeWidth="1" strokeDasharray="2 3" x1="40" y1="90" x2="680" y2="90" />
            <line stroke={colors.ink08} strokeWidth="1" strokeDasharray="2 3" x1="40" y1="140" x2="680" y2="140" />
            {/* Area */}
            <path fill="url(#chart-grad)" opacity={isActive ? 1 : 0} style={{ transition: 'opacity 700ms ease 1700ms' }} d="M 50 38 L 100 42 L 150 56 L 200 70 L 250 78 L 300 92 L 350 105 L 400 120 L 450 130 L 500 142 L 550 152 L 600 158 L 650 162 L 650 180 L 50 180 Z" />
            {/* Line */}
            <path fill="none" stroke={colors.orangeFlag} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
              style={{ 
                strokeDasharray: 1200, 
                strokeDashoffset: isActive ? 0 : 1200,
                transition: 'stroke-dashoffset 1800ms cubic-bezier(0.4, 0, 0.2, 1) 300ms'
              }} 
              d="M 50 38 L 100 42 L 150 56 L 200 70 L 250 78 L 300 92 L 350 105 L 400 120 L 450 130 L 500 142 L 550 152 L 600 158 L 650 162" 
            />
            {/* Dots */}
            {[[50,38],[150,56],[250,78],[350,105],[450,130],[550,152],[650,162]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i === 6 ? 4 : 3.5} fill={i === 6 ? colors.navy : colors.orangeFlag} stroke={colors.cream} strokeWidth="2" 
                style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${600 + i * 180}ms` }} 
              />
            ))}
            {/* X axis labels */}
            {(mobile ? ['W0', 'W6', 'W12'] : ['W0', 'W2', 'W4', 'W6', 'W8', 'W10', 'W12']).map((label, i) => (
              <text key={label} fill={colors.ink50} fontSize="10" fontFamily={fonts.body} fontWeight="600" x={mobile ? 50 + i * 300 : 50 + i * 100} y="195" textAnchor="middle">{label}</text>
            ))}
          </svg>
        </div>

        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, fontFamily: fonts.display, fontStyle: 'italic', fontSize: 14, color: colors.ink70, lineHeight: 1.5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.teal, flexShrink: 0 }} />
            Steady downward trend, no plateaus.
          </div>
        )}
      </div>
    </div>
  );
}

// Scene 6: About You Canvas
function AboutYouCanvas({ mobile }) {
  return (
    <div style={{ padding: mobile ? '16px' : '28px' }}>
      <div style={{ fontSize: mobile ? 10 : 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.ink40, marginBottom: mobile ? 8 : 14, marginTop: mobile ? 4 : 10 }}>About you</div>
      <h2 style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: mobile ? 24 : 38, fontStyle: 'italic', lineHeight: 1.05, letterSpacing: '-0.01em', color: colors.navy, marginBottom: 8 }}>{"The coach I see."}</h2>

      <div style={{ background: colors.mintBg, border: `1px solid ${colors.mintSoft}`, borderRadius: 10, padding: mobile ? '12px 14px' : '18px 22px', marginBottom: mobile ? 16 : 24, fontSize: mobile ? 13 : 16, lineHeight: 1.55, color: colors.navy }}>
        <strong style={{ fontWeight: 600 }}>12 years coaching.</strong>{' '}
        <em style={{ fontFamily: fonts.display, fontStyle: 'italic', fontWeight: 500, color: colors.navy, fontSize: mobile ? 14 : 17 }}>Communication is the program.</em>
      </div>

      {[
        { text: "If you don't hear from a client for a week, that's data.", source: 'Your onboarding doc', italic: true },
        { text: '<strong>4-week blocks</strong> with deload. No exceptions.', source: 'Program archive' },
      ].map((item, i) => (
        <div key={i} style={{ borderLeft: `2px solid ${colors.teal}`, padding: '4px 0 4px 12px', marginBottom: mobile ? 12 : 18 }}>
          <div 
            style={{ 
              fontSize: item.italic ? (mobile ? 14 : 17) : (mobile ? 12 : 14), 
              lineHeight: item.italic ? 1.4 : 1.55, 
              color: colors.navy, 
              marginBottom: 4,
              fontFamily: item.italic ? fonts.display : fonts.body,
              fontStyle: item.italic ? 'italic' : 'normal',
              fontWeight: item.italic ? 500 : 400,
              letterSpacing: item.italic ? '-0.005em' : 0,
            }}
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
          <div style={{ fontFamily: fonts.mono, fontSize: mobile ? 10 : 11, color: colors.ink50 }}>{item.source}</div>
        </div>
      ))}
    </div>
  );
}

// Mobile Bubble Component
function MobileBubble({ text, isActive }) {
  return (
    <div style={{
      display: 'flex',
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 14,
      background: 'white',
      borderRadius: 16,
      padding: '12px 14px 13px',
      gap: 11,
      alignItems: 'flex-start',
      boxShadow: '0 1px 0 rgba(11, 22, 40, 0.04), 0 8px 24px -8px rgba(11, 22, 40, 0.20), 0 2px 6px -2px rgba(11, 22, 40, 0.06)',
      transform: isActive ? 'translateY(0)' : 'translateY(24px)',
      opacity: isActive ? 1 : 0,
      transition: 'transform 600ms cubic-bezier(0.34, 1.2, 0.64, 1) 700ms, opacity 500ms ease 700ms',
      zIndex: 5,
      pointerEvents: isActive ? 'auto' : 'none',
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        flexShrink: 0,
        backgroundImage: `url(${miltonMascot})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 0 0 1px rgba(11, 22, 40, 0.04)',
        marginTop: 1,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: fonts.body,
          fontSize: 12,
          fontWeight: 600,
          color: colors.tealDeep,
          lineHeight: 1.2,
          marginBottom: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          Milton
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: colors.teal }} />
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.45, color: colors.navy }}>{text}</div>
      </div>
    </div>
  );
}

// Main Theater Component
export default function MiltonTheater({ mobile }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const theaterRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % scenes.length);
    }, SCENE_DURATION);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Start auto-rotation
    startTimer();
    return () => stopTimer();
  }, []);

  // Pause on hover (desktop only)
  const handleMouseEnter = () => {
    if (!mobile) stopTimer();
  };

  const handleMouseLeave = () => {
    if (!mobile && !isPaused) startTimer();
  };

  // Handle indicator click
  const handleIndicatorClick = (index) => {
    setCurrentScene(index);
    if (!isPaused) startTimer();
  };

  const renderCanvas = (sceneId, isActive) => {
    switch (sceneId) {
      case 1: return <WorkoutCanvas mobile={mobile} />;
      case 2: return <MorningBriefCanvas mobile={mobile} />;
      case 3: return <ClientProfileCanvas mobile={mobile} />;
      case 4: return <DraftsCanvas mobile={mobile} />;
      case 5: return <TrendChartCanvas isActive={isActive} mobile={mobile} />;
      case 6: return <AboutYouCanvas mobile={mobile} />;
      default: return null;
    }
  };

  return (
    <div 
      ref={theaterRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 55% 55% at 12% 18%, rgba(43, 191, 170, 0.22), transparent 60%),
          radial-gradient(ellipse 60% 60% at 88% 82%, rgba(154, 241, 152, 0.20), transparent 62%),
          radial-gradient(ellipse 80% 80% at 50% 50%, ${colors.cream} 0%, ${colors.stageBg} 100%)
        `,
        borderRadius: mobile ? 18 : 24,
        padding: mobile ? 12 : 32,
        boxShadow: '0 1px 0 rgba(11, 22, 40, 0.04), 0 30px 80px -30px rgba(11, 22, 40, 0.22), 0 12px 30px -14px rgba(11, 22, 40, 0.10)',
      }}
    >
      {/* Shine overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: mobile ? 18 : 24,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255, 255, 255, 0.45), transparent 60%)',
      }} />

      {/* Stage */}
      <div style={{
        position: 'relative',
        height: mobile ? 480 : 660,
        overflow: 'hidden',
        borderRadius: 12,
        zIndex: 1,
      }}>
        {scenes.map((scene, i) => {
          const isActive = i === currentScene;
          return (
            <article 
              key={scene.id}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                gridTemplateColumns: mobile ? '1fr' : '360px 1fr',
                gap: mobile ? 0 : 18,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              {/* Chat Panel (desktop only) */}
              {!mobile && <ChatPanel scene={scene} />}

              {/* Canvas Panel */}
              <main style={{
                background: 'white',
                borderRadius: 14,
                boxShadow: '0 1px 0 rgba(11, 22, 40, 0.04), 0 4px 12px -4px rgba(11, 22, 40, 0.06), 0 18px 40px -16px rgba(11, 22, 40, 0.18)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gridColumn: mobile ? '1 / -1' : 'auto',
              }}>
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  paddingBottom: mobile ? 100 : 0,
                }}>
                  {renderCanvas(scene.id, isActive)}
                </div>
              </main>

              {/* Mobile Bubble */}
              {mobile && <MobileBubble text={scene.mobileBubble} isActive={isActive} />}
            </article>
          );
        })}
      </div>

      {/* Indicators */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: mobile ? 4 : 6,
        padding: mobile ? '14px 0 4px' : '18px 0 4px',
        marginTop: 4,
        position: 'relative',
        zIndex: 1,
      }}>
        {scenes.map((scene, i) => {
          const isActive = i === currentScene;
          return (
            <button
              key={scene.id}
              onClick={() => handleIndicatorClick(i)}
              style={{
                background: 'none',
                border: 'none',
                padding: mobile ? '8px 4px' : '8px 10px',
                cursor: 'pointer',
                fontFamily: fonts.body,
                color: isActive ? colors.navy : colors.ink50,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.04em',
                transition: 'color 200ms ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                minWidth: mobile ? 0 : 110,
                flex: 1,
                maxWidth: mobile ? 'none' : 180,
              }}
            >
              <span style={{
                width: mobile ? 28 : '100%',
                height: 2,
                background: 'rgba(11, 22, 40, 0.10)',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  background: colors.teal,
                  transformOrigin: 'left center',
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transition: isActive ? `transform ${SCENE_DURATION}ms linear` : 'none',
                }} />
              </span>
              {!mobile && <span style={{ textAlign: 'center', lineHeight: 1.3 }}>{scene.indicatorLabel}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
