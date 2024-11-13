import React from 'react';
import Comments from '../explorar/comments';
import MoreOptions from '../explorar/MoreOptions';
import AddressModal from '../home/components/AddressModal';
import { TrackingInf } from '../Order/Tracking/components';
import Onboarding from '../Onboarding';
import Upload from '../MyProfile/Upload';
import MoreOptionsProfile from '../UserProfile/MoreOptions';
import AboutAccount from '../UserProfile/AboutAccount';
import Locations from '../Permiss/Locations';
import AlbumsPermission from '../Permiss/Locations/Albums/AlbumsPermission';
import Signup from '../auth/Signup';
interface ModalContentProps {
  modalType: number;
  data: any;
  handleFocusInput: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  modalType,
  data,
  handleFocusInput,
}) => {
  switch (modalType) {
    case 0:
      return <Comments postID={data} onFocusInput={handleFocusInput} />;
    case 1:
      return <MoreOptions postID={data} />;
    case 2:
      return <AddressModal />;
    case 3:
      return <TrackingInf />;
    case 4:
      return <Onboarding />;
    case 5:
      return <Upload />;
    case 6:
      return <MoreOptionsProfile />;
    case 7:
      return <AboutAccount />;
    case 8:
      return <Locations />;
    case 9:
      return <AlbumsPermission />;
    case 10:
      return <Signup />;
    default:
      return <></>;
  }
};

export default ModalContent;
