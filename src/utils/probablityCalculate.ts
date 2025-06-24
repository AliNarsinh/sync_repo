import { greenRing, redRing, yellowRing } from '@app/assets/images';

export const convertProbablityIntoPercentage = (prob: number, item?: string) => {
  // const probability = (item === 'Skin Without Pathology' || "Кожа без патологии" ? 100 - prob * 100 : prob * 100).toFixed(2);
  return parseFloat((prob * 100).toFixed(2));
};

export const getRingImage = (prob: number, item: string) => {
  const percentage = convertProbablityIntoPercentage(prob, item);
  const isSkinWithPathology = item === 'Skin Without Pathology' || item === 'Кожа без патологии';

  if (isSkinWithPathology) {
    return greenRing;
  } else {
    if (percentage >= 80 && percentage <= 100) {
      return redRing;
    } else if (percentage >= 55 && percentage < 80) {
      return yellowRing;
    } else {
      return greenRing;
    }
  }
};
