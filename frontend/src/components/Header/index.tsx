"use client"; // Ensure this component is a client component

import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Submenu from "./SubMenu";
import Image from "next/image";

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: "Shop", path: "/shop" },
  { label: "Recipes", path: "/recipes" },
  { label: "Learn", path: "/learn" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
];

const Header = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(menuItems[0].label); // Set initial active menu item

  const handleMenuClick = (label: string, path: string) => {
    setActiveMenu(label);
    router.push(path);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
    >
      <Box position="relative">
        <Container maxWidth="md" style={{ position: "relative" }}>
          <Image
            src="/images/monkey.png"
            alt="Logo"
            width={70}
            height={80}
            style={{
              marginRight: "20px",
              position: "absolute",
              left: -50,
              top: 10,
            }}
          />
          <Toolbar>
            <Box sx={{ display: "flex", gap: 5 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleMenuClick(item.label, item.path)}
                  sx={{
                    color: activeMenu === item.label ? "#da1a32" : "black",
                    position: "relative",
                    "&:hover": {
                      color: "#da1a32", // Color on hover
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: "50%",
                      bottom: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor:
                        activeMenu === item.label ? "#da1a32" : "transparent",
                      transform: "translateX(-50%)",
                      transition: "background-color 0.3s",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
        <Submenu />
      </Box>
    </AppBar>
  );
};

export default Header;
