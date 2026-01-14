import { InterestBucket } from 'src/common/enum/interest-bucket.enum';

export const initInterestScore = (): Record<InterestBucket, number> =>
  Object.values(InterestBucket).reduce(
    (acc, key) => {
      acc[key] = 0;
      return acc;
    },
    {} as Record<InterestBucket, number>,
  );
