import React from 'react';
import { Button, ThemeProvider } from '@mui/material';
import ComponentPreview from './ComponentPreview';
import { createCustomTheme } from '../../theme/customTheme';

const controls = [
  {
    label: 'Color',
    name: 'color',
    options: [
      { label: 'Primario', value: 'primary' },
      { label: 'Secundario', value: 'secondary' },
      { label: 'Inherit', value: 'inherit' },
    ],
  },
  {
    label: 'Variante',
    name: 'variant',
    options: [
      { label: 'Contenedor', value: 'contained' },
      { label: 'Texto', value: 'text' },
      { label: 'Borde', value: 'outlined' },
    ],
  },
  {
    label: 'Tamaño',
    name: 'size',
    options: [
      { label: 'Grande', value: 'large' },
      { label: 'Medio', value: 'medium' },
      { label: 'Pequeño', value: 'small' },
    ],
  },
];

export default function ButtonPreview() {
  // Detecta el modo actual de Starlight usando prefers-color-scheme
  const prefersDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  const mode = prefersDark ? 'dark' : 'light';
  const theme = createCustomTheme(mode);

  return (
    <ComponentPreview
      controls={controls}
      generateComponent={(props) => (
        <ThemeProvider theme={theme}>
          <Button
            variant={props.variant as 'contained' | 'text' | 'outlined'}
            color={props.color as 'primary' | 'secondary' | 'inherit'}
            size={props.size as 'small' | 'medium' | 'large'}
          >
            Texto botón
          </Button>
        </ThemeProvider>
      )}
      generateCode={(props) =>
        `<Button variant="${props.variant}" color="${props.color}" size="${props.size}">
  Texto botón
</Button>`
      }
    />
  );
}