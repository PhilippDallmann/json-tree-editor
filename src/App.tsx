import './App.css';
import uploadedJson from '../test.json';
import { SubTree } from './components/SubTree';
import { useState } from 'react';

function updateLeafAtPath(
  tree: object,
  path: Array<string | number>,
  value: string | number | boolean,
): object {
  const [first, ...restOfPath] = path;
  return {
    ...tree,
    [first]: restOfPath.length
      ? updateLeafAtPath(tree[first], restOfPath, value)
      : value,
  };
}

export function App() {
  const [tree, setTree] = useState<object>(uploadedJson);

  function updateLeaf(
    path: Array<string | number>,
    value: string | number | boolean,
  ) {
    const newTree = updateLeafAtPath(tree, path, value);
    setTree(newTree);
  }
  console.log(tree);
  return (
    <div>
      <h1>Vite + React</h1>
      <input className="file-input" type="file" />
      <div className="tree">
        <SubTree partialTree={tree} path={[]} updateLeaf={updateLeaf} />
      </div>
    </div>
  );
}
