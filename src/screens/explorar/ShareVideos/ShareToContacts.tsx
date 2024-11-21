import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlexContainer, LineDivider, Typography } from '../../../components';
import { SIZES } from '../../../constants';
import { COLORS, responsiveFontSize } from '../../../constants/theme';
import Avatars from '../../../components/Avatars';
import { CheckmarkCircle01Icon } from '../../../constants/IconsPro';

interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
}

type Props = {
  contacts: Contact[];
  selectedContactIds: string[];
  onShare: (contactId: string) => void;
};

const ShareToContacts = (props: Props) => {
  return (
    <>
      <FlexContainer newStyle={styles.container}>
        <Typography variant="H4title">Enviar a</Typography>

        <FlatList
          data={props.contacts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={`item-${item.id}-${index}`}
              onPress={() => props.onShare(item.id)}
              style={styles.contactItem}
            >
              <Avatars source={item.avatarUrl} size="medium" />
              <Typography
                variant="SubDescription"
                numberOfLines={2}
                newStyle={styles.TextName}
              >
                {item.name}
              </Typography>
              {props.selectedContactIds.includes(item.id) && (
                <View style={styles.checkmarkContainer}>
                  <CheckmarkCircle01Icon color={COLORS.primary} />
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </FlexContainer>
      <LineDivider />
    </>
  );
};

export default ShareToContacts;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveFontSize(20),
    width: SIZES.width,
  },
  contactItem: {
    // marginRight: responsiveFontSize(15),
    alignItems: 'center',
    marginTop: SIZES.gapSmall / 2,
  },
  TextName: {
    width: SIZES.width / 5,
    textAlign: 'center',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: responsiveFontSize(5),
    right: responsiveFontSize(5),
  },
  checkmark: {
    width: responsiveFontSize(20),
    height: responsiveFontSize(20),
  },
});
