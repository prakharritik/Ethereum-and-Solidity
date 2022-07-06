import React, { useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

const CardGroup = ({ campaigns }) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link route={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });

  return <Card.Group items={items} />;
};

const index = ({ campaigns }) => {
  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Link route="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>
      <CardGroup campaigns={campaigns} />
    </Layout>
  );
};

index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default index;
