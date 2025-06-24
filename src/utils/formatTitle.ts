export const formatTitle = (title: string, translate: any) => {
  const formattedTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2');
  const finalValue = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
  return translate(`missing_general.over_all.${finalValue}`);
};
