export const calculateAge = (birthDate: string): number => {
  const birthDay = new Date(birthDate);
  const today = new Date();

  const monthDifference = today.getMonth() - birthDay.getMonth();
  const dayDifference = today.getDate() - birthDay.getDate();

  let age = today.getFullYear() - birthDay.getFullYear();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    --age;
  }

  return age;
};
