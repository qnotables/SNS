export const programs = [
  {
    slug: 'stability-and-housing', title: 'Stability and Housing',
    description: 'A stable foundation. A safe place to begin again.',
    overview: 'We are developing a model that starts with basic needs: housing stability, food, transportation, and a supportive environment. These are goals for future programs, not services currently provided by Shepherds Not Sheep.',
    goals: ['Explore housing partnerships and local referral pathways.', 'Build relationships around food, transportation, and everyday necessities.', 'Develop a practical, individualized approach to long-term stability.'],
    image: '/images/sns-hero-workshop.png', imageAlt: 'Illustrative workshop scene representing future hands-on programs',
    resourceCategory: 'Housing and Homelessness',
  },
  {
    slug: 'veteran-advocacy', title: 'Veteran Advocacy',
    description: 'Help finding the next step through a complex system.',
    overview: 'Our planned advocacy work focuses on helping veterans locate reliable information about benefits and community resources. We do not provide accredited VA claims representation, legal advice, or guaranteed benefits.',
    goals: ['Connect veterans with official benefits information.', 'Develop referral relationships with qualified advocates.', 'Help veterans identify questions and prepare for conversations with providers.'],
    image: '/images/sns-community.png', imageAlt: 'Illustrative community workshop gathering',
    resourceCategory: 'VA Benefits',
  },
  {
    slug: 'education-and-employment', title: 'Education and Employment',
    description: 'Turn experience into opportunity, one step at a time.',
    overview: 'We intend to connect education, career preparation, and useful training. Future opportunities depend on partnerships and funding; no training enrollment, certification, internship, or job placement is currently guaranteed.',
    goals: ['Explore vocational education and certification pathways.', 'Develop career-readiness and resume support.', 'Build relationships with educators and potential employers.'],
    image: '/images/sns-cnc.png', imageAlt: 'Illustrative CNC workshop training scene',
    resourceCategory: 'Employment and Career Development',
  },
  {
    slug: 'entrepreneurship', title: 'Entrepreneurship',
    description: 'Practical tools for building something of your own.',
    overview: 'Our long-term model includes small-business education, mentorship, and financial literacy. We are exploring ways for veterans to learn about business planning, sales, and responsible growth, without promising financing or business outcomes.',
    goals: ['Explore business planning and financial-literacy workshops.', 'Connect with experienced business mentors.', 'Develop opportunities to learn about sales and online commerce.'],
    image: '/images/sns-entrepreneurship.png', imageAlt: 'Illustrative business planning conversation in a workshop',
    resourceCategory: 'Employment and Career Development',
  },
  {
    slug: 'skills-and-self-sufficiency', title: 'Skills and Self-Sufficiency',
    description: 'Useful work. New confidence. Greater independence.',
    overview: 'We envision hands-on learning in trades, gardening, maintenance, and practical life skills. Equipment, facilities, safety practices, and qualified support must be established before any direct training begins.',
    goals: ['Develop safe, supported hands-on learning opportunities.', 'Explore woodworking, CNC, gardening, and maintenance skills.', 'Pair practical education with mentorship and personal goals.'],
    image: '/images/sns-craftsmanship.png', imageAlt: 'Hands working with wood in an illustrative workshop scene',
    resourceCategory: 'Education and Training',
  },
  {
    slug: 'community-and-purpose', title: 'Community and Purpose',
    description: 'A renewed sense of belonging, built together.',
    overview: 'Community is central to the model we are developing. We intend to create space for mentorship, volunteering, shared projects, and meaningful connections. Current involvement starts with a conversation, not enrollment in a formal program.',
    goals: ['Build a network of interested veterans and volunteers.', 'Explore peer mentorship and community projects.', 'Develop opportunities to serve, learn, and contribute together.'],
    image: '/images/sns-agriculture.png', imageAlt: 'Illustrative scene of people walking through a community garden',
    resourceCategory: 'Community Organizations',
  },
] as const

export function findProgram(slug: string) {
  return programs.find((program) => program.slug === slug)
}
