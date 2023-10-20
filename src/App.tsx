import './App.css';
import { SubTree } from './components/SubTree';
import { ChangeEvent, useRef, useState } from 'react';

async function parseJsonFile(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const text = event.target?.result;
        const result = JSON.parse(text as string);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

function updateLeafAtGivenPath(
  tree: JSONObject,
  path: LeafPath,
  value: LeafValue,
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
  const [, forceUpdate] = useState({});
  const treeRef = useRef<JSONObject | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedTree = await parseJsonFile(file);
        treeRef.current = parsedTree as JSONObject;
        forceUpdate({});
      } catch (error) {
        alert(error);
      }
    }
  }

  function handleDownloadClick() {
    const fileName = 'updated-file';
    const json = JSON.stringify(treeRef.current, null, 2);
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

  function updateLeaf(path: LeafPath, value: LeafValue) {
    if (treeRef.current) {
      const newTree = updateLeafAtGivenPath(treeRef.current, path, value);
      treeRef.current = newTree;
    }
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
        <button disabled={!treeRef.current} onClick={handleDownloadClick}>
          Download
        </button>
      </div>
      {treeRef.current ? (
        <div className="tree">
          <SubTree
            partialTree={treeRef.current}
            path={[]}
            updateLeaf={updateLeaf}
          />
        </div>
      ) : null}
    </div>
  );
}
