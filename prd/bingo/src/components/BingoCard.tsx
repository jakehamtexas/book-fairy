import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FREE_SPACE_TEXT } from '../const/bingo';

const BingoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const WIDTH_HEIGHT_PX = 50;

const Column = styled.div<{ $scale: number }>`
  & > * {
    ${({ $scale }) => {
      const lineHeightPx = Math.ceil(WIDTH_HEIGHT_PX * $scale);

      return css`
        height: ${lineHeightPx}px;
        width: ${lineHeightPx}px;

        text-align: center;
        line-height: ${lineHeightPx}px;
      `;
    }}
  }

  :last-child > * {
    border-right: none;
  }
`;

type BorderOption = 'light' | 'heavy';

function getBorderOption(opt: BorderOption | undefined): string {
  switch (opt) {
    case 'light':
      return '1px solid black';
    case 'heavy':
      return '2px solid black';
    default:
      return 'none';
  }
}

const FreeSpaceCell = styled.div<{ $scale: number }>`
  ${({ $scale }) => css`
    font-size: ${$scale * 0.5}rem;
    border-right: ${getBorderOption('light')};
    border-bottom: ${getBorderOption('light')};
    font-weight: bold;
  `}
`;

const BingoLetterCell = styled.div<{ $scale: number }>`
  ${({ $scale }) => css`
    font-weight: bold;
    font-size: ${$scale}rem;
    border-bottom: 2px solid black;
  `}
`;

const NumberCell = styled.div<{ $scale: number }>`
  ${({ $scale }) => `
  font-size: ${$scale}rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;

  :last-child {
    border-bottom: none;
  }
`}
`;

export const BingoCard: React.FC<{ scale: number; cells: string[][] }> = ({ scale, cells }) => {
  return (
    <BingoGrid>
      {cells.map((row) => (
        <Column $scale={scale} key={row.join(',')}>
          {row.map((cell, i) =>
            i === 0 ? (
              <BingoLetterCell key={cell} $scale={scale}>
                {cell}
              </BingoLetterCell>
            ) : cell === FREE_SPACE_TEXT ? (
              <FreeSpaceCell key={cell} $scale={scale}>
                {cell}
              </FreeSpaceCell>
            ) : (
              <NumberCell key={cell} $scale={scale}>
                {cell}
              </NumberCell>
            ),
          )}
        </Column>
      ))}
    </BingoGrid>
  );
};
