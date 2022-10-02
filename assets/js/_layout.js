const ILS_LAYOUT = {
  NAV_ROUTE: () => $(".sidenav__nav .route"),
};

$(document).on("DOMContentLoaded", () => {
  toggleRoute();

  function toggleRoute() {
    const { NAV_ROUTE } = ILS_LAYOUT;

    Array.from(NAV_ROUTE()).forEach((route) => {
      const path = $route_getParam(2);
      if ($(route).attr("data-href") === path) {
        $(route).addClass("active");
      }
    });
  }
});
