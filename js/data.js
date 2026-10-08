// Galactico United FC — site content data (news, teams, gallery, results, fixtures).
// Edit this file to update the club content shown across the site.

const ICON = {
  dev: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 3 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9.1 9 12 3Z"></path></svg>',
  teams: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path></svg>',
  cal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="17"></rect><path d="M3 10h18M8 2v4M16 2v4"></path></svg>',
  news: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"></path></svg>',
  join: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><circle cx="9.5" cy="7" r="4"></circle><path d="M19 8v6M22 11h-6"></path></svg>',
  trophy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3M10 17h4M9 21h6M12 13v4"></path></svg>',
  compete: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path></svg>',
  grow: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m2 8 10-4 10 4-10 4L2 8Z"></path><path d="M6 10v4c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-4"></path></svg>',
  belong: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z"></path></svg>'
};

const NEWS = [
  { id: 'champs', cat: 'MATCH REPORTS', date: '30 AUG 2026', title: 'U8s Crowned SLFA Prem League Champions!',
    img: 'assets/squad-u8.jpg', pos: '50% 40%',
    excerpt: 'Our U8s have completed an unbeaten season, winning the SLFA Premier League title.',
    body: ['Our U8s have officially finished the league season as unbeaten Champions, going the entire campaign with just one solitary draw.',
      'The title was sealed with a 3–2 win over Rietvlei FC A — a result that capped a season built on patient coaching, weekly development work and a squad that kept turning up for each other.',
      'An incredible achievement from our young stars, and a milestone for a club in its first generation.'] },
  { id: 'roundup', cat: 'MATCH REPORTS', date: '29 AUG 2026', title: 'Matchday Results Round Up',
    img: 'assets/u9-mavericks-duel.jpg', pos: '50% 35%',
    excerpt: 'A full weekend of SLFA Premier League football across the age groups, with wins for the U10s, U11s, U12s, U13s, U14s and U15s.',
    body: ['Another action-packed weekend brought goals, comebacks, important wins and valuable lessons for our club.',
      'Highlights included a 14–0 win for the U9 Mavericks away at Linhill Celtic A, a 7–0 U11 result against Robertsham Callies FC A, and 3–1 wins on the road for both the U12s and U14s at Mondeor Meteors FC A.',
      'To our players, coaches, parents and supporters: thank you for continuing to stand together and represent Galactico United with pride.'] },
  { id: 'beyond', cat: 'DEVELOPMENT', date: '25 AUG 2026', title: 'Player Development Beyond the Game',
    img: 'assets/u6-7-coach.jpg', pos: '50% 30%',
    excerpt: 'At Galactico, we focus on more than just football. We develop character, discipline and life skills.',
    body: ['Through our partnership with GSSI Ormonde we offer all-year-round training and development, which means players are assessed and coached outside of the season as well as inside it.',
      'Professional coaching and philosophy-driven development sit alongside a commitment to excellence and holistic long-term player development.',
      'Football is the vehicle. The habits — discipline, responsibility, teamwork — are what players carry with them.'] },
  { id: 'assess', cat: 'CLUB NEWS', date: '20 AUG 2026', title: "Don't Wait for January — Get Assessed Now",
    img: 'assets/assessments-flyer.jpg', pos: '50% 20%',
    excerpt: 'Assessments for U6 – U13 are open in partnership with GSSI Ormonde, ahead of 2026 squad selection.',
    body: ['Register with GSSI Ormonde, attend training sessions, and be assessed by GSSI and Galactico United coaches for 2026 squad selection.',
      'Assessments are open to players born between 2013 and 2020 and take place at GSSI Ormonde.',
      'Secure your spot and be part of the first generation of Galacticos in South Africa.'] },
  { id: 'family', cat: 'COMMUNITY', date: '17 AUG 2026', title: 'One Club. One Family. One Galactico.',
    img: 'assets/squad-u6-7.jpg', pos: '50% 45%',
    excerpt: 'A weekend for the club: moments of celebration, lessons to learn and memories to build.',
    body: ['Our teams continued to battle, compete and represent the badge with pride across the SLFA Premier League.',
      'What a weekend for the club — moments of celebration, lessons to learn and memories to build.',
      'To our players, coaches, parents and supporters: thank you for standing together.'] },
  { id: 'poster', cat: 'MATCH REPORTS', date: '16 AUG 2026', title: 'SLFA Premier League | Matchday Results',
    img: 'assets/results-poster.jpg', pos: '50% 10%',
    excerpt: 'Results from the weekend of 15 and 16 August 2026 across every Galactico United age group.',
    body: ['Another weekend of football, development and plenty of action for the Galactico United family.',
      'The U11s recorded a 13–0 win over Mondeor Meteors FC A, while the U8s secured the SLFA U8 Premier League Championship.',
      'Full results are listed on the Fixtures & Results page.'] }
];

