import React, { FC } from "react";
import { Container, Grid, Typography } from "@mui/material";
import BreadcrumbsComponent from "../Breadcrumb";

const breadcrumbItems = [
  { label: "Recipes", path: "/recipes" },
  { label: "Bread", path: "/bread" },
  { label: "Quick Bread", path: "/quick-bread" },
];

interface IProps {
  title: string
  body: string
  image?: string
}

const HeroBanner = ({ title, body, image }: IProps)  => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Left Content */}
        <Grid item xs={12} md={6}>
          <BreadcrumbsComponent items={breadcrumbItems} />

          <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: 200}}>
            {title}
          </Typography>

          <Typography variant="body1" paragraph>
            {body}
          </Typography>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={6}>
          <img
            src={image ? image : "https://whyzee.com.sg/wp-content/uploads/2020/07/banana-loaf.jpg"}
            alt="Descriptive Alt Text"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HeroBanner;