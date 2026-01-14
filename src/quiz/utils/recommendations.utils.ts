export const getUniqueLimited = (items: string[], limit: number): string[] => {
  return Array.from(new Set(items)).slice(0, limit);
};