const TEAMS = [
  { age: 'U6', phase: 'Foundation Phase', img: 'assets/squad-u6.jpg', pos: '50% 45%', note: 'First contact with organised football: ball mastery, coordination and confidence through play.' },
  { age: 'U7', phase: 'Foundation Phase', img: 'assets/squad-u7.jpg', pos: '50% 45%', note: 'Trailblazers and Mavericks squads competing in SLFA U6 & U7 football.' },
  { age: 'U8', phase: 'Development Phase', img: 'assets/squad-u8.jpg', pos: '50% 45%', note: 'SLFA Premier League Champions 2026 — an unbeaten league campaign with a single draw.' },
  { age: 'U9', phase: 'Development Phase', img: 'assets/squad-u9.jpg', pos: '50% 45%', note: 'Mavericks and Trailblazers squads, building technique under pressure.' },
  { age: 'U10', phase: 'Competitive Development', img: 'assets/u10-duel.jpg', pos: '50% 50%', note: 'Position awareness, first-touch quality and decision speed in competitive fixtures.' },
  { age: 'U11', phase: 'Competitive Development', img: 'assets/u11-duel.jpg', pos: '50% 45%', note: 'A high-scoring league season including 13–0 and 7–0 league results.' },
  { age: 'U12', phase: 'Competitive Development', img: 'assets/squad-u12.jpg', pos: '50% 40%', note: 'Tactical structure, game understanding and consistency week to week.' },
  { age: 'U13', phase: 'Elite Pathway', img: 'assets/u13-lineup.jpg', pos: '50% 45%', note: 'Entry into the elite pathway: physical development alongside technical detail.' },
  { age: 'U14', phase: 'Elite Pathway', img: 'assets/action-goal.jpg', pos: '60% 30%', note: 'Competing in the SLFA Premier League with a focus on match intelligence.' },
  { age: 'U15', phase: 'Elite Pathway', img: 'assets/action-juggle.jpg', pos: '55% 30%', note: 'The final youth stage: preparing players for senior and representative football.' }
];

const PHASES = [
  { label: 'U6 – U7', phase: 'Foundation Phase', img: 'assets/u6-7-dribble.jpg', pos: '50% 40%', team: 'U6' },
  { label: 'U8 – U9', phase: 'Development Phase', img: 'assets/u9-mavericks-duel.jpg', pos: '50% 40%', team: 'U8' },
  { label: 'U10 – U12', phase: 'Competitive Phase', img: 'assets/u11-duel.jpg', pos: '50% 40%', team: 'U10' },
  { label: 'U13 – U15', phase: 'Elite Pathway', img: 'assets/u13-dribble.jpg', pos: '50% 45%', team: 'U13' }
];

const GALLERY = [
  { img: 'assets/u13-dribble.jpg', pos: '50% 45%', caption: 'U13 — driving through midfield', cat: 'MATCHDAY' },
  { img: 'assets/squad-u8.jpg', pos: '50% 45%', caption: 'U8 squad — SLFA Premier League Champions', cat: 'TEAMS' },
  { img: 'assets/u9-mavericks-volley.jpg', pos: '50% 40%', caption: 'U9 Mavericks — controlling the high ball', cat: 'MATCHDAY' },
  { img: 'assets/u11-team-talk.jpg', pos: '60% 45%', caption: 'U11 team talk on the sideline', cat: 'TRAINING' },
  { img: 'assets/u10-duel.jpg', pos: '50% 50%', caption: 'U10 — one-on-one on the ball', cat: 'MATCHDAY' },
  { img: 'assets/squad-u12.jpg', pos: '50% 40%', caption: 'U12 squad', cat: 'TEAMS' },
  { img: 'assets/u6-7-keeper.jpg', pos: '50% 45%', caption: 'U6 & U7 — safe hands in goal', cat: 'MATCHDAY' },
  { img: 'assets/u11-strike.jpg', pos: '50% 45%', caption: 'U11 — striking the ball', cat: 'MATCHDAY' },
  { img: 'assets/u9-huddle.jpg', pos: '50% 40%', caption: 'U9 huddle before kick-off', cat: 'TEAMS' },
  { img: 'assets/u6-7-laces.jpg', pos: '50% 50%', caption: 'Coaches on hand for our youngest players', cat: 'COMMUNITY' },
  { img: 'assets/u12-strike.jpg', pos: '50% 45%', caption: 'U12 — winning the ball', cat: 'MATCHDAY' },
  { img: 'assets/u9-trailblazers.jpg', pos: '50% 45%', caption: 'U9 Trailblazers on the attack', cat: 'MATCHDAY' },
  { img: 'assets/u8-dribble.jpg', pos: '50% 45%', caption: 'U8 — running with the ball', cat: 'MATCHDAY' },
  { img: 'assets/u6-7-dribble.jpg', pos: '50% 45%', caption: 'U6 & U7 — first touches', cat: 'TRAINING' },
  { img: 'assets/results-poster.jpg', pos: '50% 15%', caption: 'SLFA Premier League matchday results', cat: 'COMMUNITY' },
  { img: 'assets/assessments-flyer.jpg', pos: '50% 20%', caption: 'Assessments with GSSI Ormonde', cat: 'COMMUNITY' }
];

