import { useState } from 'react';
import { Leaf } from './Leaf';

function getIsLeaf(value: unknown) {
  if (
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    value === null
  ) {
    return true;
  }
  return false;
}

interface Props {
  partialTree: object;
  depth: number;
  label?: string;
}

export function SubTree(props: Props) {
  const { partialTree, label, depth } = props;
  const [isExpanded, setIsExpanded] = useState(depth === 0);

  return (
    <div className="sub-tree">
      <span className="branch-header" onClick={() => setIsExpanded((v) => !v)}>
        {isExpanded ? '^ ' : 'v '}
        {label && <b>{`${label}: `}</b>}
      </span>
      {isExpanded
        ? Object.entries(partialTree).map(([key, value], index) => {
            if (getIsLeaf(value)) {
              return <Leaf key={index} initialValue={value} label={key} />;
            }
            return (
              <SubTree partialTree={value} label={key} depth={depth + 1} />
            );
          })
        : null}
    </div>
  );
}
