import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, url }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
  </Helmet>
);

export default SEO;