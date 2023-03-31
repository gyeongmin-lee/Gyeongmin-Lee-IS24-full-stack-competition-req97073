import { Skeleton, Stack } from "@chakra-ui/react";

interface Props {
  /**
   * Number of skeletons to render.
   * @default 3
   */
  skeletonCount: number;
}

const TableLoadingSkeleton = (
  { skeletonCount }: Props = { skeletonCount: 3 }
) => {
  return (
    <Stack w="100%">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Skeleton key={index} height={10} />
      ))}
    </Stack>
  );
};

export default TableLoadingSkeleton;
