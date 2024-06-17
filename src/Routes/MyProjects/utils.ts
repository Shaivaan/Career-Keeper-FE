
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50rem',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflow:'auto'
  };


  const tech_used_array = [
    // Version Control
    'Git',
    'Github',
    'GitLab',
    'Bitbucket',
  
    // Frontend
    'HTML',
    'CSS',
    'JavaScript',
    'Typescript',
    'React',
    'Vue.js',
    'Angular',
    'Svelte',
    'Bootstrap',
    'Tailwind CSS',
    'Material-UI',
    'Chakra UI',
  
    // Backend
    'NodeJS',
    'Express',
    'Django',
    'Flask',
    'Ruby on Rails',
    'Spring Boot',
    'ASP.NET',
    'Koa',
    'NestJS',
  
    // Databases
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'SQLite',
    'Firebase Firestore',
    'Redis',
    'Cassandra',
    'Elasticsearch',
  
    // DevOps & CI/CD
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Travis CI',
    'CircleCI',
    'GitHub Actions',
    'Terraform',
    'Ansible',
  
    // Cloud Services
    'AWS',
    'Azure',
    'Google Cloud Platform',
    'Heroku',
    'Netlify',
    'Vercel',
    'DigitalOcean',
  
    // Testing
    'Jest',
    'Mocha',
    'Chai',
    'Cypress',
    'Puppeteer',
    'Selenium',
    'Postman',
  
    // Mobile Development
    'React Native',
    'Flutter',
    'Ionic',
    'Swift',
    'Kotlin',
    'Objective-C',
  
    // Miscellaneous
    'GraphQL',
    'REST',
    'Webpack',
    'Babel',
    'ESLint',
    'Prettier',
    'Redux',
    'MobX',
    'Next.js',
    'Nuxt.js',
    'Gatsby',
    'Electron',
    'Serverless',
    'Apache Kafka',
    'RabbitMQ',
    'Nginx',
    'Apache HTTP Server',
    'Jupyter',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn'
  ];
    const professionObject = (category:RoleType,role:string)=> {return {category,role}}
  const professions = [
    // Frontend Technologies
    professionObject('Frontend', 'React'),
    professionObject('Frontend', 'Vue'),
    professionObject('Frontend', 'Angular'),
    professionObject('Frontend', 'Svelte'),
    professionObject('Frontend', 'Ember.js'),
    professionObject('Frontend', 'Backbone.js'),
    professionObject('Frontend', 'jQuery'),
    professionObject('Frontend', 'Bootstrap'),
    professionObject('Frontend', 'Tailwind CSS'),
    professionObject('Frontend', 'Foundation'),
    professionObject('Frontend', 'Material-UI'),
    professionObject('Frontend', 'Semantic UI'),
    professionObject('Frontend', 'Bulma'),
    professionObject('Frontend', 'Gatsby'),
    professionObject('Frontend', 'Next.js'),
    professionObject('Frontend', 'Nuxt.js'),
    professionObject('Frontend', 'Redux'),
    professionObject('Frontend', 'MobX'),
    professionObject('Frontend', 'Apollo Client'),
    professionObject('Frontend', 'GraphQL'),
    
    // Backend Technologies
    professionObject('Backend', 'ROR'),
    professionObject('Backend', 'Django'),
    professionObject('Backend', 'Node.js'),
    professionObject('Backend', 'Express.js'),
    professionObject('Backend', 'Spring Boot'),
    professionObject('Backend', 'Laravel'),
    professionObject('Backend', 'Symfony'),
    professionObject('Backend', 'Flask'),
    professionObject('Backend', 'ASP.NET Core'),
    professionObject('Backend', 'Phoenix (Elixir)'),
    professionObject('Backend', 'Koa.js'),
    professionObject('Backend', 'NestJS'),
    professionObject('Backend', 'FastAPI'),
    professionObject('Backend', 'Hapi.js'),
    professionObject('Backend', 'Gin (Golang)'),
    professionObject('Backend', 'Play Framework'),
    professionObject('Backend', 'Sails.js'),
    professionObject('Backend', 'AdonisJS'),
    professionObject('Backend', 'CakePHP'),
    professionObject('Backend', 'FuelPHP'),
    
    // Engineer Roles
    professionObject('Engineer', 'DevOps'),
    professionObject('Engineer', 'QA'),
    professionObject('Engineer', 'Full Stack'),
    professionObject('Engineer', 'Site Reliability Engineer (SRE)'),
    professionObject('Engineer', 'Test Automation Engineer'),
    professionObject('Engineer', 'Systems Engineer'),
    professionObject('Engineer', 'Security Engineer'),
    professionObject('Engineer', 'Cloud Engineer'),
    professionObject('Engineer', 'Data Engineer'),
    professionObject('Engineer', 'Machine Learning Engineer'),
    professionObject('Engineer', 'AI Engineer'),
    professionObject('Engineer', 'Blockchain Engineer'),
    professionObject('Engineer', 'Embedded Systems Engineer'),
    professionObject('Engineer', 'Mobile Engineer (iOS)'),
    professionObject('Engineer', 'Mobile Engineer (Android)'),
    professionObject('Engineer', 'Game Developer'),
    professionObject('Engineer', 'AR/VR Developer'),
    professionObject('Engineer', 'IoT Engineer'),
    professionObject('Engineer', 'Big Data Engineer'),
    professionObject('Engineer', 'DevSecOps Engineer')
  ];

  export {style,tech_used_array,professions,professionObject}