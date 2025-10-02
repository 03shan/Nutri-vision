import React from 'react';

type IconProps = {
  className?: string;
};

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export const DumbbellIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L9 7.94l3.53-3.53a.75.75 0 111.06 1.06L10.06 9l2.47 2.47a.75.75 0 11-1.06 1.06L9 10.06l-2.47 2.47a.75.75 0 01-1.06-1.06L7.94 9 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
      <path d="M4.5 9.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z" />
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25.75.75 0 001.5 0A3.75 3.75 0 0112 3a3.75 3.75 0 013.75 3.75.75.75 0 001.5 0A5.25 5.25 0 0012 1.5zM12 15a5.25 5.25 0 005.25-5.25.75.75 0 00-1.5 0A3.75 3.75 0 0112 13.5a3.75 3.75 0 01-3.75-3.75.75.75 0 00-1.5 0A5.25 5.25 0 0012 15z" clipRule="evenodd" />
    </svg>
);

export const PlateIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V9h2v4zm0-6H9V5h2v2zm4 6h-2V9h2v4z" />
    </svg>
);

export const FoodCheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const HealthTrackerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

export const ChefHatIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.75 1.75a.75.75 0 0 0-1.5 0V6h-2.25a.75.75 0 0 0 0 1.5h2.25v1.51a4.502 4.502 0 0 0-2.36 3.091.75.75 0 0 0 1.442.408A3 3 0 0 1 12 10.5a3 3 0 0 1 2.168 5.009.75.75 0 1 0 1.06 1.061A4.5 4.5 0 0 0 18 12.01V7.5h2.25a.75.75 0 0 0 0-1.5H18V1.75a.75.75 0 0 0-.75-.75h-4.5z" />
      <path fillRule="evenodd" d="M3 14.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75zm0 3.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z" clipRule="evenodd" />
    </svg>
);