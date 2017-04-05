import React from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

const AdminBreadCrumps = (props) => {
  const path = props.location.pathname.split('/');

  var crumbs = []
  crumbs[path.length-1] = '';
  crumbs.fill('hey');
  crumbs = crumbs.map((c, index)=>{
    return { label: path[index], url: path.slice(0, index+1).join('/')};
  });
  if(crumbs.length > 3 && crumbs[3].label === 'update'){
    crumbs[3].url = crumbs[4].url;
  }
  crumbs = crumbs.slice(0,4);

  return (
    <Breadcrumb>
      {crumbs.map((element,index)=>{
        return <Breadcrumb.Item key={index} href={`#${element.url}`}>{element.label}</Breadcrumb.Item>
      })}
    </Breadcrumb>
  );
};

export default AdminBreadCrumps;
