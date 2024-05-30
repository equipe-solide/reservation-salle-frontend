import React, { useState } from "react";
import { AppShell, Button, Group } from "@mantine/core";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { VscGraph } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

function MantineSidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const links = [
    // {
    //   link: "/dashboard",
    //   label: "Tableau de bord",
    //   icon: <VscGraph size={20} />,
    // },
    {
      link: "reservation",
      label: "Reservation",
      icon: <IoCalendarOutline size={20} />,
    },
    { link: "salle_equipement", label: "Salle et Equipement", icon: <HiOutlineHomeModern size={20} /> },
    {
      link: "utilisateur",
      label: "Utilisateur",
      icon: <HiOutlineUsers size={20} />,
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <AppShell.Navbar p="md">
      <ul>
        {links.map(({ link, icon, label }, index) => (
          <Link to={link} key={index} onClick={() => handleLinkClick(link)}>
            <li
              key={index}
              className={`my-4 hover:bg-secondary hover:text-white p-2  ${
                activeLink === link
                  ? "bg-primary text-white drop-shadow-md"
                  : ""
              }`}
            >
              <Group gap={10}>
                {icon}
                <p className="font-semibold">{label}</p>
              </Group>
            </li>
          </Link>
        ))}
        <li className="mt-10">
          <Button
            variant="gradient"
            gradient={{ from: "red", to: "cyan", deg: 90 }}
            className="rounded-full md:hidden"
          >
            Se deconnecter
          </Button>
        </li>
      </ul>
    </AppShell.Navbar>
  );
}

export default MantineSidebar;
