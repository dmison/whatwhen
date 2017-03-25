const sessions = [
  {
    _id: 'session-123',
    title: 'Installing OpenShift',
    location: 'Brno',
    start:'201607101345',
    presenter: {
      name: 'Marek Jelen',
      email: 'mjelen@redhat.com'
    },
    summary: 'This talk covers the different ways of installing OpenShift. Both OpenShift Origin and OpenShift Enterprise are covered. After the talk, you should be able to know how to setup your own OpenShift - either on a single machine or in a cluster. There is also a preview of OpenShift Online Next Generation for those who do not want to deploy their own. People asked a lot of questions during the talk. The answers were very interesting, especially when inquiries like "WHAT IS OPENSHIFT?" were on the table.'
  },
  {
    _id: 'session-456',
    title: 'Creating Containers for Use in Microservice Architectures and as a Base for Others',
    location: 'Brno',
    start:'201607101345',
    presenter: {
      name: 'Honza Horak',
      email: 'hhorak@redhat.com'
    },
    summary: 'At Red Hat, we developed database containers that not only had the typical constraints of databases in a container architecture, but also needed to be transparently used standalone, under orchestration (like  Kubernetes), and with a PaaS (like OpenShift). In this talk, we will share our experience with developing these containers. Specifically, we will be discussing the database container shipping with Red Hat Software Collections (and, by extension, OpenShift): PostgreSQL  MariaDB, MySQL and MongoDB. Software Collections were used to ease the implementation as the collections can easily support being used in both a container and non-containerized environment.  \n\nIn order to support an organization\'s consistent and safe use of containers, we also started to provide a set of uniform "builder images" for developers to base their applications on top of. For this talk, we will be also sharing our experience with developing these containers and the pitfalls we found.'
  },
  {
    _id: 'session-789',
    title: 'My So-Contained Life',
    location: 'Brisbane',
    start:'201607101345',
    presenter: {
      name: 'Trevor Jay',
      email: 'tjay@redhat.com'
    },
    summary: 'Trevor Jay of Product Security will discuss the pros and cons and lessons learned from an extreme act of dog-fooding: running his personal computering tasks only within Docker containers for more than a year. What happens when you stop at `dnf -y install docker`?'
  }
];

module.exports = {
  sessions: sessions
};
