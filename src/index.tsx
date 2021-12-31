import { ActionPanel, CopyToClipboardAction, Detail, List, OpenInBrowserAction, PushAction } from "@raycast/api";
import { useServerSearch, StoreContext, useTitle, useResource, useString } from '@tomic/react';
import { Store, urls } from '@tomic/lib';
import React from "react";

const store = new Store({
  // By setting a Base URL, we tell the client where to send Commits to.
  serverUrl: "https://atomicdata.dev"
});

export default function Command() {

  return (
    <StoreContext.Provider value={store}>
      <Content />
    </StoreContext.Provider>
  );
}

function Content() {
  const [query, setQuery] = React.useState("");
  const { results, loading, error } = useServerSearch(query, {
    include: true,
  });

  const onSearchTextChange = async (text: string) => {
    setQuery(text);
  }

  return (
    <List
      navigationTitle="Atomic Data Search"
      searchBarPlaceholder="Search your Atomic Server..."
      isLoading={loading}
      onSearchTextChange={onSearchTextChange}
    >
      {error && <List.Item title={error.message} />}
      {query.length > 0 && results && results.map(subject => (
        <SearchHit
          subject={subject}
          key={subject}
        />
      ))}
    </List>
  )
}

interface SearchHitProps {
  subject: string,
}

function SearchHit({ subject }: SearchHitProps) {
  const resource = useResource(subject);

  const title = useTitle(resource);
  const [description] = useString(resource, urls.properties.description);

  const klass = useResource(resource.getClasses()[0]);
  const klassTitle = useTitle(klass);

  const md = `# ${title} \n\n ${description}`;

  return (
    <List.Item
      key={subject}
      title={title}
      subtitle={description || ""}
      accessoryTitle={klassTitle}
      actions={
        <ActionPanel>
          <PushAction
            title="Show Details"
            target={
              <Detail markdown={md} actions={
                <ActionPanel>
                  <OpenInBrowserAction title="Open in browser" url={subject} />
                </ActionPanel>
              } />
            }
          />
          <CopyToClipboardAction content={subject} title="Copy URL to clipboard" />
          <OpenInBrowserAction title="Open in browser" url={subject} />
        </ActionPanel>
      }
    />
  )
}
