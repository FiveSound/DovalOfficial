import React from 'react';

type TransitionWrapperProps = {
    isVisible: boolean;
    children: React.ReactNode;
};

export default function TransitionWrapper({ isVisible, children }: TransitionWrapperProps) {

    return (
        <>
            {children}
        </>
    );
}
