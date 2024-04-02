/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import logo from "./../images/logo2.png";
import logo2 from "./../images/logo.png";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Button,
  Typography,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,

} from "@heroicons/react/24/outline";
import { useTheme } from '../theme/ThemeProvider';
import { ApiFunctions } from "../functions/Api";
import { submitLogout } from "../Auth/LogOut";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { Class, EventAvailable, Room, School, WorkHistory } from "@mui/icons-material";
import { useUserContext } from "../context/UserContext";
import { isAdmin } from "../roles/isAdmin";

export default function NavbarCustom() {

  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const { isDarkMode, toggleDarkMode } = useTheme();
  const UserContext = useUserContext()
  // console.log(UserContext.user.roles)

  const links = [
    { to: '/users', text: 'Users', icon: UsersIcon },
    { to: '/campuses', text: 'Campuses', icon: School },
    { to: '/class-names', text: 'Classes', icon: Class },
    { to: '/promotions', text: 'Promotions', icon: EventAvailable },
    { to: '/levels', text: 'Levels', icon: WorkHistory },
    { to: '/absences', text: 'absences', icon: WorkHistory },
  ];



  return (

    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} openDrawer={openDrawer} logo={logo} logo2={logo2} />
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className={`bg-white border-gray-50 ${isDarkMode ? 'dark bg-gray-900' : ''}`}>
        <Card

          shadow={false}

          className={` border-gray-50 h-[calc(100vh-2rem)] w-full p-4  bg-gray-50 text-blue-900   ${isDarkMode ? 'dark bg-gray-900 text-blue-50' : ''}`}
        >
          <div className="mb-2 flex items-center gap-4 p-4 ">
            <img
              src={isDarkMode ? logo : logo2}
              alt="brand"
              className="w-32 mx-auto"
            />

          </div>

          <List>
            {/* <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 " />
                  </ListItemPrefix>
                  <Typography className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 ">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5 " />
                    </ListItemPrefix>
                    <Link to={'/users'}>Users</Link>
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5  " />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to={'/users'}>
              <ListItem className="">
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Users
                <ListItemSuffix>
                  <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link> */}
            {/* {isAdmin() && */}
              {links.map((link, index) => (
                <NavLink
                  to={link.to}
                  key={index}
                  activeClassName="bg-red-500"
                >
                  <ListItem className='mt-2' >
                    <ListItemPrefix>
                      <link.icon className="h-5 w-5" />
                    </ListItemPrefix>
                    {link.text}
                  </ListItem>
                </NavLink>
              ))
              }
          </List>



        </Card>
      </Drawer>

    </>

  )
}
