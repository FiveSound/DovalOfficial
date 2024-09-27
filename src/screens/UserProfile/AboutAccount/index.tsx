import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatars, FlexContainer, Icons, IsLoading, Typography } from '../../../components/custom'
import { COLORS, SIZES } from '../../../constants/theme';
import { Album02Icon, ArrowDown, UserIcon, UserIconsStrike } from '../../../constants/IconsPro';
import { useAPI, useTheme } from '../../../hooks';
import { aboutService } from '../../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { CLOUDFRONT } from '../../../services';
import i18next from '../../../Translate';

const AboutAccount = () => {
    const { Description } = useTheme();
    const { data } = useSelector((state: RootState) => state.modal)

    const {
        data: row,
        isLoading,
        refetch,
        error,
    } = useAPI({
        queryKey: ["get-Followers-Services"],
        queryFn: () => aboutService(data.userID),
    });

    if (isLoading) return <IsLoading />

    if (row.success) {
        return (
            <FlexContainer newStyle={styles.containerMain}>
                <FlexContainer newStyle={styles.container}>
                    <Avatars
                        size='xLarge'
                        source={`${CLOUDFRONT}${row.userDetails.avatar}`}
                    />
                    <Typography variant='title' newStyle={styles.title}>
                       {i18next.t('About to')} {row.userDetails.name}
                    </Typography>
                    <Typography variant='SubDescription' newStyle={styles.title}>
                        {row.userDetails.transparencyDescription || i18next.t('To foster transparency and build trust, Doval displays key information about each creators account.')}</Typography>
                    <FlexContainer newStyle={styles.iconsContainer}>
                        <Icons
                            styles={styles.icon}
                            appendIcons={
                                <FlexContainer variant='row' newStyle={styles.iconsContainer}>
                                    <Album02Icon width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} color={Description} />
                                    <Typography variant='H4title' newStyle={styles.title}> {i18next.t('Based In:')}
                                        <Typography variant='SubDescription' newStyle={styles.title}> {row.userDetails.basedIn}</Typography>
                                    </Typography>
                                </FlexContainer>
                            }
                        />
                        <Icons
                            styles={styles.icon}
                            appendIcons={
                                <FlexContainer variant='row' newStyle={styles.iconsContainer}>
                                    <UserIcon width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} color={Description} />
                                    <Typography variant='H4title' newStyle={styles.title}> {i18next.t('Joined Doval:')}
                                        <Typography variant='SubDescription' newStyle={styles.title}> {row.userDetails.joinedDoval}</Typography>
                                    </Typography>
                                </FlexContainer>
                            }
                        />
                    </FlexContainer>

                </FlexContainer>
            </FlexContainer>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.gapLarge,
        alignItems: 'center',
        gap: SIZES.gapLarge,
        padding: SIZES.gapSmall
    },
    containerMain: {
        gap: SIZES.gapLarge,
        marginTop: SIZES.padding
    },
    icon: {
        backgroundColor: 'transparent'
    },
    iconsContainer: {
        width: '100%',
    },
    title: {
        color: COLORS.dark
    }
})
export default AboutAccount