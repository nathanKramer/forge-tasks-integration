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
      mutation ($group_id: String!, $item_name: String!) {
        create_item(
          group_id: $group_id
          board_id: $board_id
          item_name: $item_name
        ) {
          id
        }
      }
    `,
    { item_name: item.item_name, group_id: "new_group29179" }
  );

export const client = (mondayConfig) => {
  const client = buildClient(mondayConfig);
  return {
    items: items(client),
    createItem: createItem(client),
  };
};
