import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SIZES } from '../../../../../constants/theme';
import { LabelContainer, Typography } from '../../../../../components/custom';


type Props = {
    bio: string | undefined;
}

const Bio = (props: Props) => {
    const { bio } = props;
    const [expand, setExpand] = useState(false)
    return (
   <LabelContainer label='Bio'>
         <TouchableOpacity
        onPress={() => setExpand(!expand)}>
            <Typography
                numberOfLines={expand ? undefined : 3}
                variant='SubDescription'>{bio} 
            </Typography>

        </TouchableOpacity>
   </LabelContainer>
    )
}

export default Bio