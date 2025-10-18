/**
 * Icon System - Modern react-icons Integration
 * Using Simple Icons for brands and Lucide for UI icons
 */

import React from 'react';

// Brand/Tech Icons from Simple Icons
import {
  SiReact,
  SiAngular,
  SiDotnet,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGithub,
  SiLinkedin,
  SiGmail,
  SiNginx,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
} from 'react-icons/si';

// UI Icons from Lucide React
import { ExternalLink, Mail, MapPin, ArrowUp, Send } from 'lucide-react';

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

// Technology Icons
export const IconReact: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => <SiReact size={size} color={color || '#61DAFB'} className={className} />;

export const IconAngular: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiAngular size={size} color={color || '#DD0031'} className={className} />
);

export const IconCSharp: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => <SiDotnet size={size} color={color || '#512BD4'} className={className} />;

export const IconDjango: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => <SiDjango size={size} color={color || '#092E20'} className={className} />;

export const IconNodejs: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiNodedotjs size={size} color={color || '#339933'} className={className} />
);

export const IconExpress: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiExpress
    size={size}
    color={color || 'currentColor'}
    className={className}
  />
);

export const IconMongoDB: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiMongodb size={size} color={color || '#47A248'} className={className} />
);

export const IconJavascript: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiJavascript size={size} color={color || '#F7DF1E'} className={className} />
);

export const IconTypescript: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiTypescript size={size} color={color || '#3178C6'} className={className} />
);

export const IconPython: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => <SiPython size={size} color={color || '#3776AB'} className={className} />;

export const IconNextjs: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiNextdotjs
    size={size}
    color={color || 'currentColor'}
    className={className}
  />
);

export const IconVue: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiVuedotjs size={size} color={color || '#4FC08D'} className={className} />
);

export const IconTailwind: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiTailwindcss size={size} color={color || '#06B6D4'} className={className} />
);

export const IconNginx: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => <SiNginx size={size} color={color || '#009639'} className={className} />;

// Social/Brand Icons
export const IconGithub: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiGithub size={size} color={color || 'currentColor'} className={className} />
);

export const IconLinkedIn: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <SiLinkedin size={size} color={color || '#0A66C2'} className={className} />
);

export const IconEmail: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => <SiGmail size={size} color={color || '#EA4335'} className={className} />;

// UI Icons
export const IconExternal: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <ExternalLink
    size={size}
    color={color || 'currentColor'}
    className={className}
  />
);

export const IconMail: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <Mail size={size} color={color || 'currentColor'} className={className} />
);

export const IconLocation: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <MapPin size={size} color={color || 'currentColor'} className={className} />
);

export const IconArrowUp: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <ArrowUp size={size} color={color || 'currentColor'} className={className} />
);

export const IconSend: React.FC<IconProps> = ({
  size = 24,
  color,
  className,
}) => (
  <Send size={size} color={color || 'currentColor'} className={className} />
);

// Helper Functions
export const getTechIcon = (
  techName: string,
  size: number = 16
): React.ReactNode => {
  const normalizedName = techName.toLowerCase().trim();

  if (normalizedName.includes('react')) return <IconReact size={size} />;
  if (normalizedName.includes('angular')) return <IconAngular size={size} />;
  if (normalizedName.includes('vue')) return <IconVue size={size} />;
  if (normalizedName.includes('next')) return <IconNextjs size={size} />;
  if (
    normalizedName.includes('c#') ||
    normalizedName.includes('csharp') ||
    normalizedName === '.net'
  ) {
    return <IconCSharp size={size} />;
  }
  if (normalizedName.includes('django')) return <IconDjango size={size} />;
  if (normalizedName.includes('node')) return <IconNodejs size={size} />;
  if (normalizedName.includes('express')) return <IconExpress size={size} />;
  if (normalizedName.includes('python')) return <IconPython size={size} />;
  if (normalizedName.includes('javascript') || normalizedName === 'js')
    return <IconJavascript size={size} />;
  if (normalizedName.includes('typescript') || normalizedName === 'ts')
    return <IconTypescript size={size} />;
  if (normalizedName.includes('mongo')) return <IconMongoDB size={size} />;
  if (normalizedName.includes('nginx')) return <IconNginx size={size} />;
  if (normalizedName.includes('tailwind')) return <IconTailwind size={size} />;

  return null;
};

export const getSocialIcon = (
  platform: string,
  size: number = 24
): React.ReactNode => {
  const normalizedPlatform = platform.toLowerCase().trim();

  if (normalizedPlatform.includes('github')) return <IconGithub size={size} />;
  if (normalizedPlatform.includes('linkedin'))
    return <IconLinkedIn size={size} />;
  if (
    normalizedPlatform.includes('email') ||
    normalizedPlatform.includes('mail')
  )
    return <IconEmail size={size} />;

  return null;
};
