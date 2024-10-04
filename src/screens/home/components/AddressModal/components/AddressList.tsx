import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import AddressItem from './AddressItem';

type AddressListProps = {
    data: Array<{
        apartment: string;
        city: string;
        details: string;
        id: number;
        latitude: string;
        locationID: string;
        longitude: string;
        selected: boolean;
        tag: string;
        userID: string;
        userLocationID: string;
    }>;
};

const AddressList = ({ data }: AddressListProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const selectedAddress = data.find(item => item.selected);
        if (selectedAddress) {
            setSelectedId(selectedAddress.id);
        }
    }, [data]);

    const handleSelect = useCallback((id: number) => {
        setSelectedId(id);
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <AddressItem
                    address={{ ...item, selected: item.id === selectedId }}
                    onSelect={() => handleSelect(item.id)}
                />
            )}
        />
    );
};

export default AddressList;