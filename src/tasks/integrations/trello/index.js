import { client } from "./client";

const cardFromTask = ({ title }, { list_id }) => ({
  name: title,
  list_id,
});

const createTask = async (task, config) => {
  const { createCard } = client(config);

  const card = cardFromTask(task, config);
  return createCard(card);
};

export default {
  createTask,
  name: "trello",
};
