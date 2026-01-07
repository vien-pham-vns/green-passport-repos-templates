export const formatOrchardNo = (val?: string) => {
  if (!val) return '';

  const parts = [];

  if (val.length < 2) return val;
  if (val.length >= 2) parts.push(val.slice(0, 2));
  if (val.length >= 6) parts.push(val.slice(2, 6));
  else if (val.length > 2) parts.push(val.slice(2));
  if (val.length >= 8) parts.push(val.slice(6, 8));
  else if (val.length > 6) parts.push(val.slice(6));
  if (val.length >= 11) parts.push(val.slice(8, 11));
  else if (val.length > 8) parts.push(val.slice(8));
  if (val.length > 11) parts.push(val.slice(11));

  return parts.join('-');
};
