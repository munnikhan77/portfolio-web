export const profile = {
  name: 'Munni Khan',
  role: 'Web Developer',
  location: 'Nepal',
  email: 'munnikhan8879@gmail.com',
  phone: '9847688884',
  experience: '2+ years',
  education: 'Studying at MIT — Model Institute of Technology',
  tagline: 'I build digital experiences that feel human — light, breath, and a little bit of wonder.',
  about: [
    'I am a web developer from Nepal with 2+ years of experience building websites, admin panels and e-commerce stores. I am currently studying at MIT — Model Institute of Technology.',
    'Code became my camera. Design became my script. I make interfaces that don’t just work — they land in the chest.',
  ],
  belief: 'If it doesn’t move you, it isn’t finished.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/munnikhan77' },
    { label: 'Email', href: 'mailto:munnikhan8879@gmail.com' },
    { label: 'Call', href: 'tel:+9779847688884' },
  ],
}

export const pagesEmotion = {
  about: {
    feeling: 'Belonging',
    whisper: 'Who I am when the screen goes dark',
    closer: 'Still learning. Still building. Still moved by a well-timed fade.',
  },
  work: {
    feeling: 'Pride',
    whisper: 'Pieces I stayed up for — not for perfection, for truth',
    closer: 'Every project left a mark. Some soft. Some sharp. All mine.',
  },
  skills: {
    feeling: 'Focus',
    whisper: 'The hands behind the feeling',
    closer: 'Tools are nothing without intent. Intent is nothing without care.',
  },
  contact: {
    feeling: 'Open',
    whisper: 'If something in you stirred — write me',
    closer: 'No pitch decks required. Just a spark, a story, a maybe.',
  },
}

export const projects = [
  {
    id: '01',
    slug: 'inspire-2082',
    title: 'Inspire 2082',
    year: '2025',
    category: 'Organization · Website',
    emotion: 'Hope',
    summary: 'A home on the web for an organization that wants to inspire — clear, warm and easy to explore.',
    accent: '#141414',
    role: 'Design · Full-stack Development',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Admin Panel'],
    url: 'https://inspire2082.org/',
    body: [
      'Inspire 2082 needed a site that tells its story simply and lets people get involved without friction.',
      'I built the public website along with an admin side, so the team can update content on their own.',
    ],
  },
  {
    id: '02',
    slug: 'ambition-guru-college',
    title: 'Ambition Guru College',
    year: '2025',
    category: 'Education · Website',
    emotion: 'Ambition',
    summary: 'A college website built for students and parents — programs, notices and admissions in one place.',
    accent: '#1c1c1c',
    role: 'Frontend · Backend · Admin',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'REST API'],
    url: 'https://ambitiongurucollege.edu.np/',
    body: [
      'A college site has many audiences — students, parents, faculty. Each one should find what they need fast.',
      'I worked on the pages, structure and the content management side so the college can keep it fresh.',
    ],
  },
  {
    id: '03',
    slug: 'ghunsa',
    title: 'Ghunsa',
    year: '2024',
    category: 'Organization · Website',
    emotion: 'Belonging',
    summary: 'A website that carries the spirit of a community from the mountains to the world.',
    accent: '#222222',
    role: 'Design · Development',
    stack: ['Vue', 'Nuxt', 'CSS'],
    url: 'https://ghunsa.org/',
    body: [
      'Ghunsa is about people and place. The website had to feel rooted, honest and welcoming.',
      'I built it to be light, responsive and easy for the organization to manage.',
    ],
  },
  {
    id: '04',
    slug: 'admin-dashboards',
    title: 'Admin Dashboards',
    year: '2024',
    category: 'Admin · Web App',
    emotion: 'Control',
    summary: 'Admin panels that make managing content, users and data feel calm instead of complicated.',
    accent: '#2a2a2a',
    role: 'Full-stack Development',
    stack: ['Vue', 'Nuxt', 'TypeScript', 'REST API'],
    body: [
      'I have built multiple admin sites — content management, user roles, reports and data tables.',
      'The goal every time: the person using it daily should never feel lost.',
    ],
  },
  {
    id: '05',
    slug: 'ecommerce',
    title: 'E-commerce Stores',
    year: '2024',
    category: 'E-commerce',
    emotion: 'Desire',
    summary: 'Online stores with smooth product browsing, cart and checkout — built to sell.',
    accent: '#303030',
    role: 'Frontend · Backend',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Payments'],
    body: [
      'I have built e-commerce sites with product listings, cart, orders and admin-side inventory.',
      'Shopping should feel easy — fast pages, clear products, and a checkout that just works.',
    ],
  },
]

export const skills = [
  {
    group: 'Craft',
    feeling: 'Patience',
    line: 'I stay with the details until they stop feeling forced.',
    items: ['Nuxt', 'Vue', 'TypeScript', 'Three.js', 'GSAP'],
  },
  {
    group: 'Form',
    feeling: 'Empathy',
    line: 'Shape is how emotion becomes visible.',
    items: ['UI Design', 'Motion', '3D for Web', 'Design Systems'],
  },
  {
    group: 'Sense',
    feeling: 'Instinct',
    line: 'I listen for what the silence between clicks is saying.',
    items: ['Storytelling', 'Art Direction', 'Accessibility', 'Performance'],
  },
]

export const timeline = [
  { year: 'Now', text: 'Studying at MIT — Model Institute of Technology, while building real client websites.' },
  { year: '2025', text: 'Built websites for Inspire 2082, Ambition Guru College and Ghunsa.' },
  { year: '2024', text: 'Started professionally — admin dashboards and e-commerce stores. 2+ years and counting.' },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug || p.id === slug)
}
