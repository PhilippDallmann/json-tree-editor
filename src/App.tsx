import './App.css';
import uploadedJson from '../test.json';
import { SubTree } from './components/SubTree';

export function App() {
  return (
    <div>
      <h1>Vite + React</h1>
      <input className="file-input" type="file" />
      <div className="tree">
        <SubTree partialTree={uploadedJson} depth={0} />
      </div>
    </div>
  );
}
