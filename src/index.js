import { loadConfig } from "./config";
import { taskCreated } from "./tasks";

const taskFromIssue = ({ key, fields }) => {
  const { summary } = fields;
  return {
    externalId: key,
    title: summary,
  };
};

export async function run(event, context) {
  const config = loadConfig(process.env);

  const { issue } = event;
  const task = taskFromIssue(issue);

  const _data = await taskCreated(task, {
    source: "jira",
    config,
    ...context,
  });
}
