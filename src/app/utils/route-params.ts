export function routeParams(
  route: string,
  params: Record<string, string | number>
) {
  Object.keys(params).forEach((key) => {
    route = route.replace(`:${key}`, `${params[key]}`);
  });
  return route;
}
