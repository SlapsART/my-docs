import React, { useState } from 'react';
import { MenuItem, Select, ThemeProvider, FormControl, InputLabel } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import ComponentPreview from './ComponentPreview';
import { createCustomTheme } from '../../theme/customTheme';

const controls = [
  {
    label: 'Color',
    name: 'color',
    options: [
      { label: 'Primario', value: 'primary' },
      { label: 'Secundario', value: 'secondary' },
    ],
  },
  {
    label: 'Tamaño',
    name: 'size',
    options: [
      { label: 'Medio', value: 'medium' },
      { label: 'Pequeño', value: 'small' },
    ],
  },
  {
    label: 'Valor',
    name: 'value',
    options: [
      { label: 'Opción 1', value: 'opcion1' },
      { label: 'Opción 2', value: 'opcion2' },
      { label: 'Opción 3', value: 'opcion3' },
    ],
  },
];

export default function SelectPreview() {
  const prefersDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  const mode = prefersDark ? 'dark' : 'light';
  const theme = createCustomTheme(mode);

  // Estado local para el valor seleccionado
  const [value, setValue] = useState('opcion1');

  return (
    <ComponentPreview
      controls={controls}
      generateComponent={(props) => {
        // Si el control "value" está definido, el select es controlado por los props (desde los controles)
        // Si no, es controlado localmente por el usuario
        const isControlled = props.value !== undefined;
        const handleChange = (event: SelectChangeEvent, child?: React.ReactNode) => {
          if (!isControlled) setValue(event.target.value as string);
        };
        const currentValue = isControlled ? props.value : value;
        return (
          <ThemeProvider theme={theme}>
            <FormControl size={props.size as 'small' | 'medium'}>
              <InputLabel id="select-label" color={props.color as 'primary' | 'secondary'}>
                Selecciona una opción
              </InputLabel>
              <Select
                labelId="select-label"
                value={currentValue}
                label="Selecciona una opción"
                color={props.color as 'primary' | 'secondary'}
                size={props.size as 'small' | 'medium'}
                onChange={handleChange}
              >
                <MenuItem value="opcion1">Opción 1</MenuItem>
                <MenuItem value="opcion2">Opción 2</MenuItem>
                <MenuItem value="opcion3">Opción 3</MenuItem>
              </Select>
            </FormControl>
          </ThemeProvider>
        );
      }}
      generateCode={(props) =>
        `<FormControl size="${props.size}">
  <InputLabel color="${props.color}">Selecciona una opción</InputLabel>
  <Select
    value="${props.value}"
    label="Selecciona una opción"
    color="${props.color}"
    size="${props.size}"
    onChange={...}
  >
    <MenuItem value="opcion1">Opción 1</MenuItem>
    <MenuItem value="opcion2">Opción 2</MenuItem>
    <MenuItem value="opcion3">Opción 3</MenuItem>
  </Select>
</FormControl>`
      }
    />
  );
}