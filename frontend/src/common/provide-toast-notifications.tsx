import { createContext, useContext, useState } from "react";
import { Toast } from "./ui/toast";

export type ToastTypes = "success" | "info" | "warning" | "error";

type TypeContext = {
  showToast: (toastType: ToastTypes, toastProps?: any) => void;
  hideToast: () => void;
  store: any;
};

const initialState: TypeContext = {
  hideToast: () => {},
  showToast: () => {},
  store: {},
};

const ToastContext = createContext(initialState);

export const useGlobalToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{}> = ({ children }) => {
  const [store, setStore] = useState<any>();
  const { toastType, toastText, toastProps } = store || {};

  const showToast = (
    toastType: ToastTypes,
    toastText: string,
    toastProps: any = {}
  ) => {
    setStore({
      ...store,
      toastType: toastType,
      toastText: toastText,
      toastProps: toastProps,
    });
  };

  const hideToast = () => {
    setStore({
      ...store,
      toastType: null,
      toastText: "",
      toastProps: {},
    });
  };

  const renderComponent = () => {
    if (!toastType) {
      return null;
    }

    return (
      <Toast toastType={toastType} toastText={toastText} {...toastProps} />
    );
  };

  return (
    <ToastContext.Provider value={{ store, showToast, hideToast }}>
      {renderComponent()}
      {children}
    </ToastContext.Provider>
  );
};
