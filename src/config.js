const requiredConfig = [
  "MONDAY_API_KEY",
  "MONDAY_BASE_URL",
  "MONDAY_BOARD_ID",
  "MONDAY_GROUP_ID",
  "TRELLO_API_KEY",
  "TRELLO_BASE_URL",
  "TRELLO_TOKEN",
  "TRELLO_LIST_ID",
];

const expectConfig = (expected, env) => {
  const missingConfig = expected.filter((key) => !env[key]);

  if (missingConfig.length > 0) {
    throw `Missing configuration: ${missingConfig.join(", ")}`;
  }
};

export const loadConfig = (env) => {
  expectConfig(requiredConfig, env);

  const {
    MONDAY_API_KEY,
    MONDAY_BASE_URL,
    MONDAY_BOARD_ID,
    MONDAY_GROUP_ID,
    TRELLO_API_KEY,
    TRELLO_BASE_URL,
    TRELLO_TOKEN,
    TRELLO_LIST_ID,
  } = env;

  return {
    integrations: {
      monday: {
        api_key: MONDAY_API_KEY,
        base_url: MONDAY_BASE_URL,
        board_id: parseInt(MONDAY_BOARD_ID),
        group_id: MONDAY_GROUP_ID,
      },
      trello: {
        api_key: TRELLO_API_KEY,
        base_url: TRELLO_BASE_URL,
        token: TRELLO_TOKEN,
        list_id: TRELLO_LIST_ID,
      },
    },
  };
};
