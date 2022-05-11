import styled from "@emotion/styled";
import { FC, useRef, useState, useEffect } from "react";

type ErrorType = FC<{
  message: string;
}>;

type ContentProps = { contentWidth: number; isMessage: boolean };

const Container = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
`;

const Content = styled.div<ContentProps>`
  color: red;
  position: absolute;
  top: -20px;
  white-space: nowrap;
  right: calc(
    50% - ${(props: { contentWidth: number }) => props.contentWidth / 2 + "px"}
  );
  opacity: ${(props: ContentProps) => (props.isMessage ? 1 : 0)};
`;

export const Error: ErrorType = ({ message }) => {
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(
        (contentRef?.current as unknown as HTMLElement)?.offsetWidth
      );
    }
  }, [message]);

  return (
    <Container>
      <Content
        ref={contentRef}
        contentWidth={contentWidth}
        isMessage={message ? true : false}
      >
        {message}
      </Content>
    </Container>
  );
};
