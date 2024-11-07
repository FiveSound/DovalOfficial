import React from 'react';
import Layout from './Layout';
import SenderGrid from './Senders/SenderGrid';

type Props = {
  postID: number;
};

const MoreOptions: React.FC<Props> = ({ postID }: Props) => {
  return (
    <Layout>
      {/* <SenderGrid /> */}
      <></>
    </Layout>
  );
};

export default MoreOptions;
