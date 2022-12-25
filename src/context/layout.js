import React from "react";

export const LayoutContext = React.createContext({
  fixed: false,
  footer: true,
  setFixed: () => {},
  hideFooter: () => {},
});
