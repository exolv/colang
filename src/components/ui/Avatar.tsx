import React from 'react';

export type AvatarPropsSize = 'lg' | 'base' | 'sm';
const AvatarPropsSizeMap = {
  lg: 'w-14 h-14',
  base: 'w-11 h-11',
  sm: 'w-8 h-8'
};

export interface IconProps {
  className?: string;

  profiles: string[];
  size?: AvatarPropsSize;
  shadow?: boolean;
};

const Avatar: React.FC<IconProps> = ({
  className = '',

  profiles,
  size = 'base',
  shadow = false
}) => {
  return (
    <div className={`flex items-center ${profiles.length > 1 ? (size === 'sm' ? '-space-x-3' : '-space-x-4') : ''} ${className}`}>
      {
        profiles.map((profile, index) => (
          <div key={index} className={`rounded-full flex justify-center items-center bg-white ${AvatarPropsSizeMap[size]} p-[3px] ${shadow ? 'shadow-md' : ''}`}>
            <img src={profile} className='rounded-full max-w-full' />
          </div>
        ))
      }
    </div>
  );
};

export default Avatar;