import { useCards } from '../providers/Cards';
import { toBlob } from 'html-to-image';
import { ORIGINAL_SIZE } from '../lib/scale';
import { BingoCard } from '../components/BingoCard';
import styled from '@emotion/styled';
import { DraggableResizable } from '../components/DraggableResizable';
import { Button, Spinner } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { BackgroundImageContainer } from '../components/BackgroundImageContainer';
import { useBackgroundImage } from '../providers/BackgroundImage';
import { useEffect } from '../hooks/useEffect';
import { download, downloadArchive } from '../lib/download';
import { getBingoCellValues } from '../lib/bingo';

const CardContainer = styled(DraggableResizable)`
  position: relative;
`;

const FullScreenForeground = styled.div`
  position: absolute;
  z-index: 1;

  width: 100%;
  height: 100%;
`;

const Centered = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMaskBackground = styled.div`
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

const LoadingMask: React.FC = () => (
  <FullScreenForeground>
    <Centered>
      <LoadingMaskBackground>
        <Centered>
          <Spinner size="xl" />
        </Centered>
      </LoadingMaskBackground>
    </Centered>
  </FullScreenForeground>
);

export const PreviewTab: React.FC = () => {
  const [previewSrc, setPreviewBlob] = useState<Blob>();
  const [downloadClickCount, setDownloadClickCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { setFileUrl } = useBackgroundImage();

  const { cards } = useCards();
  const { fileUrl } = useBackgroundImage();

  const [isGenerating, setIsGenerating] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGenerating || previewSrc || !ref.current) {
      return;
    }

    setIsGenerating(true);

    void toBlob(ref.current!)
      .then((blob) => {
        if (!blob) {
          return;
        }

        setPreviewBlob(blob);
        setFileUrl(blob);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }, [isGenerating, previewSrc, ref.current]);

  if (!previewSrc || isDownloading) {
    return (
      <>
        <LoadingMask />
        <div ref={ref}>
          <BackgroundImageContainer $bgImgUrl={fileUrl}>
            {cards.map((card, idx) => {
              const width = ORIGINAL_SIZE.width * card.placement.scale;
              const height = ORIGINAL_SIZE.height * card.placement.scale;

              return (
                <CardContainer box={{ ...card.placement, width, height }} key={`preview-bingo-card-${idx}`}>
                  <BingoCard cells={getBingoCellValues()} scale={card.placement.scale} />
                </CardContainer>
              );
            })}
          </BackgroundImageContainer>
        </div>
      </>
    );
  }

  return (
    <FullScreenForeground>
      <Centered>
        <Button
          outlineColor="black"
          outlineOffset="0"
          onClick={async () => {
            setIsDownloading(true);
            void download({
              blob: previewSrc,
              archiveName: `${downloadClickCount}.png`,
            }).finally(() => {
              setIsDownloading(false);
              setPreviewBlob(undefined);
              setDownloadClickCount((prev) => prev + 1);
            });
          }}
        >
          Download
        </Button>
      </Centered>
    </FullScreenForeground>
  );
};
