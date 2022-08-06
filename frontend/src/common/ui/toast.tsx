import styled from "@emotion/styled";
import { colors } from "common/colors";
import { ToastTypes, useGlobalToast } from "common/provide-toast-notifications";
import { useEffect, useState } from "react";
import { Close } from "@styled-icons/material-rounded/Close";
type Props = {
  toastType: ToastTypes;
  toastText: string;
  toastProps?: any;
};

interface ToastConfig {
  backgroundColor: string;
  color: string;
  headerText: string;
  text?: string;
}

const toastConfigs: {
  success: ToastConfig;
  info: ToastConfig;
  warning: ToastConfig;
  error: ToastConfig;
} = {
  success: {
    backgroundColor: colors.success,
    color: colors.white,
    headerText: "Success!",
  },
  info: {
    backgroundColor: colors.info,
    color: colors.white,
    headerText: "Info!",
  },
  warning: {
    backgroundColor: colors.warning,
    color: colors.black,
    headerText: "Warning!",
  },
  error: {
    backgroundColor: colors.error,
    color: colors.white,
    headerText: "Error!",
  },
};

const ToastContainer = styled.div<{ backgroundColor: string; color: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  position: absolute;
  bottom: 3.75rem;
  right: 3.75rem;
  z-index: 999;
  padding: 0.625rem 0.625rem 0.625rem 1.25rem;
  border-radius: 0.313rem;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToastHeader = styled.div`
  font-size: 1rem;
`;

const CloseIcon = styled(Close)`
  margin-left: 1.25rem;
  min-width: 1.375rem;
  height: 1.375rem;
  &:hover {
    cursor: pointer;
  }
`;

const ToastText = styled.div`
  margin-top: 0.313rem;
  font-size: 0.75rem;
`;

export const Toast = ({ toastType, toastText }: Props) => {
  const [toast, setToast] = useState<ToastConfig>();

  const { hideToast } = useGlobalToast();

  useEffect(() => {
    if (!toastConfigs[toastType]) {
      return;
    }

    setToast({ ...toastConfigs[toastType], text: toastText });
  }, [toastType, toastText]);

  return (
    <>
      {toast ? (
        <ToastContainer
          backgroundColor={toast.backgroundColor}
          color={toast.color}
        >
          <div>
            <ToastHeader>{toast.headerText}</ToastHeader>

            {toast.text ? <ToastText>{toast.text}</ToastText> : null}
          </div>
          <CloseIcon onClick={() => hideToast()}></CloseIcon>
        </ToastContainer>
      ) : null}
    </>
  );
};
