import link from './objects/link';
import blockContent from './objects/blockContent';

import home from './documents/home';
import project from './documents/project';  
import page from './documents/page';
import projects from './documents/projects';
import settings from './documents/settings';

import homeHero from './sections/heroHome';
import studio from './sections/studio';
import services from './sections/services';
import approach from './sections/approach';
import aboutUs from './sections/aboutUs';
import cta from './sections/cta';
import legal from './sections/legal';
import featuredProjects from './sections/featuredProjects';

const objects = [
  link,
  blockContent,
]
const documents = [
  home,
  settings,
  page,
  project,
  projects
]

const sections = [
  homeHero,
  studio,
  services,
  approach,
  aboutUs,
  cta,
  legal,
  featuredProjects
]

export const schema = [
  ...objects,
  ...documents,
  ...sections
]

