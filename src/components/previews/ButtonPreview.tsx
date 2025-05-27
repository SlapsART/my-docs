// src/components/ButtonPreview.tsx
import React from 'react';
import Button from '@mui/material/Button';
import ThemeWrapper from '../ThemeWrapper';

function Buttons() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button color="secondary" variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  );
}

export default function ButtonPreview() {
  return (
    <ThemeWrapper mode="light">
      <Buttons />
    </ThemeWrapper>
  );
}