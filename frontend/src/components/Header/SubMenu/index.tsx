"use client"; // Ensure this component is a client component

import { Box, Button, Container } from "@mui/material";

interface SubmenuItem {
  label: string;
  path: string;
}

const submenuItems: SubmenuItem[] = [
  { label: "Categories", path: "/categories" },
  { label: "Collections", path: "/collections" },
  { label: "Resources", path: "/resources" },
];

const Submenu = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(248, 245, 240)",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            gap: 3,
            backgroundColor: "rgb(248, 245, 240)",
            padding: "10px 20px",
            borderRadius: "4px",
          }}
        >
          {submenuItems.map((item) => (
            <Button
              key={item.label}
              sx={{
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(218, 26, 50, 0.1)", // Light hover effect
                },
              }}
              onClick={() => console.log(`${item.label} clicked`)} // Replace with your routing logic
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Submenu;
