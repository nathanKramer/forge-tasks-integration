import { client } from "./client";
import { itemFromTask } from "./items";

const createTask = async (task, config) => {
  const { createItem } = client(config);

  const item = itemFromTask(task, config);
  return createItem(item);
};

export default {
  createTask,
  name: "monday",
};
