import React from 'react';

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const IconGithub: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-github ${className}`}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
};

export const IconLinkedIn: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-linkedin ${className}`}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
};

export const IconReact: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-react ${className}`}
    >
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 21.21c-3.3 0-6-7.15-6-9.21s2.7-9.21 6-9.21 6 7.15 6 9.21-2.7 9.21-6 9.21z" />
      <path d="M12 21.21c3.3 0 6-7.15 6-9.21s-2.7-9.21-6-9.21-6 7.15-6 9.21 2.7 9.21 6 9.21z" transform="rotate(60 12 12)" />
      <path d="M12 21.21c3.3 0 6-7.15 6-9.21s-2.7-9.21-6-9.21-6 7.15-6 9.21 2.7 9.21 6 9.21z" transform="rotate(-60 12 12)" />
    </svg>
  );
};

export const IconAngular: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className={`icon-angular ${className}`}
    >
      <path d="M9.93 12.645h4.134L11.996 7.74" strokeWidth="0" fill="currentColor" />
      <path d="M11.996.009L.686 3.988l1.725 14.76 9.585 5.243 9.588-5.238L23.308 3.99 11.996.01zm7.058 18.297h-2.636l-1.42-3.501H8.995l-1.42 3.501H4.937l7.06-15.648 7.057 15.648z" strokeWidth="0" fill="currentColor" />
    </svg>
  );
};

export const IconCSharp: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon-csharp ${className}`}
    >
      <path d="M11.5 15.97l.41 2.44c-.26.14-.68.27-.94.27-1.6 0-1.35-1.07-1.7-2.55l-.45-2.92c-.27-1.48-.42-2.33-1.95-2.33h-1.22v4.96c0 .57-.23.82-.8.82H3.12c-.56 0-.8-.27-.8-.82V4.1c0-.55.24-.8.8-.8h3.87c2.95 0 4.35 1.34 4.35 3.67 0 1.8-.92 2.99-2.1 3.48 1.31.39 1.67 1.17 1.94 2.58l.32 1.94zM5.8 8.73h1.34c1.15 0 1.74-.53 1.74-1.48 0-.76-.45-1.36-1.73-1.36H5.8v2.84zM13.95 10.5h4.35c.58 0 .81.27.8.82v.83c0 .57-.23.83-.8.83h-4.35c-.17 1.33 1.05 2.17 2.81 1.73V16a6.9 6.9 0 01-1.45.17c-2.91 0-4.51-1.88-4.51-4.68 0-2.25 1.19-4.54 3.95-4.54 2.75 0 4.28 2.35 4.43 4.58v.25c0 .55-.23.82-.8.82h-4.43v-2.1zm0-1.15c.16-1.61 3.06-1.62 3.2 0h-3.2zm7.46 1.19c.57 0 .69.3.72.89.06 1.22.65 1.86 1.53 1.86.96 0 1.46-.58 1.46-1.55 0-.89-.79-1.43-1.72-1.84-1.33-.58-3.3-1.54-3.3-3.67 0-2.24 1.91-3.74 4.11-3.74.85 0 1.55.12 2.12.33.53.2.66.6.66 1.12v.96c0 .64-.31.87-.87.62-.57-.27-1.22-.4-1.98-.4-.93 0-1.66.47-1.66 1.19 0 .8.27 1.04 2.15 1.87 1.82.8 2.84 1.78 2.84 3.63 0 2.33-2.05 4.1-4.33 4.1-1.12 0-2.35-.27-3.09-.69-.36-.21-.52-.53-.52-1.06v-.91c0-.7.21-.9.78-.58.8.44 1.74.65 2.64.65 1.11 0 1.63-.35 1.63-1.11 0-.7-.39-1.03-2.17-1.68z" />
    </svg>
  );
};

export const IconDjango: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon-django ${className}`}
    >
      <path d="M7.533 12.249c-.011 1.985 1.445 3.168 3.768 2.63V9.618c-2.352-.716-3.758.733-3.768 2.631zm3.839-10.038h3.346v15.64c-3.010.267-5.206-.152-6.823-1.583-2.046-1.803-2.073-7.24 2.863-9.384-1.446-1.501-6.5-1.025-6.5-1.025V2.428s4.12-.834 7.114-.217zm5.54 5.569h-3.418V0h3.418v7.78z"/>
    </svg>
  );
};

export const IconNodejs: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon-nodejs ${className}`}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/>
    </svg>
  );
};

export const IconExpress: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon-express ${className}`}
    >
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>
    </svg>
  );
};

export const IconMongoDB: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon-mongodb ${className}`}
    >
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  );
};

export const IconJavascript: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={`icon-javascript ${className}`}
    >
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  );
};

export const IconExternal: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-external ${className}`}
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
};

// Helper function to match tech names to icons
export const getTechIcon = (techName: string, size: number = 16): React.ReactNode => {
  const normalizedName = techName.toLowerCase().trim();
  
  if (normalizedName.includes('react')) return <IconReact size={size} />;
  if (normalizedName.includes('angular')) return <IconAngular size={size} />;
  if (normalizedName.includes('c#') || normalizedName === '.net') return <IconCSharp size={size} />;
  if (normalizedName.includes('django')) return <IconDjango size={size} />;
  if (normalizedName.includes('node')) return <IconNodejs size={size} />;
  if (normalizedName.includes('express')) return <IconExpress size={size} />;
  if (normalizedName.includes('mongo')) return <IconMongoDB size={size} />;
  if (normalizedName.includes('javascript') || normalizedName.includes('js')) return <IconJavascript size={size} />;
  
  return null; // Return null for unknown tech
};