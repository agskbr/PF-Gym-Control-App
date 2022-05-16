import React from 'react';
import agustin from '.agustin.jpg';
import juanse from '.juanse.jpg';
import mati from '.mati.jpg';
import yani from '.yani.jpg';
import santi from '.santi.jpg';
import euge from '.euge.jpg';
import juani from '.juani.jpg';
import gusta from '.gusta.jpg';
import './About.css';

const developers = [{
  name: 'Agustin',
  lastName: 'Cabrera',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/agust%C3%ADn-cabrera/',
  gitHub: 'https://github.com/agskbr',
  profilePicture: agustin,
},

{
  name: 'Juan',
  lastName: 'Hurtado',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/juansehurtado/',
  gitHub: 'https://github.com/JuanseHurtadoF',
  profilePicture: juanse,
},

 {
  name: 'Matias',
  lastName: 'Gonzalez',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/daniel-matias-gonzalez-elia/',
  gitHub: 'https://github.com/matiasgonz1653',
  profilePicture: mati,
},

{
  name: 'Yanina',
  lastName: 'Garcia',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/yaninagarcia-fullstackdeveloper/',
  gitHub: 'https://github.com/YaniAnaGarcia',
  profilePicture: yani,
},

{
  name: 'Juan (Santi)',
  lastName: 'Santiago',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/juansantiago-fullstack/',
  gitHub: 'https://github.com/M1k43lS',
  profilePicture: santi,
},

{
  name: 'Eugenia',
  lastName: 'Nannini',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/eugenia-nannini/',
  gitHub: 'https://github.com/EugeniaNannini',
  profilePicture: euge,
},

{
  name: 'Juan Ignacio',
  lastName: 'Santillan',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/santillan-juan-98b91121b/',
  gitHub: 'https://github.com/juani029',
  profilePicture: juani,
  },

{
 name: 'Gustavo',
 lastName: 'De Angelis',
 role: 'Full Stack Developer',
 linkedIn: 'https://www.linkedin.com/in/gadeangelis/',
 gitHub: 'https://github.com/gadeangelis',
 profilePicture: gusta,
  },


];
console.log(developers);

function About() {
  return (
    <div className='aboutBox'>
      <h1 className='aboutTitle'>Learn more about the creators of DiceStarter!</h1>
      <div className='aboutCards'>
        {
          developers.map((d, i) => (
            <div className='aboutDevelopers' key={i}>
              <img className='aboutProfilePicture' src={d.profilePicture}/>
              <div className='aboutNames'>
                <p className='aboutFirstName'>
                  {d.name}
                </p>
                <p className='aboutLastName'>
                  {d.lastName}
                </p>
              </div>
              <p className='aboutRole'>
                {d.role}
              </p>
              <a className='aboutLinkedIn' href={d.linkedIn}>
                <img className='aboutLinkedInLogo' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDM4MiAzODIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4MiAzODI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiMwMDc3Qjc7IiBkPSJNMzQ3LjQ0NSwwSDM0LjU1NUMxNS40NzEsMCwwLDE1LjQ3MSwwLDM0LjU1NXYzMTIuODg5QzAsMzY2LjUyOSwxNS40NzEsMzgyLDM0LjU1NSwzODJoMzEyLjg4OQ0KCUMzNjYuNTI5LDM4MiwzODIsMzY2LjUyOSwzODIsMzQ3LjQ0NFYzNC41NTVDMzgyLDE1LjQ3MSwzNjYuNTI5LDAsMzQ3LjQ0NSwweiBNMTE4LjIwNywzMjkuODQ0YzAsNS41NTQtNC41MDIsMTAuMDU2LTEwLjA1NiwxMC4wNTYNCglINjUuMzQ1Yy01LjU1NCwwLTEwLjA1Ni00LjUwMi0xMC4wNTYtMTAuMDU2VjE1MC40MDNjMC01LjU1NCw0LjUwMi0xMC4wNTYsMTAuMDU2LTEwLjA1Nmg0Mi44MDYNCgljNS41NTQsMCwxMC4wNTYsNC41MDIsMTAuMDU2LDEwLjA1NlYzMjkuODQ0eiBNODYuNzQ4LDEyMy40MzJjLTIyLjQ1OSwwLTQwLjY2Ni0xOC4yMDctNDAuNjY2LTQwLjY2NlM2NC4yODksNDIuMSw4Ni43NDgsNDIuMQ0KCXM0MC42NjYsMTguMjA3LDQwLjY2Niw0MC42NjZTMTA5LjIwOCwxMjMuNDMyLDg2Ljc0OCwxMjMuNDMyeiBNMzQxLjkxLDMzMC42NTRjMCw1LjEwNi00LjE0LDkuMjQ2LTkuMjQ2LDkuMjQ2SDI4Ni43Mw0KCWMtNS4xMDYsMC05LjI0Ni00LjE0LTkuMjQ2LTkuMjQ2di04NC4xNjhjMC0xMi41NTYsMy42ODMtNTUuMDIxLTMyLjgxMy01NS4wMjFjLTI4LjMwOSwwLTM0LjA1MSwyOS4wNjYtMzUuMjA0LDQyLjExdjk3LjA3OQ0KCWMwLDUuMTA2LTQuMTM5LDkuMjQ2LTkuMjQ2LDkuMjQ2aC00NC40MjZjLTUuMTA2LDAtOS4yNDYtNC4xNC05LjI0Ni05LjI0NlYxNDkuNTkzYzAtNS4xMDYsNC4xNC05LjI0Niw5LjI0Ni05LjI0Nmg0NC40MjYNCgljNS4xMDYsMCw5LjI0Niw0LjE0LDkuMjQ2LDkuMjQ2djE1LjY1NWMxMC40OTctMTUuNzUzLDI2LjA5Ny0yNy45MTIsNTkuMzEyLTI3LjkxMmM3My41NTIsMCw3My4xMzEsNjguNzE2LDczLjEzMSwxMDYuNDcyDQoJTDM0MS45MSwzMzAuNjU0TDM0MS45MSwzMzAuNjU0eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />
              </a>
              <a className='aboutGitHub' href={d.gitHub}>
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" fill='white' viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default About;