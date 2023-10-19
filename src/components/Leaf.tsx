import { useState } from 'react';

function validate(
  value: string | number | boolean,
  type: 'string' | 'number' | 'boolean',
) {
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
  const [value, setValue] = useState(treeValue);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState<
    string | undefined
  >();

  function saveChanges() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { isValid, message, validatedValue } = validate(
      value,
      typeof treeValue,
    );

    if (isValid && validatedValue) {
      updateLeaf(path, validatedValue);
      setIsEditing(false);
    }
    setValidationErrorMessage(message);
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
      {validationErrorMessage ? (
        <span className="error-message">{validationErrorMessage}</span>
      ) : null}
    </div>
  );
}
