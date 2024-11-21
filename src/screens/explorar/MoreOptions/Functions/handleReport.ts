import { useDispatch } from 'react-redux';
import { closeMoreOptions } from '../../../../redux/slides/modalSlice';

const dispatch = useDispatch();
const handleReport = async () => {
  dispatch(closeMoreOptions());
};

export default handleReport;
