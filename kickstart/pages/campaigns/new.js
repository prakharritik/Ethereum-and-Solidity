import React, { useState } from "react";

import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

export default () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
      console.log(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h1>Create a Campaign</h1>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution:</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            type="number"
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
};
