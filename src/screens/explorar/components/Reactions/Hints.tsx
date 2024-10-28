import React, { useEffect, useState } from 'react';
import styles from './styles';
import { Hint } from '../../../../components/custom';

type Props = {
  ShowAlert: boolean;
};

const Hints = (props: Props) => {
  const { ShowAlert } = props;
  const [visible, setVisible] = useState(ShowAlert);

  useEffect(() => {
    if (ShowAlert) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [ShowAlert]);

  return (
    <Hint
      label="Thank you, help us improve your experience!"
      showLabel={true}
      position="right"
      orientation="top"
      ShowAlert={visible}
      container={styles.containerHint}
      styleTriangule={styles.bordertriangue}
      labelstyle={styles.labelHint}
    />
  );
};

export default Hints;
