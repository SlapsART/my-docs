import React from 'react';
import { Button } from '@mui/material';
import ComponentPreview from './ComponentPreview';
import ThemeWrapper from '../ThemeWrapper';

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
  return (
    <ThemeWrapper mode="light">
      <ComponentPreview
        controls={controls}
        generateComponent={(props) => (
          <Button
            variant={props.variant}
            color={props.color as any}
            size={props.size as any}
          >
            Texto botón
          </Button>
        )}
        generateCode={(props) =>
          `<Button variant="${props.variant}" color="${props.color}" size="${props.size}">
  Texto botón
</Button>`
        }
      />
    </ThemeWrapper>
  );
}