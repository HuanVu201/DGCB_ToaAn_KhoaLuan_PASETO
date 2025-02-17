import React, { useCallback, useEffect } from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from 'reactflow';


// K được phép dùng context ở đây
export const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    label,
    onEdgeClick
}: EdgeProps & {
    onEdgeClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, label: string) => void
}) => {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{...style, color:"black"}} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 16,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <div className="custom-edge-thtt-react-flow" onClick={(event) => onEdgeClick && onEdgeClick(event, id, label as string)}>
                        {label}
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
