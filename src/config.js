const requiredConfig = ["MONDAY_API_KEY", "MONDAY_BASE_URL"];

const expectConfig = (expected, env) => {
  const missingConfig = expected.filter((key) => !env[key]);

  if (missingConfig.length > 0) {
    throw `Missing configuration: ${missingConfig.join(", ")}`;
  }
};

export const loadConfig = (env) => {
  expectConfig(requiredConfig, env);

  const { MONDAY_API_KEY, MONDAY_BASE_URL } = env;
  return {
    integrations: {
      monday: {
        api_key: MONDAY_API_KEY,
        base_url: MONDAY_BASE_URL,
      },
    },
  };
};