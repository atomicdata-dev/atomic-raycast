import { ActionPanel, Form, getLocalStorageItem, setLocalStorageItem, SubmitFormAction, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import { showHUD } from "@raycast/api";
import {URL} from 'url';

interface Settings {
  server: string,
}

export default function Command() {
  const [serverCurrent, setServer] = useState<string>("https://atomicdata.dev");
  const { pop } = useNavigation();

  useEffect(() => {
    async function getData() {
      const data = await getLocalStorageItem<string>('server');
      data && setServer(data);
    }
    getData();
  }, [])


  function handleSubmit({server}: Settings): void {
    try {new URL(server) } catch (e) {
      showHUD(`Invalid URL: ${server}`);
      return;
    }

    setLocalStorageItem("server", server);
    pop();
    showHUD("Settings saved");
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }>
      <Form.TextField storeValue id="server" title="Atomic Server URL" placeholder="e.g. https://atomicdata.dev" value={serverCurrent} onChange={setServer}/>
    </ Form>
  );
}
