import { BINGO_LETTERS, FREE_SPACE_TEXT } from '../const/bingo';

function getRandomIntInRange(floor: number, ceiling: number): number {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

export function getBingoCellValues(): string[][] {
  const cells: number[] = [];

  for (let i = 0; i < 25; i++) {
    // Free space
    if (i === 12) {
      cells.push(0);
      continue;
    }

    // 0: 1-15, 1: 16-30, etc.
    const factor = Math.max(Math.floor(i / 5), 0);
    const lower = factor * 15 + 1;
    const upper = factor * 15 + 15;

    let rand = getRandomIntInRange(lower, upper);

    while (cells.includes(rand)) {
      rand = getRandomIntInRange(lower, upper);
    }

    cells.push(rand);
  }

  return cells.reduce<string[][]>((acc, cur, i) => {
    const idx = Math.max(Math.floor(i / 5), 0);
    acc[idx] = [...(acc[idx] ?? [BINGO_LETTERS[idx]!]), (cur || FREE_SPACE_TEXT).toString()];

    return acc;
  }, []);
}
