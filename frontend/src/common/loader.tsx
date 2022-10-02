import styled from "@emotion/styled";
import { colors } from "./colors";

const Container = styled.div`
  div:not(:last-child) {
    margin-right: 0.875rem;
  }
`;

const Dot = styled.div<{ index: number }>`
  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(2);
    }

    100% {
      transform: scale(1);
    }
  }

  width: 1rem;
  height: 1rem;
  background-color: ${colors.salmon};
  display: inline-block;
  border-radius: 50%;
  animation-duration: 1s;
  animation-name: scaleAnimation;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: ${({ index }) => `${0.15 * index}s`};
`;

export const Loader = () => {
  return (
    <Container>
      <Dot index={1}></Dot>
      <Dot index={2}></Dot>
      <Dot index={3}></Dot>
      <Dot index={4}></Dot>
      <Dot index={5}></Dot>
    </Container>
  );
};
