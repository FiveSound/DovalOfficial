import { lazy, memo, Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/theme';
import { IsLoading } from '../../../components/custom';
const LazyCardRecipies = lazy(() => import('../../../components/custom/business/CardRecipies'));

type Props = {
  id: number;
  onDelete: (id: number, name: string) => void;
  name: string;
  thumbnail: string;
  description: string;
  complete: boolean;
  price: string;
  discount: number;
};

const Recipe = (props: Props) => (
  <Suspense fallback={<IsLoading />}>
    <LazyCardRecipies row={props} isBusiness={true} rowBusiness={props} />
  </Suspense>
);

export default memo(Recipe);

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFF',
  },
});
