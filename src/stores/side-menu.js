import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Dashboard",
      },
      {
        icon: "Users",
        pathname: "/all-members",
        title: "All Members",
      },
      {
        icon: "User",
        pathname: "/first-timers",
        title: "First Timers",
      },
      {
        icon: "User",
        pathname: "/second-timers",
        title: "Second Timers",
      },
      {
        icon: "User",
        pathname: "/new-converts",
        title: "New Converts",
      },
      {
        icon: "Sidebar",
        pathname: "/users",
        title: "Users",
      },

    ],
  },
});

export { sideMenu };
