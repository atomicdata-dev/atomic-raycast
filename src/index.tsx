import { ActionPanel, Detail, List, PushAction } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        key="1"
        icon="list-icon.png"
        title="Greeting"
        actions={
          <ActionPanel>
            <PushAction title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
          </ActionPanel>
        }
      />
    </List>
  );
}
