import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  getCommentByPostService,
  CommentService,
} from '../../../services/posts';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import i18next from '../../../Translate';
import { PropsComment } from './types';
import { useNavigation, FlashList } from '../../../components/native';
import { IsLoading } from '../../../components/custom';
import { SIZES } from '../../../constants/theme';
import Layout from './Layout';
import renderItem from './components/renderItem';

type Props = {
  postID: number;
  onFocusInput?: () => void;
};

const Comments = ({ postID, onFocusInput }: Props) => {
  const { setValue, watch, reset } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const [data, setData] = useState<PropsComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadings, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { user } = useAuth();

  const getData = async () => {
    setIsLoading(true);
    await getCommentByPostService(postID, setData, setLoading);
    setIsLoading(false);
  };

  const handleCreatedComment = async () => {
    const commentText = watch('comment');
    if (!user) {
      Alert.alert(
        i18next.t('You are not logged in'),
        i18next.t('You must be logged in to create a comment.'),
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: i18next.t('Login'),
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
      return;
    }
    if (commentText.trim()) {
      setLoading(true);
      try {
        const newComment = await CommentService(postID, commentText);
        setData(prevComments => [...prevComments, newComment]);
        reset({ comment: '' });
      } catch (error) {
        console.error('Error al crear el comentario:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setData([]);
    };
  }, [postID]);

  return (
    <Layout
      value={watch('comment')}
      onChangeText={text => setValue('comment', text)}
      onPressChat={handleCreatedComment}
      onFocusInput={onFocusInput}
      loading={loading}
    >
      {isLoadings && <IsLoading />}
      <View style={styles.container}>
        <FlashList
          data={data}
          keyExtractor={item => `${item.id}`}
          horizontal={false}
          decelerationRate="fast"
          showsVerticalScrollIndicator={true}
          snapToInterval={SIZES.height / 2}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          renderItem={renderItem}
          estimatedItemSize={100}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Comments;
