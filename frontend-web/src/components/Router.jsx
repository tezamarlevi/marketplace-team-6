import React from 'react';
import { useApp } from '../contexts/AppContext';

export const Router = ({ children }) => {
  return <>{children}</>;
};

export const Route = ({ path, component: Component }) => {
  const { currentPath } = useApp();
  if (currentPath === path || (path.includes(':id') && currentPath.startsWith(path.split(':')[0]))) {
    return <Component />;
  }
  return null;
};

export const Link = ({ to, children, className = '' }) => {
  const { navigate } = useApp();
  return (
    <a 
      href={`#${to}`} 
      onClick={(e) => { e.preventDefault(); navigate(to); }}
      className={className}
    >
      {children}
    </a>
  );
};
