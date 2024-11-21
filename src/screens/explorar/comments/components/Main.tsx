import React, { lazy, memo, Suspense } from 'react';
import { PropsComment } from '../types';
import { IsLoading } from '../../../../components/custom';
const LazyComments = lazy(() => import('./Comment'));

type Props = {
  row: PropsComment;
};

const Main = ({ row }: Props) => {
  return (
    <Suspense fallback={<IsLoading />}>
      <LazyComments
        key={row.id}
        id={row.id}
        content={row.content}
        replyID={row.replyID}
        userID={row.userID}
        postID={row.postID}
        name={row.name}
        avatar={row.avatar}
      />
    </Suspense>
  );
};

export default memo(Main);
