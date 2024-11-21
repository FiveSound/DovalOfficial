import React, { useEffect } from "react";
import Card from "./Card";

interface MasonryItemProps {
  pin: any;
  showInf: boolean;
  isFocused: boolean;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ pin, showInf, isFocused }) => {

  return (
      <Card
        pin={pin}
        showInf={showInf}
        isFocused={isFocused}
      />
  );
};

export default React.memo(MasonryItem);