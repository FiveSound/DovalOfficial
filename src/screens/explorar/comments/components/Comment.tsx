import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthContext';
import { CLOUDFRONT } from '../../../../services';
import useCustomNavigation from '../../../../context/useCustomNavigation';
import {
  Avatars,
  CardComments,
  FlexContainer,
  IsLoading,
} from '../../../../components/custom';
import InputReply from './InputReply';
import { PropsComment } from '../types';
import { RootState } from '../../../../redux/store';
import { useTheme } from '../../../../hooks';
import {
  addReply,
  fetchReplies,
  toggleLike,
} from '../../../../redux/slides/commentsSlice';

type Props = {
  id: number;
  postID: number;
  name: string;
  content: string;
  reply?: boolean;
  avatar: string;
  userID: string;
};

const Main = (props: Props) => {
  const { greyText, color } = useTheme();
  const { user } = useAuth();
  const { setValue, watch, reset } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const { comment } = watch();
  const dispatch = useDispatch();
  const { comments, loading } = useSelector(
    (state: RootState) => state.comments,
  );

  const [open, setOpen] = useState(false);
  const { navigation } = useCustomNavigation();

  useEffect(() => {
    dispatch(fetchReplies(props.id));
  }, [dispatch, props.id]);

  const addNewReply = async () => {
    dispatch(addReply({ postId: props.postID, commentId: props.id, comment }));
    reset();
  };

  const like = async () => {
    dispatch(
      toggleLike({
        commentId: props.id,
        liked: comments.some(c => c.id === props.id && c.liked),
      }),
    );
  };

  return (
    <>
      <CardComments
        avatar={`${CLOUDFRONT}${props.avatar}`}
        comment={props.content}
        username={props.name}
        likes={comments.find(c => c.id === props.id)?.likes || 0}
        replies={comments}
      />
      {/* {loading && <IsLoading />} */}
      {open && (
        <InputReply
          value={comment}
          onChange={text => setValue('comment', text)}
          onSubmit={addNewReply}
        />
      )}
    </>
  );
};

const Comment = (props: PropsComment) => {
  return (
    <Main
      id={props.id}
      postID={props.postID}
      name={props.name}
      content={props.content}
      reply={true}
      avatar={props.avatar}
      userID={props.userID}
    />
  );
};

export default Comment;
