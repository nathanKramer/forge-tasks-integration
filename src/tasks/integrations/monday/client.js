import { GraphQLClient, gql } from "graphql-request";

const buildClient = ({ api_key, base_url }) =>
  new GraphQLClient(base_url).setHeaders({
    "Content-Type": "application/json",
    Authorization: api_key,
  });

const handleErrors = (err) => {
  let response;

  try {
    const error = err?.response?.error;
    response = JSON.parse(error);
  } catch (err) {
    return Promise.reject(err);
  }

  const itemId = response?.data?.create_item?.id;
  if (!itemId) return Promise.reject(err);

  // This is an inexplicable error
  // The item was created,
  // and there is no useful information in the error message
  console.info(`[monday] item_created id=${itemId}`);
  return Promise.resolve(response.data);
};

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
  client
    .request(
      gql`
        mutation (
          $board_id: Int!
          $group_id: String!
          $item_name: String!
          $column_values: JSON!
        ) {
          create_item(
            group_id: $group_id
            board_id: $board_id
            item_name: $item_name
            column_values: $column_values
          ) {
            id
          }
        }
      `,
      item
    )
    .catch(handleErrors);

export const client = (mondayConfig) => {
  const client = buildClient(mondayConfig);
  return {
    items: items(client),
    createItem: createItem(client),
  };
};
