import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

type TransitionWrapperProps = {
    isVisible: boolean;
    children: React.ReactNode;
};

export default function TransitionWrapper({ isVisible, children }: TransitionWrapperProps) {
    useEffect(() => {
        console.log(`TransitionWrapper: isVisible is ${isVisible}.`);
    }, [isVisible]);

    return (
        <MotiView
            from={{
                opacity: 0,
                translateY: 50,
            }}
            animate={{
                opacity: isVisible ? 1 : 0,
                translateY: isVisible ? 0 : 500,
            }}
            transition={{
                type: 'timing',
                duration: 500,
                easing: Easing.out(Easing.ease),
            }}
            style={styles.container}
        >
            {children}
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});