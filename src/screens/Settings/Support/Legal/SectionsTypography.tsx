import { FlexContainer, Typography } from "@/src/components/custom";
import { SIZES } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const SectionsTypography = ({ label, description }: { label: string, description: string }) => {
    return (
        <FlexContainer newStyle={styles.container}>
            <Typography variant='title'>
                {label}
            </Typography>
            <Typography variant='description'>
                {description}
            </Typography>
        </FlexContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: SIZES.gapMedium,
        paddingHorizontal: SIZES.gapLarge
    },
});
