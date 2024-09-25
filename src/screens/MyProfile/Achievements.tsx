import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Award, { AwardLevel } from '../../components/Award';
import { FlexContainer, Typography } from '../../components';
import { icons, SIZES } from '../../constants';
import { responsiveFontSize } from '../../constants/theme';


type AchievementsProps = {
    currentId: string;
};

const Achievements = ({ currentId = '1' }: AchievementsProps) => {
    const awardsData: { id: string; level: AwardLevel; emoji: any; description: string }[] = [
        { id: '1', level: 'Bronze', emoji: icons.Bronze, description: 'Bronze' },
        { id: '2', level: 'Silver', emoji: icons.Sliver, description: 'Silver' },
        { id: '3', level: 'Gold', emoji: icons.Golder, description: 'Gold' },
        { id: '4', level: 'Ruby', emoji: icons.Ruby, description: 'Ruby' },
        { id: '5', level: 'Platinum', emoji: icons.Platinum, description: 'Platinum' },
        { id: '6', level: 'Diamond', emoji: icons.Diamond, description: 'Diamond' },
    ];

    const currentItem = awardsData.find(item => item.id === currentId);

    return (
        <FlexContainer 
        newStyle={{
            height: responsiveFontSize(74),
            backgroundColor: 'transparent',
            width: SIZES.width
        }}>
            {currentItem && (
                    <Award
                        level={currentItem.level}
                        emoji={currentItem.emoji}
                        description={currentItem.description}
                    />
            )}
        </FlexContainer>
    );
};

export default Achievements;