import { useState } from 'react';

function validate(value: LeafValue, type: LeafValueType) {
  if (type === 'boolean') {
    if (value === 'true' || value === 'false') {
      return { isValid: true, validatedValue: value === 'true' };
    }
  }
  if (type === 'number') {
    if (!isNaN(Number(value))) {
      return { isValid: true, validatedValue: Number(value) };
    }
  }
  if (type === 'string') {
    if (typeof value === type) {
      return { isValid: true, validatedValue: value };
    }
  }

  return { isValid: false, message: `Type ${type} is expected` };
}

interface Props {
  updateLeaf: (path: LeafPath, value: LeafValue) => void;
  treeValue: LeafValue;
  path: LeafPath;
  label?: string;
}

export function Leaf(props: Props) {
  const { treeValue, label, updateLeaf, path } = props;
  const [value, setValue] = useState(treeValue);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState<
    string | undefined
  >();

  function saveChanges() {
    const { isValid, message, validatedValue } = validate(
      value,
      typeof treeValue as LeafValueType,
    );

    if (isValid && validatedValue !== undefined) {
      updateLeaf(path, validatedValue);
      setIsEditing(false);
    }
    setValidationErrorMessage(message);
  }

  if (treeValue === null) {
    return <div className="leaf">{label && <b>{`${label}: `}</b>}null</div>;
  }

  return (
    <div className="leaf">
      {label && <b>{`${label}: `}</b>}
      {isEditing ? (
        <input
          value={value?.toString()}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        value?.toString()
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
      {validationErrorMessage ? (
        <span className="error-message">{validationErrorMessage}</span>
      ) : null}
    </div>
  );
}
