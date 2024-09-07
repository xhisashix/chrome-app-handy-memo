import React from "react";
import { Helmet } from "react-helmet";

interface HelmetProps {
  title: string;
  description: string;
}

const HelmetComponent: React.FC<HelmetProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="stylesheet" href="./index.css" />
    </Helmet>
  );
};

export default HelmetComponent;
