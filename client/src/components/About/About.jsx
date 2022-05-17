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
import { Link } from 'react-router-dom';

const developers = [{
  name: 'Agustin Cabrera',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/agust%C3%ADn-cabrera/',
  gitHub: 'https://github.com/agskbr',
  profilePicture: agustin,
},

{
  name: 'Juan Hurtado',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/juansehurtado/',
  gitHub: 'https://github.com/JuanseHurtadoF',
  profilePicture: juanse,
},


{
  name: 'Yanina Garcia',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/yaninagarcia-fullstackdeveloper/',
  gitHub: 'https://github.com/YaniAnaGarcia',
  profilePicture: yani,
},

{
  name: 'Juan Santiago',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/juansantiago-fullstack/',
  gitHub: 'https://github.com/M1k43lS',
  profilePicture: santi,
},

{
 name: 'Matias Gonzalez',
 role: 'Full Stack Developer',
 linkedIn: 'https://www.linkedin.com/in/daniel-matias-gonzalez-elia/',
 gitHub: 'https://github.com/matiasgonz1653',
 profilePicture: mati,
},

{
  name: 'Juan Santillan',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/santillan-juan-98b91121b/',
  gitHub: 'https://github.com/juani029',
  profilePicture: juani,
},
{
  name: 'Eugenia Nannini',
  role: 'Full Stack Developer',
  linkedIn: 'https://www.linkedin.com/in/eugenia-nannini/',
  gitHub: 'https://github.com/EugeniaNannini',
  profilePicture: euge,
},

{
 name: 'Gustavo De Angelis',
 role: 'Full Stack Developer',
 linkedIn: 'https://www.linkedin.com/in/gadeangelis/',
 gitHub: 'https://github.com/gadeangelis',
 profilePicture: gusta,
  },


];
console.log(developers);

function About() {
  return (
    <div className={about.principalContainer}>
    <Link to= '/'><button className={about.button}>Volver</button></Link>
      <h1 className={about.Title}>¡Aprende más sobre los creadores de PowerGym!</h1>
      <div className={about.centerViewContainer}>
      <div className={about.Cards}>
        {
          developers.map((d, i) => (
            <div className={about.Developers} key={i}>
              <img className= {about.ProfilePicture} src={d.profilePicture}/>
              <div className= {about.Names}>
                <p className= {about.FirstName}>
                  {d.name}
                </p>
              </div>
              <p className= {about.Role}>
                {d.role}
              </p>
              <a href={d.linkedIn} target="_blank">
              <AiFillLinkedin className= {about.LinkedIn}/>
              </a>
              <a href={d.gitHub} target="_blank">
              <AiFillGithub className={about.GitHub}/>
              </a>
            </div>
          ))
        }
      </div>
      </div>
    </div>
  );
}

export default About;