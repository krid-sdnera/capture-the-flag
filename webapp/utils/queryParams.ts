export function parseQueryParamAsNumber(param: string): number | undefined {
  const route = useRoute();

  const paramValue = route.query[param];

  let returnValue = Array.isArray(paramValue) ? paramValue[0] : paramValue;

  return returnValue ? Number(returnValue) : undefined;
}
