const rawToProfile = (json) => {
  console.log(JSON.stringify(json));
  const resourceName = json.resourceName;

  let name = '';
  let avatar = '';
  let email = '';
  let organization = '';
  let title = '';
  let location = '';

  try {
    name = json.names.find((n)=>{
      return n.metadata.primary;
    }).displayName;
  } catch(e){
    name = '';
  }

  try {
    avatar = json.photos.find((p)=>{
      return p.metadata.primary;
    }).url;
  } catch(e){
    avatar = '';
  }

  try {
    email = json.emailAddresses.find((e)=>{
      return e.metadata.primary;
    }).value;
  } catch(e){
    email = '';
  }

  try {
    organization = json.organizations.find((o)=>{
      return o.metadata.primary;
    });
    title = organization.title;
    location = organization.location;
  } catch(e){
    title = '';
    location = '';
  }

  return {
    provider: 'google',
    resourceName: resourceName,
    name: name,
    avatar: avatar,
    email: email,
    title: title,
    location: location

  }
};

module.exports = rawToProfile;
