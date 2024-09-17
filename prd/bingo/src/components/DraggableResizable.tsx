import { type PropsWithChildren } from 'react';
import { Rnd } from 'react-rnd';

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type BoundingBox = Position & Size;

export const DraggableResizable: React.FC<
  PropsWithChildren<{
    box: BoundingBox;
    onChange: (next: BoundingBox) => void;
    className?: string;
  }>
> = ({ children, box, onChange, className }) => {
  function handleChanged(newPosition: Position): void;
  function handleChanged(newSize: Size): void;
  function handleChanged(newBox: Partial<BoundingBox>) {
    const next = {
      x: newBox?.x ?? box.x,
      y: newBox?.y ?? box.y,
      width: newBox?.width ?? box.width,
      height: newBox?.height ?? box.height,
    };

    onChange(next);
  }

  return (
    <Rnd
      {...(className ? { className } : undefined)}
      position={box}
      size={box}
      enableResizing={{
        right: true,
        bottom: true,
        bottomRight: true,

        top: false,
        left: false,
        topRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onDragStop={(_e, state) => {
        handleChanged(state);
      }}
      onResizeStop={(_e, _direction, ref) => {
        const { width, height } = ref.getBoundingClientRect();
        handleChanged({ width, height });
      }}
      lockAspectRatio
    >
      {children}
    </Rnd>
  );
};
