import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import Page1 from "../views/page-1/Main";
import Page2 from "../views/page-2/Main";
import Login from "../views/login/Main";
import AddAccount from "../views/add-account/Main"
import AddCourse from "../views/add-course/Main"
import Statutes from "../views/statutes/Main"
import AddStatute from "../views/add-statute/Main"
import AddPastQuestion from "../views/add-past-question/Main"
import PastQuestions from "../views/past-questions/Main"
import Drafts from "../views/drafts/Main"

import AddDraft from "../views/add-draft/Main"
import DecidedCases from "../views/decided-cases/Main"
import AddDecidedCase from "../views/add-decidedCase/Main"
import AddQandA from "../views/add-QandA/Main";
import QandAs from "../views/qAndAs/Main";
import EditQandAs from "../views/edit-QandAs/Main";
import AddWeekContent from "../views/add-week-content/Main";
import BOW from "../views/bow/Main";
import AddBOW from "../views/add-bow/Main";
import EditCourse from "../views/edit-course/Main"
import EditDraft from "../views/edit-draft/Main"
import Profile from "../views/profile/Main"
import Institution from "../views/institutions/Main"
import AddInstitution from "../views/add-institution/Main"
import EditInstitution from "../views/edit-institution/Main"
import EditStatute from "../views/edit-statute/Main"
import EditPastQuestion from "../views/edit-past-questions/Main"
import AddAds from "../views/add-ads/Main"
import Ads from "../views/ads/Main"
import EditAd from "../views/edit-ad/Main"
import EditBOW from "../views/edit-bow/Main";
import Notifications from "../views/notifications/Main";
import { useSelector } from 'react-redux';
import { redirect } from "react-router-dom";

import Users from "../views/users/Main"
import AllMembers from "../views/all-members/Main"
import FirstTimers from "../views/first-timers/Main"
import SecondTimers from "../views/second-timers/Main"
import NewConverts from "../views/new-converts/Main"
import AddFirstTimer from "../views/add-first-timers/Main";
import AddSecondTimer from "../views/add-second-timers/Main";
import AddNewConverts from "../views/add-new-converts/Main";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <Page1 />,
        },
        {
          path: "courses",
          element: <Page2 />,
        },
        {
          path: "add-new-converts",
          element: <AddNewConverts />,
        },
        {
          path: "add-second-timers",
          element: <AddSecondTimer />,
        },
        {
          path: "add-first-timers",
          element: <AddFirstTimer />,
        },
        {
          path: "add-account",
          element: <AddAccount />,
        },
        {
          path: "all-members",
          element: <AllMembers />,
        },
        {
          path: "first-timers",
          element: <FirstTimers />,
        },
        {
          path: "second-timers",
          element: <SecondTimers />,
        },
        {
          path: "new-converts",
          element: <NewConverts />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "add-course",
          element: <AddCourse />,
        },

        {
          path: "edit-course/:id",
          element: <EditCourse />,
        },
        {
          path: "edit-draft/:id",
          element: <EditDraft />,
        },

        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
      ],
    },
    {
      path: "/simple-menu",
      element: <SimpleMenu />,
      children: [
        {
          path: "page-1",
          element: <Page1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
      ],
    },
    {
      path: "/top-menu",
      element: <TopMenu />,
      children: [
        {
          path: "page-1",
          element: <Page1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
        {
          path: "add-account",
          element: <AddAccount />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    // {
    //   path: "/error-page",
    //   element: <ErrorPage />,
    // },
    // {
    //   path: "*",
    //   element: <ErrorPage />,
    // },
  ];

  return useRoutes(routes);
}

export default Router;