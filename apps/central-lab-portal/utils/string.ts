export const removeHtmlTags = (input: string): string => {
  return input.replace(/<[^>]+>/g, "").trim();
};

export const removeScripts = (input: string): string => {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\bon\w+="[^"]*"/gi, "");
};

export const removeHttpUrls = (input: string): string => {
  return input.replace(/\bhttps?:\/\/\S+/gi, "");
};

export const sanitizeString = (input: string): string => {
  return removeHttpUrls(removeScripts(removeHtmlTags(input)));
};
