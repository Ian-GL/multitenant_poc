export const isFilledStr = (element: any) => {
  if (typeof element !== "string") {
    return false;
  }
  return element.length > 0;
};
