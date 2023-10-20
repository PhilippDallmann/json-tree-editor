import './App.css';
import uploadedJson from '../test.json';
import { SubTree } from './components/SubTree';
import { ChangeEvent, useRef, useState } from 'react';

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

type JSONArray = Array<JSONValue>;

async function parseJsonFile(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        resolve(JSON.parse(text));
      } else {
        reject();
      }
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

function updateLeafAtGivenPath(
  tree: JSONObject,
  path: Array<string | number>,
  value: string | number | boolean,
): JSONObject {
  const [first, ...restOfPath] = path;
  return {
    ...tree,
    [first]: restOfPath.length
      ? updateLeafAtGivenPath(tree[first] as JSONObject, restOfPath, value)
      : value,
  };
}

export function App() {
  const [tree, setTree] = useState<JSONObject>(uploadedJson);
  const updatedTree = useRef(tree);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const parsedTree = await parseJsonFile(file);
      setTree(parsedTree as JSONObject);
    }
  }

  function handleDownloadClick() {
    const fileName = 'updated-file';
    const json = JSON.stringify(updatedTree, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  function updateLeaf(
    path: Array<string | number>,
    value: string | number | boolean,
  ) {
    const newTree = updateLeafAtGivenPath(tree, path, value);
    updatedTree.current = newTree;
  }

  return (
    <div>
      <h1>JSON Tree Editor</h1>
      <div className="button-bar">
        <button onClick={handleUploadClick}>Upload</button>
        <input
          className="file-input"
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept=".json"
        />
        <button disabled={!tree} onClick={handleDownloadClick}>
          Download
        </button>
      </div>
      <div className="tree">
        <SubTree
          partialTree={updatedTree.current}
          path={[]}
          updateLeaf={updateLeaf}
        />
      </div>
    </div>
  );
}
