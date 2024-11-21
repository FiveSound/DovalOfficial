import React, { useCallback, useState } from 'react';
import { Alert, ActivityIndicator, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateVariantService,
  updateSubVariantService,
  removeSubVariantService,
} from '../../../../../services/recipes';
import { TypeData, TypeVariant } from './types';
import { styles } from './styles';
import {
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from '../../../../../components/native';
import {
  Buttons,
  Checkbox,
  FlexContainer,
  IsLoading,
  LineDivider,
  Perks,
  Typography,
} from '../../../../../components/custom';
import { useTheme } from '../../../../../hooks';
import { SIZES } from '../../../../../constants/theme';
import i18next from '@/src/Translate';

const Variant = React.memo((props: TypeVariant) => {
  const {
    id,
    title,
    limit_qty,
    onPress,
    onRemove,
    subvariants,
    required,
    disabled,
  } = props;

  const [success, setSuccess] = useState(false);
  const [limitQty, setLimitQty] = useState(limit_qty ? limit_qty : 1);
  const [editRequired, setEditRequired] = useState(required);
  const { backgroundMaingrey } = useTheme();
  const [titleInput, setTitleInput] = useState(title);
  const [isSaving, setIsSaving] = useState(false);
  const [subVariantName, setSubVariantName] = useState<{ [key: number]: string }>({});
  const [subVariantPrice, setSubVariantPrice] = useState<{ [key: number]: string }>({});

  const { watch } = useFormContext();
  const values = watch();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const mutationOnsave = useMutation({
    mutationFn: updateVariantService,
    onSuccess: response => {
      setIsSaving(false);
      queryClient.setQueryData(
        ['recipe-variants-component', values.id],
        ({ variants, resume, ...rest }: TypeData) => ({
          ...rest,
          variants: variants.map(row => (row.id === response.id ? { ...row, required: response.required } : row)),
          resume: variants.map(row => (row.id === response.id ? { ...row, title: response.title } : row)),
        }),
      );
    },
    onError: () => {
      setIsSaving(false);
      Alert.alert(i18next.t('Error'), i18next.t('There was a problem saving the variant.'));
    },
  });


  const onSaveSubVariant = useCallback(async (body: object) => {
    setIsSaving(true);
    const response = await updateSubVariantService(body);
    if (response.success) {
      handleSuccess();
    } else {
      Alert.alert(i18next.t('Error'), i18next.t('There was a problem saving the subvariant.'));
    }
    setIsSaving(false);
  }, []);

  const mutationDelete = useMutation({
    mutationFn: removeSubVariantService,
    onSuccess: response => {
      queryClient.setQueryData(
        ['recipe-variants-component', values.id],
        ({ subvariants, ...rest }: TypeData) => ({
          ...rest,
          subvariants: subvariants.filter(row => row.id !== response.id),
        }),
      );
    },
    onError: () => {
      Alert.alert(i18next.t('Error'), i18next.t('There was a problem deleting the subvariant.'));
    },
  });

  const confirmDelete = (subVariantId: number) => {
    Alert.alert(
      i18next.t('Confirm Delete'),
      i18next.t('Are you sure you want to delete this subvariant?'),
      [
        { text: i18next.t('Cancel'), style: 'cancel' },
        { text: i18next.t('Delete'), style: 'destructive', onPress: () => mutationDelete.mutate(subVariantId) },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      <FlexContainer
        newStyle={[styles.variant, { backgroundColor: backgroundMaingrey }]}
      >
        {/* Botón para eliminar la variante */}
        {id && (
          <Typography
            newStyle={styles.texteDelete}
            variant="H4title"
            onPress={() => {
              Alert.alert(
                i18next.t('Confirm Delete'),
                i18next.t('Are you sure you want to delete this variant?'),
                [
                  { text: i18next.t('Cancel'), style: 'cancel' },
                  { text: i18next.t('Delete'), style: 'destructive', onPress: () => onRemove(id) },
                ],
                { cancelable: true },
              );
            }}
          >
            {i18next.t('Delete')}
          </Typography>
        )}

        <LineDivider />

        <FlexContainer newStyle={styles.variantHeader}>
          <TextInput
            placeholder={i18next.t('Add title variant')}
            onChangeText={txt => setTitleInput(txt)}
            style={styles.inputVariant}
            value={titleInput}
            onBlur={() => {
              if (titleInput.length > 3 && titleInput !== title) {
                setIsSaving(true);
                mutationOnsave.mutate({
                  id,
                  title: titleInput,
                });
              }
            }}
            returnKeyType="done"
            autoFocus
            editable={!disabled}
            accessibilityLabel="Nombre de la variante"
          />
          {isSaving && <IsLoading />}

          <FlexContainer>
          <Pressable style={styles.switch}>
              <Typography variant="H4title">{i18next.t('Required')}</Typography>
              <Checkbox
                label={editRequired ? i18next.t('Yes') : i18next.t('No')}
                checked={editRequired}
                isTouchable={true}
                onChange={() => {
                  setEditRequired(!editRequired);
                  mutationOnsave.mutate({
                    id,
                    required: !editRequired,
                  });
                }}
                containerStyle={{ width: SIZES.BtnWidth / 2 }}
                accessibilityLabel="Marcar como requerido"
              />
            </Pressable>
            {editRequired && (
              <View style={styles.limitContainer}>
                <Typography variant='subtitle'>{i18next.t('Limit')}</Typography>
                <Pressable
                  onPress={() => {
                    let newValue = limitQty + 1;
                    mutationOnsave.mutate({ id, limit_qty: newValue });
                    setLimitQty(newValue);
                  }}
                  style={styles.counterButton}
                  accessibilityLabel="Incrementar límite"
                >
                  <Typography variant='subtitle'>+</Typography>
                </Pressable>

                <TextInput
                  editable={false}
                  value={`${limitQty}`}
                  maxLength={2}
                  style={styles.limitInput}
                  keyboardType="number-pad"
                  accessibilityLabel="Cantidad límite"
                />
                <Pressable
                  onPress={() => {
                    let newValue = limitQty - 1;
                    if (newValue < 1) return;
                    mutationOnsave.mutate({ id, limit_qty: newValue });
                    setLimitQty(newValue);
                  }}
                  style={styles.counterButton}
                  accessibilityLabel="Disminuir límite"
                >
                  <Typography variant='subtitle'>-</Typography>
                </Pressable>
              </View>
            )}

            
          </FlexContainer>
        </FlexContainer>

        <LineDivider />

        {/* Lista de subvariantes */}
        {subvariants.map(row => (
          <FlexContainer key={row.id} newStyle={styles.variantSubVariant}>
            {/* Input para el nombre de la subvariante */}
            <FlexContainer newStyle={styles.variantSubVariantName}>
              <TouchableOpacity onPress={() => confirmDelete(row.id)}>
                <Typography variant="H4title" style={styles.texteDelete}>
                  {i18next.t('Delete')}
                </Typography>
              </TouchableOpacity>
              <TextInput
                placeholder={i18next.t('Example: Yucas, Papas')}
                value={subVariantName[row.id] || row.name}
                onChangeText={txt => {
                  setSubVariantName(prev => ({ ...prev, [row.id]: txt }));
                }}
                autoFocus
                style={styles.inputVariantInput}
                editable={!disabled}
                onBlur={() => {
                  if (subVariantName[row.id] && subVariantName[row.id] !== row.name) {
                    onSaveSubVariant({
                      id: row.id,
                      name: subVariantName[row.id],
                    });
                  }
                }}
              />
            </FlexContainer>

  
            <FlexContainer newStyle={styles.variantSubVariantPrice}>
              <Typography variant="H4title">$</Typography>
              <TextInput
                placeholder={i18next.t('Price')}
                value={subVariantPrice[row.id] || row.price}
                keyboardType="numeric"
                onChangeText={txt => {
                  setSubVariantPrice(prev => ({ ...prev, [row.id]: txt }));
                }}
                style={styles.inputVariantInput}
                editable={!disabled}
                onBlur={() => {
                  if (subVariantPrice[row.id] && subVariantPrice[row.id] !== row.price) {
                    onSaveSubVariant({
                      id: row.id,
                      price: subVariantPrice[row.id],
                    });
                  }
                }}
              />
            </FlexContainer>
          </FlexContainer>
        ))}

        {/* Botón para agregar más variantes */}
        <Buttons label={i18next.t('Add more variants')} onPress={onPress} />

        {/* Indicador de éxito */}
        {success && <Perks label={i18next.t('Saved successfully!')} status="success" />}
      </FlexContainer>
      {/* <LineDivider variant="secondary" lineStyle={styles.lineDivider} /> */}
    </>
  );
});

export default Variant;