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
    updateLeaf: (
        path: LeafPath,
        value: LeafValue,
    ) => void;
    partialTree: object;
    path: LeafPath;
    label?: string;
}

export function SubTree(props: Props) {
    const { partialTree, label, path, updateLeaf } = props;
    const depth = path.length;
    const [isExpanded, setIsExpanded] = useState(depth === 0);

    return (
        <div className="sub-tree">
            <span className="branch-header" onClick={() => setIsExpanded((v) => !v)}>
                {isExpanded ? '⏶ ' : '⏷ '}
                {label && <b>{`${label}: `}</b>}
            </span>
            {isExpanded
                ? Object.entries(partialTree).map(([key, value], index) => {
                    if (getIsLeaf(value)) {
                        return (
                            <Leaf
                                key={index}
                                treeValue={value}
                                label={key}
                                path={[...path, key]}
                                updateLeaf={updateLeaf}
                            />
                        );
                    }
                    return (
                        <SubTree
                            key={index}
                            partialTree={value}
                            label={key}
                            path={[...path, key]}
                            updateLeaf={updateLeaf}
                        />
                    );
                })
                : null}
        </div>
    );
}
