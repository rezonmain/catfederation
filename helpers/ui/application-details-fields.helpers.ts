const getRedirectUriPlaceholder = (applicationName: string) => {
  return `https://${applicationName
    .replaceAll(" ", "")
    .toLocaleLowerCase()}.com/callback`;
};

export { getRedirectUriPlaceholder };
