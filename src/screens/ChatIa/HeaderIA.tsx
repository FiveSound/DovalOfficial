import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
  userName: string;
  avatarUrl: string;
}

const HeaderIA: React.FC<HeaderProps> = ({ userName, avatarUrl }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.greetingText}>Good morning, {userName}</Text>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
});

export default HeaderIA;