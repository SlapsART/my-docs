import React, { useState } from 'react';

type ControlOption = {
  label: string;
  value: string;
};

type Control = {
  label: string;
  name: string;
  options: ControlOption[];
};

type ComponentPreviewProps = {
  controls: Control[];
  generateComponent: (props: Record<string, string>) => React.ReactNode;
  generateCode: (props: Record<string, string>) => string;
};

export default function ComponentPreview({
  controls,
  generateComponent,
  generateCode,
}: ComponentPreviewProps) {
  const initialProps = controls.reduce((acc, control) => {
    acc[control.name] = control.options[0].value;
    return acc;
  }, {} as Record<string, string>);

  const [props, setProps] = useState(initialProps);

  const handleChange = (controlName: string, value: string) => {
    setProps((prevProps) => ({
      ...prevProps,
      [controlName]: value,
    }));
  };

  return (
    <div style={{ border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px' }}>
      <div style={{ marginBottom: '1rem' }}>
        {controls.map((control) => (
          <div key={control.name} style={{ marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold' }}>{control.label}:</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              {control.options.map((option) => (
                <label key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name={control.name}
                    value={option.value}
                    checked={props[control.name] === option.value}
                    onChange={() => handleChange(control.name, option.value)}
                  />
                  <span style={{ marginLeft: '0.25rem' }}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {generateComponent(props)}
      </div>

      <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
        <code>{generateCode(props)}</code>
      </pre>
    </div>
  );
}