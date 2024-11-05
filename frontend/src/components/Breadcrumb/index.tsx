"use client"; // This line makes this component a Client Component

import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Import the ChevronRight icon
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13+

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    path: string;
  }>;
}

const BreadcrumbsComponent: React.FC<BreadcrumbsProps> = ({ items }) => {
  const router = useRouter();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightIcon sx={{ color: "#da1a32" }} />} // Set custom arrow color
      sx={{ margin: "20px 0" }}
    >
      {items.map((item, index) => (
        <Link
          key={item.label}
          color="inherit"
          onClick={() => router.push(item.path)}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            textTransform: "uppercase",
            fontSize: "0.875rem", // Smaller font size
          }}
        >
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
