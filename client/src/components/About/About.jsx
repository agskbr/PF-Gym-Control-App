import React from 'react';
import agustin from './agustin.jpg';
import juanse from './juanse.jpg';
import mati from './mati.jpg';
import yani from './yanina.jpg';
import santi from './santi.jpg';
import euge from './euge.jpg';
import juani from './juani.jpg';
import gusta from './gusta.jpg';
import about from './About.module.css'
import {AiFillGithub} from 'react-icons/ai';
import {AiFillLinkedin} from 'react-icons/ai';

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
    <div className={about.Box}>
      <h1 className={about.Title}>Learn more about the creators of DiceStarter!</h1>
      <div className={about.Cards}>
        {
          developers.map((d, i) => (
            <div className={about.Developers} key={i}>
              <img className= {about.ProfilePicture} src={d.profilePicture}/>
              <div className= {about.Names}>
                <p className= {about.FirstName}>
                  {d.name}
                </p>
                <p className= {about.LastName}>
                  {d.lastName}
                </p>
              </div>
              <p className= {about.Role}>
                {d.role}
              </p>
              <a href={d.linkedIn} target="_blank">
              <AiFillLinkedin className= {about.LinkedIn}/>
              </a>
              <a href={d.gitHub}>
              <AiFillGithub className={about.GitHub}/>
              </a>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default About;