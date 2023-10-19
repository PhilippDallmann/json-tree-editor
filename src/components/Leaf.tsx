import { useState } from 'react';

interface Props {
  updateLeaf: (
    path: Array<string | number>,
    value: string | number | boolean,
  ) => void;
  treeValue: string | number | boolean;
  path: Array<string | number>;
  label?: string;
}

export function Leaf(props: Props) {
  const { treeValue, label, updateLeaf, path } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(treeValue);
  const [isEditing, setIsEditing] = useState(false);

  function saveChanges() {
    updateLeaf(path, value);
    setIsEditing(false);
  }

  return (
    <div className="leaf">
      {label && <b>{`${label}: `}</b>}
      {isEditing ? (
        <input
          value={value.toString()}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        treeValue.toString()
      )}
      {isEditing ? (
        <button className="icon-button" aria-label="Save" onClick={saveChanges}>
          ✓
        </button>
      ) : (
        <button
          className="icon-button"
          aria-label="Edit"
          onClick={() => setIsEditing(true)}
        >
          ✎
        </button>
      )}
    </div>
  );
}
