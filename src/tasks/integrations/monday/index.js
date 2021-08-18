import { client } from "./client";

const itemFromTask = ({ title }) => ({
  title,
});

export async function createTask(task, { config }) {
  const { monday } = config;
  const { createItem } = client(monday);

  const item = itemFromTask(task);
  return createItem(item);
}
