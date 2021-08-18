import { GraphQLClient, gql } from "graphql-request";

const buildClient = ({ api_key, base_url }) =>
  new GraphQLClient(base_url).setHeaders({
    "Content-Type": "application/json",
    Authorization: api_key,
  });

const items = (client) => async () =>
  client.request(
    gql`
      query {
        items(page: 1) {
          board {
            id
          }
          column_values {
            id
            text
            value
          }
        }
      }
    `
  );

const createItem = (client) => async (item) =>
  client.request(
    gql`
      mutation {
        create_column(
          board_id: 1576286953
          title: ${item.title}
        )
      }
    `
  );

export const client = (mondayConfig) => {
  const client = buildClient(mondayConfig);
  return {
    items: items(client),
    createItem: createItem(client),
  };
};
