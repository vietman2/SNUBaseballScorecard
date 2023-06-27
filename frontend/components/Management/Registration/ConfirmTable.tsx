import { View } from 'react-native';

import { RegistrationType } from '../../../variables/types';
import { tableStyles } from './styles';

interface Props {
    summary: RegistrationType;
}

export default function ConfirmTable({ summary }: Props) {
    return (
        <View style={tableStyles.container}>
            
        </View>
    )
}