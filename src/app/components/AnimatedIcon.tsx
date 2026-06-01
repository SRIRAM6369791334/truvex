import React from 'react';
import Lottie from 'lottie-react';

// Import all Lottie JSON files
import bellData from './lottie/bell.json';
import boxData from './lottie/box.json';
import chatData from './lottie/chat.json';
import clockData from './lottie/clock.json';
import documentData from './lottie/document.json';
import handshakeData from './lottie/handshake.json';
import privacyData from './lottie/Privacy.json';
import rupeeData from './lottie/rupee.json';
import shieldData from './lottie/Shield.json';
import successData from './lottie/success.json';
import targetData from './lottie/Target.json';
import trendingData from './lottie/trending.json';
import usersData from './lottie/users.json';

// Map icon names to their respective animation data
const animationMap: Record<string, any> = {
  bell: bellData,
  box: boxData,
  chat: chatData,
  clock: clockData,
  document: documentData,
  handshake: handshakeData,
  privacy: privacyData,
  rupee: rupeeData,
  shield: shieldData,
  success: successData,
  target: targetData,
  trending: trendingData,
  users: usersData,
};

type AnimatedIconProps = {
  icon: keyof typeof animationMap;
  className?: string;
  size?: number | string;
  loop?: boolean;
  autoplay?: boolean;
};

export default function AnimatedIcon({
  icon,
  className = '',
  size = 40,
  loop = true,
  autoplay = true,
}: AnimatedIconProps) {
  const animationData = animationMap[icon];

  if (!animationData) {
    console.warn(`AnimatedIcon: Icon "${icon}" not found.`);
    return null;
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
