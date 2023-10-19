import { useState } from 'react';

interface Props {
  updateLeaf: (
    path: Array<string | number>,
    value: string | number | boolean,
  ) => void;
  initialValue: string | number | boolean;
  path: Array<string | number>;
  label?: string;
}

export function Leaf(props: Props) {
  const { initialValue, label, updateLeaf, path } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(initialValue);

  return (
    <div className="leaf" onClick={() => updateLeaf(path, 'test')}>
      {label && <b>{`${label}: `}</b>}
      {initialValue.toString()}
    </div>
  );
}
