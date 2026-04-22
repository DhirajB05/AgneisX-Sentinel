import React from 'react';

const GLOBE_ART = [
  '                        _______________                       ',
  '                   _--""               ""-_                   ',
  '                ,-"    _____     _____    "-,                ',
  '             ,-"    ,-"     "-, -"     "-,   "-,             ',
  '           ,"     ,"    *     ","    *    ",    ",           ',
  '         ,"     ,"  DETECTION  ","  SHIELD  ",    ",         ',
  '        /     ,"_______________","___________",    \\        ',
  '       /    ,"   |             |             |",    \\       ',
  '      |   ,"     |    L1       |     L2      | ",    |      ',
  '      |  |       |  DeBERTa   |   SENTINEL   |   |  |      ',
  '      |  |       |   <50ms    |   300-800ms   |   |  |      ',
  '      |  |       |    BERT    |   AI ENGINE   |   |  |      ',
  '      |   ",     |             |             | ,"    |      ',
  '       \\    ",___|_____________|_____________|,"    /       ',
  '        \\     ",               ","           ,"    /        ',
  '         ",     ",    SAFE    ","   BLOCK   ,"    ,"         ',
  '           ",    "-, ________,-  "-,_______,-   ,"           ',
  '             "-,    "-,     ,-"    "-,    ,-  ,"             ',
  '                "-,    "---"          "---" ,-"              ',
  '                   "--__               __--"                  ',
  '                        """----------"""                      ',
];

export default function GlobeHero() {
  return (
    <div style={{
      width: '100%', maxWidth: '560px', margin: '0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <pre style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        lineHeight: '16px',
        color: '#333',
        letterSpacing: '0.5px',
        userSelect: 'none',
        whiteSpace: 'pre',
      }}>
        {GLOBE_ART.map((line, i) => {
          const parts = [];
          let remaining = line;

          const highlights = [
            { text: 'DETECTION', color: '#22C55E' },
            { text: 'SHIELD', color: '#22C55E' },
            { text: 'L1', color: '#22C55E' },
            { text: 'L2', color: '#22C55E' },
            { text: 'DeBERTa', color: '#555' },
            { text: 'SENTINEL', color: '#22C55E' },
            { text: '<50ms', color: '#4B5563' },
            { text: '300-800ms', color: '#4B5563' },
            { text: 'BERT', color: '#555' },
            { text: 'AI ENGINE', color: '#555' },
            { text: 'SAFE', color: '#22C55E' },
            { text: 'BLOCK', color: '#EF4444' },
            { text: '*', color: '#22C55E' },
          ];

          let pos = 0;
          const segments = [];

          while (pos < line.length) {
            let matched = false;
            for (const h of highlights) {
              if (line.substring(pos).startsWith(h.text)) {
                if (pos > segments.reduce((a, s) => a + s.text.length, 0)) {
                  const gap = line.substring(segments.reduce((a, s) => a + s.text.length, 0), pos);
                  segments.push({ text: gap, color: null });
                }
                segments.push({ text: h.text, color: h.color });
                pos += h.text.length;
                matched = true;
                break;
              }
            }
            if (!matched) pos++;
          }

          const totalLen = segments.reduce((a, s) => a + s.text.length, 0);
          if (totalLen < line.length) {
            segments.push({ text: line.substring(totalLen), color: null });
          }

          if (segments.length === 0) {
            return <span key={i}>{line}{'\n'}</span>;
          }

          return (
            <span key={i}>
              {segments.map((s, j) => (
                <span key={j} style={s.color ? { color: s.color } : undefined}>{s.text}</span>
              ))}
              {'\n'}
            </span>
          );
        })}
      </pre>
    </div>
  );
}
