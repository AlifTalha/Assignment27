require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const News = require('./models/News');

const sampleNews = [
  {
    title: 'Global Tech Summit Announces Breakthrough in AI Research',
    content: 'Leading researchers from around the world gathered at the Global Tech Summit to unveil groundbreaking advances in artificial intelligence. The new models demonstrate unprecedented capabilities in natural language understanding, computer vision, and autonomous decision-making.\n\nExperts believe these developments will reshape industries from healthcare to transportation within the next decade. Major tech companies have already pledged billions in research funding to accelerate deployment.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  },
  {
    title: 'National Team Wins Championship in Thrilling Final',
    content: 'In a match that will be remembered for generations, the national team clinched the championship title with a dramatic last-minute goal. Fans erupted in celebration as the final whistle blew, marking the end of an incredible tournament run.\n\nThe victory caps off a remarkable season for the team, who overcame early setbacks to emerge as champions. The coach praised the players dedication and teamwork throughout the campaign.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ad81?w=800',
  },
  {
    title: 'New Economic Policy Aims to Boost Small Businesses',
    content: 'The government unveiled a comprehensive economic package designed to support small and medium enterprises across the country. The initiative includes tax incentives, low-interest loans, and streamlined regulatory processes.\n\nEconomists predict the policy could create over 500,000 new jobs in the next two years. Business leaders have welcomed the announcement, calling it a much-needed boost for the entrepreneurial sector.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  },
  {
    title: 'Breakthrough Study Reveals Benefits of Mediterranean Diet',
    content: 'A landmark 10-year study published in a leading medical journal confirms the significant health benefits of the Mediterranean diet. Participants who followed the diet showed reduced risk of heart disease, improved cognitive function, and better overall longevity.\n\nResearchers tracked over 25,000 participants across multiple countries, making it one of the most comprehensive nutritional studies ever conducted.',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
  },
  {
    title: 'Blockbuster Film Breaks All-Time Box Office Records',
    content: 'The latest installment in the beloved franchise has shattered box office records worldwide, earning over $2 billion in its opening weeks. Critics and audiences alike have praised the film for its stunning visual effects and compelling storytelling.\n\nThe success has reignited discussions about the future of cinema and the enduring appeal of theatrical experiences in the streaming era.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
  },
  {
    title: 'World Leaders Gather for Climate Action Summit',
    content: 'Representatives from 195 nations convened for an emergency climate summit, pledging ambitious new targets for carbon emission reductions. The agreement includes binding commitments to achieve net-zero emissions by 2050.\n\nEnvironmental activists praised the progress while urging faster action. The summit also announced a $100 billion fund to help developing nations transition to renewable energy sources.',
    category: 'World',
    image: 'https://images.unsplash.com/photo-1569163139599-0b0bb4e2d088?w=800',
  },
  {
    title: 'Election Results Show Shift in Political Landscape',
    content: 'Preliminary election results indicate a significant shift in the political landscape, with several upsets in key districts. Voter turnout reached record levels, reflecting heightened public engagement in the democratic process.\n\nPolitical analysts are closely watching coalition negotiations, which could take weeks to finalize. The new parliament is expected to address pressing issues including economic reform and social policy.',
    category: 'Politics',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800',
  },
  {
    title: 'Revolutionary Quantum Computer Achieves New Milestone',
    content: 'Scientists have successfully demonstrated quantum supremacy with a new 1000-qubit processor, solving complex problems that would take classical computers thousands of years. The breakthrough opens new possibilities in drug discovery, cryptography, and materials science.\n\nTech giants and governments are racing to develop practical quantum computing applications, with investments exceeding $50 billion globally.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
  },
];

async function seed() {
  try {
    await connectDB();

    const existingNews = await News.countDocuments();
    if (existingNews > 0) {
      console.log(`Database already has ${existingNews} news articles. Skipping seed.`);
      process.exit(0);
    }

    let user = await User.findOne({ email: 'demo@newsportal.com' });
    if (!user) {
      user = await User.create({
        name: 'Demo Editor',
        email: 'demo@newsportal.com',
        password: 'demo123',
        bio: 'Lead editor at NewsPortal with 10 years of journalism experience.',
      });
      console.log('Demo user created: demo@newsportal.com / demo123');
    }

    for (const article of sampleNews) {
      await News.create({ ...article, author: user._id, views: Math.floor(Math.random() * 500) + 50 });
    }

    console.log(`Seeded ${sampleNews.length} news articles successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
