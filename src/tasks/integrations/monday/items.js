export const itemFromTask = ({ title }, { board_id, group_id }) => ({
  board_id,
  item_name: title,
  group_id,
  column_values: JSON.stringify({
    id: "status",
    text: "Stuck",
    value: JSON.stringify({
      index: 2,
      changed_at: new Date().toISOString(),
      post_id: null,
    }),
  }),
});
