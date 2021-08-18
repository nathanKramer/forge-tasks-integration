import { client } from "./client";

export const itemFromTask = ({ title }, { board_id, group_id }) => ({
  board_id,
  item_name: title,
  group_id,
});

const createTask = async (task, config) => {
  const { createItem } = client(config);

  const item = itemFromTask(task, config);
  return createItem(item);
};

export default {
  createTask,
  name: "monday",
};
