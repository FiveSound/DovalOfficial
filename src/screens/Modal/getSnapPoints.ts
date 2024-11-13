export const getSnapPoints = (
  modalType: number,
  isAuthenticated: boolean,
): string[] => {
  const snapPoints = ['80%', '90%', '70%', '60%'];
  const snapPointsMoreOptions = !isAuthenticated
    ? ['30%', '60%', '90%']
    : ['30%'];
  const snapPointsAddress = ['50%', '70%', '94%'];
  const snapPointsPin = ['43%', '30%', '60%'];
  const snapPointsOnboarding = ['100%'];
  const snapPointsUpload = ['44%', '80%'];
  const snapPointsMoreOptionsProfile = ['40%', '60%'];
  const snapPointsAboutAccount = ['40%', '60%'];
  const snapPointsLocation = ['100%'];
  const snapPointsAlbumsPermission = ['100%'];
  const snapPointsSignupAlert = ['80%'];
  
  switch (modalType) {
    case 0:
      return snapPoints;
    case 1:
      return snapPointsMoreOptions;
    case 2:
      return snapPointsAddress;
    case 3:
      return snapPointsPin;
    case 4:
      return snapPointsOnboarding;
    case 5:
      return snapPointsUpload;
    case 6:
      return snapPointsMoreOptionsProfile;
    case 7:
      return snapPointsAboutAccount;
    case 8:
      return snapPointsLocation;
    case 9:
      return snapPointsAlbumsPermission;
    case 10:
      return snapPointsSignupAlert;
    default:
      return snapPoints;
  }
};
