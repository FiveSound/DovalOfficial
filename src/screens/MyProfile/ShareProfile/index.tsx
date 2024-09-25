// import React from "react";
// import { Modals, TextButton } from "../../../components";
// // import QRCode from "react-native-qrcode-svg";
// import { FlexContainer, Typography } from "../../../components";
// import { COLORS, SIZES } from "../../../constants";

// type Props = {
//   visible: boolean;
//   onPressClose: () => void;
//   onRequestClose: () => void;
//   headerLabel: string;
//   profileUrl: string;
// };

// const ShareProfile = (props: Props) => {
//   const { visible, onPressClose, onRequestClose, headerLabel, profileUrl } = props;
//   return (
//     <Modals
//       visible={visible}
//       onPressClose={onPressClose}
//       onRequestClose={onRequestClose}
//       headerLabel={headerLabel}
//     >
//       <FlexContainer
//         newStyle={{ alignItems: "center", justifyContent: "center", backgroundColor: 'transparent',
//     flex: 1}}
//       >
//         {/* <QRCode value={profileUrl} size={200} /> */}
//               <Typography
//                   numberOfLines={1}
//                   newStyle={{
//                       width: SIZES.width / 1.2
//                   }}
//                   variant='H4title'>
//                   Escanea este código para compartir el perfil
//               </Typography>
//         <TextButton 
//       label="Copar enlace"
//       labelStyle={{
//         color: COLORS.dark
//       }}
//       sizeVariant='full'
//       colorVariant='primary'
//       onPress={() => console.log('Copiar enlace')}
//       />
//       </FlexContainer>
   
//     </Modals>
//   );
// };

// export default ShareProfile;
