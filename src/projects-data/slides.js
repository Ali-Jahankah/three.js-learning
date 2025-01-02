export const projects = [
  {
    title: 'Pollenize',
    description:
      'The Rewilding Tool is part of the Pollenize project, aimed at improving biodiversity and supporting insect recovery. I contributed to this tool, allowing users to mark locations on a customized Google Map and input seed packet data. I worked with React, Firebase, BigQuery, Firestore, TypeScript, and Storybook to build a user-friendly interface. I also integrated the Google Maps API, collaborated in an Agile environment, followed Figma design guidelines using Tailwind CSS, and helped track environmental contributions, including rewilding 1.16 square meters and sowing 1.1K seed packets so far.',
    serverLink: '',
    slide: 9,
    liveLink: 'https://www.pollenize.org.uk/rewilding-tool',
    clientLink: '',
    sourceLink: ''
  },
  {
    title: 'Nginx Load balancer',
    description:
      'This project sets up a load-balanced environment for development, consisting of three Node.js backend servers, a React frontend, and an Nginx load balancer. The Nginx server routes API requests to one of the backend servers and forwards all other requests to the React frontend. If any of the backend servers fail, Nginx automatically redirects traffic to the remaining available servers, ensuring high availability and fault tolerance. This setup is ideal for simulating a real-world distributed architecture.',
    serverLink: '',
    slide: 2,
    liveLink: '',
    clientLink: '',
    sourceLink: 'https://github.com/Ali-Jahankah/nginx-alb'
  },
  {
    title: 'palindrome game & scores',
    description:
      "This project sets up an Express server with in-memory score management using NodeCache. It provides an API for submitting word entries and retrieving top scores, leveraging basic string validation to determine points. It uses AngularJS for the front end to interact with the API.After running the project, users can submit a name and a word through the front end. The application will validate the word, calculate points based on its length (if it's a palindrome), and store the scores in memory.",
    serverLink: '',
    slide: 3,
    liveLink: '',
    clientLink: '',
    sourceLink:
      'https://github.com/Ali-Jahankah/ali-jahankhah-supersolid-platform'
  },
  {
    title: 'live server status',
    description:
      'This is a React/TypeScript project that uses WebSocket to interact with a Node.js server and display live data. State management is handled with Recoil.js, and navigation between pages is managed using React Router DOM. The application is designed for efficiency, even with a high number of users. Instead of making multiple API calls from the front end (which could be problematic with, for example, 10,000 users generating 10,000 API calls), a WebSocket connection is established when the user opens the page. Initially, the client receives a complete set of data.',
    serverLink: 'https://github.com/Ali-Jahankah/regions-status-server',
    slide: 4,
    liveLink: 'https://regions-status-client.onrender.com/',
    clientLink: 'https://github.com/Ali-Jahankah/regions-status-client',
    sourceLink: ''
  },
  {
    title: 'Data Extraction',
    description:
      'This project uses Node.js, Express, and MongoDB to process data from an .xlsx file. It reads data starting from row 3, validates it, and saves tracks to the database. Tracks with valid contract names link to the contract collection; those without are saved without a contract ID. Errors, such as duplicate tracks or invalid contract names, are logged with row numbers for easy troubleshooting.',
    serverLink: '',
    slide: 5,
    liveLink: '',
    clientLink: '',
    sourceLink: 'https://github.com/Ali-Jahankah/curve-ali-jahankah-test'
  },
  {
    title: 'Chat app | Web Socket',
    description:
      'This project is a real-time chat application built with Node.js, Express, and Socket.IO. It enables users to engage in instant messaging through WebSocket connections, providing low-latency, bidirectional communication between clients and the server.',
    serverLink: '',
    slide: 6,
    liveLink: 'https://chat-uaral.onrender.com/',
    clientLink: '',
    sourceLink: 'https://github.com/Ali-Jahankah/socket-io'
  },
  {
    title: 'Full-Stack ToDo App',
    description:
      'This project is a full-stack to-do application built with React for the frontend and Node.js (Express) for the backend. It utilizes TypeORM for object-relational mapping and MongoDB as the database. The application is developed using TypeScript for type safety, React Query for data fetching and state management, and Material UI for the user interface components. It demonstrates the integration of these technologies to create a functional to-do list application. *** Make sure to reload page a few times to see the content ***',
    serverLink: '',
    slide: 7,
    liveLink: 'https://uaral.netlify.app/',
    clientLink: '',
    sourceLink: 'https://github.com/Ali-Jahankah/fullstack-todo'
  },
  {
    title: 'Find Me Plus',
    description:
      'The ShareMe project is a platform hosted on Google Cloud Platform (GCP) that allows users to register and create profiles to share their social media links in one place. Built with Next.js, it features user authentication and profile creation for seamless link sharing. The project is still under development, with plans to enhance user experience and add more features.',
    serverLink: '',
    slide: 8,
    liveLink: 'https://findmeplus.vercel.app/',
    clientLink: '',
    sourceLink: 'https://github.com/Ali-Jahankah/share-me-next'
  },
  {
    title: 'bugsquashers',
    description:
      'The Bugsquashers Edu App is an educational platform aimed at enhancing learning experiences through interactive features. Built with React and Node.js, it supports user registration, course management, and progress tracking. This was my first team final project after graduating from a bootcamp, designed to provide a user-friendly interface for students and educators',
    serverLink: '',
    slide: 9,
    liveLink: '',
    clientLink: '',
    sourceLink: 'https://github.com/Ali-Jahankah/bugsquashers-edu-app'
  }
];
//--------------------------------
export const blogs = [
  {
    title: 'Nginx & Load Balancer ',
    description:
      'Nginx is a versatile tool that can serve as both a reverse proxy and a load balancer. This post will cover how Nginx can efficiently distribute requests to multiple Node.js servers while also serving a React frontend. You’ll see how Nginx manages traffic between multiple backend servers and a frontend application, allowing for seamless scaling and management of your apps.',
    link: 'https://medium.com/@ali-jahankah/how-nginx-works-as-a-load-balancer-and-reverse-proxy-locally-with-node-react-and-nx-432ea6e7c2e7'
  },
  {
    title: 'Personalizing Bash Terminal',
    description:
      'This blog will walk you through the process of customizing your Terminal, specifically the Bash Terminal. While there are various terminals like ZSH or PowerShell, I personally prefer Bash, and it’s quite popular among users.',
    link: 'https://medium.com/@ali-jahankah/personalizing-your-bash-terminal-a-quick-guide-300a140298be'
  },
  {
    title: 'Error fix in Next.js/Firebase',
    description:
      "If you’re working on a Next.js app, especially version 13, and you’re utilizing TypeScript and Firebase technologies like Firebase App Check and Firebase Recaptcha Enterprise for web, you might encounter a somewhat frustrating issue during the build process.The “Collecting Data” Error. This error can be a bit perplexing, but don’t worry, I've got a fix for you.",
    link: 'https://medium.com/@ali-jahankah/using-next-js-firebase-and-getting-collecting-data-error-while-building-your-app-743a83923c66'
  }
];
