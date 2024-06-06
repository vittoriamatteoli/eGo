export const defaultAvatars = [
  //An array of default avatar URLs from cloudinary
  "https://res.cloudinary.com/egocloud/image/upload/v1717352040/ego-tree-avatar01.png",
  "https://res.cloudinary.com/egocloud/image/upload/v1717352124/ego-tree-avatar02.png",
  "https://res.cloudinary.com/egocloud/image/upload/v1717352124/ego-tree-avatar03.png",
  "https://res.cloudinary.com/egocloud/image/upload/v1717352125/ego-tree-avatar04.png",
];

export const getRandomAvatarUrl = () => {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
};
