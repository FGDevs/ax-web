function $route_getParam(index) {
  const route = window.location.href.split(/[/]+/g);
  return route[index].split(".")[0];
}
