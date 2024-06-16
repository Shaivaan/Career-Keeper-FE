
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


  const tech_used_array = ['Git','HTML','CSS', 'Typescript', 'NodeJS','Github','MongoDB','React'];
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