const RESULTS = [
  { date: 'SAT 29 AUG 2026', rows: [
      { age: 'U9 MAVERICKS', home: 'Linhill Celtic A', hs: '0', as: '14', away: 'Galactico United FC (Mavericks)' },
      { age: 'U10', home: 'Rietvlei FC A', hs: '1', as: '2', away: 'Galactico United FC' } ] },
  { date: 'SUN 30 AUG 2026', rows: [
      { age: 'U11', home: 'Galactico United FC', hs: '7', as: '0', away: 'Robertsham Callies FC A' },
      { age: 'U12', home: 'Mondeor Meteors FC A', hs: '1', as: '3', away: 'Galactico United FC' },
      { age: 'U13', home: 'Galactico United FC', hs: '4', as: '1', away: 'Jeppe FC' },
      { age: 'U14', home: 'Mondeor Meteors FC A', hs: '1', as: '3', away: 'Galactico United FC' },
      { age: 'U15', home: 'Galactico United FC', hs: '3', as: '0', away: 'Alveda FC' } ] },
  { date: 'SAT 22 AUG 2026', rows: [
      { age: 'U8', home: 'Galactico United FC', hs: '3', as: '2', away: 'Rietvlei FC A', tag: 'CHAMPIONS' },
      { age: 'U10', home: 'Galactico United FC', hs: '4', as: '2', away: 'Linhill Celtic FC A' },
      { age: 'U11', home: 'Galactico United FC', hs: '4', as: '3', away: 'Rietvlei FC A' },
      { age: 'U13', home: 'Galactico United FC', hs: '3', as: '2', away: 'Rietvlei FC A' },
      { age: 'U14', home: 'Hola Skoko Sporting', hs: '3', as: '3', away: 'Galactico United FC' },
      { age: 'U15', home: 'Waterstone FC', hs: '1', as: '6', away: 'Galactico United FC' } ] },
  { date: 'SUN 23 AUG 2026', rows: [
      { age: 'U12', home: 'Galactico United FC', hs: '5', as: '1', away: 'Linhill Celtic FC A' },
      { age: 'U13', home: 'Galactico United FC', hs: '1', as: '4', away: 'Hola Skoko Sporting' },
      { age: 'U14', home: 'Galactico United FC', hs: '2', as: '2', away: 'Linhill Celtic FC A' },
      { age: 'U9', home: 'Galactico United FC', hs: '2', as: '7', away: 'Hola Skoko Sporting' } ] },
  { date: 'SAT 15 AUG 2026', rows: [
      { age: 'U6 & U7', home: 'Galactico United FC (Trailblazers)', hs: '3', as: '6', away: 'Galactico United FC (Mavericks)' },
      { age: 'U8', home: 'Robertsham Callies FC', hs: '3', as: '4', away: 'Galactico United FC' },
      { age: 'U9', home: 'Galactico United FC (Trailblazers)', hs: '0', as: '3', away: 'Galactico United FC (Mavericks)' },
      { age: 'U11', home: 'Galactico United FC', hs: '13', as: '0', away: 'Mondeor Meteors FC A' } ] },
  { date: 'SUN 16 AUG 2026', rows: [
      { age: 'U6 & U7', home: 'Linhill Celtic U7', hs: '2', as: '2', away: 'Galactico United FC (Trailblazers)', tag: 'CATCH-UP' },
      { age: 'U13', home: 'Robertsham Callies FC', hs: '7', as: '2', away: 'Galactico United FC' },
      { age: 'U15', home: 'Galactico United FC', hs: '2', as: '1', away: 'Hola Skoko Sporting' } ] }
];

const FIXTURES = [
  { dow: 'SAT', date: '10 OCT', age: 'U9 MAVERICKS', vs: 'vs Hola Skoko Sporting', venue: 'Away', time: '10:00', crest: 'HS' },
  { dow: 'SAT', date: '10 OCT', age: 'U9 TRAILBLAZERS', vs: 'vs Rietvlei FC A', venue: 'Away', time: '10:00', crest: 'RV' },
  { dow: 'SAT', date: '10 OCT', age: 'U15', vs: 'vs Classico FC', venue: 'Away', time: '13:30', crest: 'CF' },
  { dow: 'SUN', date: '11 OCT', age: 'U12', vs: 'vs Titus FC', venue: 'Away', time: '09:00', crest: 'TF' },
  { dow: 'SUN', date: '11 OCT', age: 'U13', vs: 'vs Robertsham Callies FC A', venue: 'Home', time: '10:30', crest: 'RC' },
  { dow: 'SUN', date: '11 OCT', age: 'U15', vs: 'vs Linhill Celtic FC A', venue: 'Away', time: '13:30', crest: 'LC' }
];

const NEWS_CATS = ['ALL', 'MATCH REPORTS', 'CLUB NEWS', 'DEVELOPMENT', 'COMMUNITY'];
const GALLERY_CATS = ['ALL', 'MATCHDAY', 'TRAINING', 'TEAMS', 'COMMUNITY'];
