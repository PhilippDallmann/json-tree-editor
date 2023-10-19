import { useState } from 'react';

interface Props {
  initialValue: string | number | boolean;
  label?: string;
}

export function Leaf(props: Props) {
  const { initialValue, label } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(initialValue);

  return (
    <div className="leaf">
      {label && <b>{`${label}: `}</b>}
      {value.toString()}
    </div>
  );
}
