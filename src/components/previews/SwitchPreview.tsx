import React, { useState } from 'react';
import { Switch, FormControlLabel, ThemeProvider } from '@mui/material';
import ComponentPreview from './ComponentPreview';
import { createCustomTheme } from '../../theme/customTheme';

const controls = [
	{
		label: 'Color',
		name: 'color',
		options: [
			{ label: 'Primario', value: 'primary' },
			{ label: 'Secundario', value: 'secondary' },
			{ label: 'Default', value: 'default' },
		],
	},
	{
		label: 'Disabled',
		name: 'disabled',
		options: [
			{ label: 'No', value: 'false' },
			{ label: 'Sí', value: 'true' },
		],
	},
];

export default function SwitchPreview() {
	const prefersDark =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-color-scheme: dark)').matches
			: false;
	const mode = prefersDark ? 'dark' : 'light';
	const theme = createCustomTheme(mode);

	const [checked, setChecked] = useState(true);

	return (
		<ComponentPreview
			controls={controls}
			generateComponent={(props) => (
				<ThemeProvider theme={theme}>
					<FormControlLabel
						control={
							<Switch
								color={props.color as 'primary' | 'secondary' | 'default'}
								checked={checked}
								disabled={props.disabled === 'true'}
								onChange={(_, value) => setChecked(value)}
							/>
						}
						label={checked ? 'Activado' : 'Desactivado'}
					/>
				</ThemeProvider>
			)}
			generateCode={(props) =>
				`<FormControlLabel
  control={
    <Switch
      color="${props.color}"
      checked={/* estado controlado por el usuario */} 
	  disabled={${props.disabled} === "true"}
      onChange={...}
    />
  }
  label={/* Activado o Desactivado */}
/>`
			}
		/>
	);
}