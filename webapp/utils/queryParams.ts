export function parseQueryParamAsNumber(param: string): number | undefined {
  const route = useRoute();

  const paramValue = route.query[param];
  console.log("route.query", route.query);
  console.log("param", param);
  console.log("paramValue", paramValue);

  let returnValue = Array.isArray(paramValue) ? paramValue[0] : paramValue;
  console.log("returnValue", returnValue);

  return returnValue ? Number(returnValue) : undefined;
}
