import monday from "./monday";
import todoist from "./todoist";
import trello from "./trello";

const integrations = [monday, todoist, trello];

export async function createTasks(task, integrationConfig) {
  const createTasks = integrations.map(({ createTask, name }) =>
    createTask(task, integrationConfig[name])
  );

  return Promise.all(createTasks);
}
