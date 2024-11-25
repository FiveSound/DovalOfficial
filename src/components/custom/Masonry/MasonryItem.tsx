import React, { useEffect } from "react";
import Card from "./Card";
import Ads from "./Ads";
import { COLORS } from "@/src/constants/theme";

interface MasonryItemProps {
  pin: any;
  showInf: boolean;
  isFocused: boolean;
  ads: boolean;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ pin, showInf, isFocused, ads }) => {

  return (<>
    <Card
      pin={pin}
      showInf={showInf}
      isFocused={isFocused}
    />
    {
      ads && <Ads background={COLORS.error} label='Business nearby for You' />
    }
  </>
  );
};

export default React.memo(MasonryItem);