import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import { Platform, SafeAreaView } from '../../native';
import { useTheme } from '../../../hooks';
import { FlexContainer } from '..';
import TransitionWrapper from '../../../../TransitionWrapper';

export default function MasonrySkeleton({ showHeader = true }: { showHeader: boolean }) {
    const theme  = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);
    const { BackgroundMain } = useTheme();

    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    const columns = 2;

    const items = Array.from({ length: 20 }).map((_, index) => ({
        id: index,
        height: index % 2 === 0 ? 200 : 300,
    }));

    const distributeItems = (columns: number, items: any[]) => {
        const distributed = Array.from({ length: columns }, () => []);
        items.forEach((item, index) => {
            distributed[index % columns].push(item);
        });
        return distributed;
    };

    const distributedItems = distributeItems(columns, items);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: BackgroundMain }]}>
           <TransitionWrapper isVisible={isVisible}>
                {
                  showHeader && (
                    <View style={styles.header}>
                    <Skeleton
                      width={responsiveFontSize(60)}
                      height={responsiveFontSize(26)}
                      radius={responsiveFontSize(6)}
                      colorMode={theme === 'dark' ? 'dark' : 'light'}

                    />
                    <Skeleton
                      width={responsiveFontSize(140)}
                      height={responsiveFontSize(26)}
                      radius={responsiveFontSize(6)}
                      colorMode={theme === 'dark' ? 'dark' : 'light'}

                    />
                   <FlexContainer variant='row' newStyle={{ gap: 12, alignItems: "center" }}>
                       <Skeleton
                          width={responsiveFontSize(40)}
                          height={responsiveFontSize(26)}
                          radius={responsiveFontSize(6)}
                          colorMode={theme === 'dark' ? 'dark' : 'light'}

                        />
                        <Skeleton
                          width={responsiveFontSize(40)}
                          height={responsiveFontSize(26)}
                          radius={responsiveFontSize(6)}
                          colorMode={theme === 'dark' ? 'dark' : 'light'}
                
                        />
                   </FlexContainer>
                </View>
                  )
                }

                <View style={styles.boxes}>
                  {distributedItems.map((columnItems, colIndex) => (
                    <View style={styles.column} key={colIndex}>
                      {columnItems.map((item: any) => (
                        <View key={item.id} style={[styles.box, { height: item.height }]}>
                          <Skeleton 
                          colorMode={theme === 'dark' ? 'dark' : 'light'} 
                          width="100%" 
                          height={item.height} 
                   />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
           </TransitionWrapper>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Platform.OS === 'ios' ? SIZES.gapLarge : SIZES.gapSmall,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        gap: SIZES.gapLarge,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        gap: SIZES.gapLarge,
        paddingBottom: SIZES.gapLarge,
        justifyContent: "space-between",
        paddingHorizontal: SIZES.gapLarge
    },
    boxes: {
        flexDirection: "row",
        gap: SIZES.gapLarge,
        paddingHorizontal: SIZES.gapLarge,
    },
    box: {
        width: "100%",
        borderRadius: SIZES.radius,
    },
});