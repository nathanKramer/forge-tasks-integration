import { createTasks } from "./integrations";

export const taskCreated = async (task, { config }) =>
  createTasks(task, config.integrations);
