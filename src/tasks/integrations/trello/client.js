import { fetch } from "node-fetch";

const buildClient = ({ api_key, base_url, token }) => {};

const createCard =
  ({ api_key, base_url, token, list_id }) =>
  async ({ name }) => {
    const params = new URLSearchParams();
    params.append("key", api_key);
    params.append("token", token);
    params.append("idList", list_id);
    params.append("name", name);

    return fetch(`${base_url}/cards`, {
      method: "POST",
      body: params,
    })
      .then((response) => {
        console.log(`[trello]: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .catch((err) => console.error(`ERROR: ${err}`));
  };

export const client = (trelloConfig) => {
  const client = buildClient(trelloConfig);
  return {
    createCard: createCard(client),
  };
};
