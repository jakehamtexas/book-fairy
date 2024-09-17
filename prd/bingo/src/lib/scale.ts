const NUM_COLUMNS = 5;
const NUM_ROWS = 6;
const BORDER_SIZE = 1;
const TITLE_ROW_BORDER_SIZE = 2;
const STARTING_CELL_SIZE = 50;

export const ORIGINAL_SIZE = {
  width: NUM_COLUMNS * STARTING_CELL_SIZE + (NUM_COLUMNS - 1) * BORDER_SIZE,
  height: NUM_ROWS * STARTING_CELL_SIZE + (NUM_ROWS - 2) * BORDER_SIZE + TITLE_ROW_BORDER_SIZE,
};

export function calculateScale(original: { width: number; height: number }, next: { width: number; height: number }) {
  const roundingGranularity = 1 / 0.05;

  return Math.round((next.width / original.width) * roundingGranularity) / roundingGranularity;
}
