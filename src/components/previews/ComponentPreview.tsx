import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CodeIcon from '@mui/icons-material/Code';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';

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

// Resalta solo las propiedades (propiedades = color amarillo)
function highlightProps(code: string) {
  code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return code.replace(
    /(\s)([a-zA-Z0-9_]+)(=)/g,
    (_, space, prop, eq) =>
      `${space}<span style="color:#e2b93d;font-weight:500">${prop}</span>${eq}`
  );
}

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
  const [showCode, setShowCode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Cambia el handler para que RadioGroup tenga un name único y no se comparta entre controles
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProps((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const highlightedCode = useMemo(
    () => highlightProps(generateCode(props)),
    [generateCode, props]
  );

  // Copiar código al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode(props));
    setSnackbarOpen(true);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '24px',
        border: '1px solid #e0e0e0',
        p: 0,
        overflow: 'hidden', // Cambia a 'hidden' para ocultar desbordes
        minHeight: 480,
        position: 'relative',
        height: 'auto',
        transition: 'height 0.2s',
        bgcolor: '#fff',
      }}
    >
      {/* Bloque principal: preview y controles */}
      <Box display="flex" flexDirection="row" alignItems="stretch">
        {/* Preview a la izquierda */}
        <Box
          flex={1}
          minHeight={480}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ background: '#fff', position: 'relative', p: 0 }}
        >
          <Box display="flex" flex={1} alignItems="center" justifyContent="center" width="100%">
            {generateComponent(props)}
          </Box>
        </Box>
        {/* Controles a la derecha */}
        {showControls && (
          <Box
            sx={{
              minWidth: 260,
              maxWidth: 320,
              width: 280,
              borderLeft: '1px solid #e0e0e0',
              bgcolor: '#fff',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              borderTopRightRadius: '24px',
              borderBottomRightRadius: '24px',
              position: 'relative',
              height: 480,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {/* Botón para ocultar controles */}
            <Tooltip title="Ocultar controles">
              <IconButton
                size="small"
                onClick={() => setShowControls(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: '#0046AD',
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box sx={{ flex: 1, overflowY: 'auto', paddingLeft: 2 }}>
              {controls.map((control) => (
                <FormControl key={control.name} component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel
                    component="legend"
                    sx={{
                      fontWeight: 700,
                      color: '#0046AD',
                      fontSize: '1rem',
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {control.label}
                  </FormLabel>
                  <RadioGroup
                    name={control.name}
                    value={props[control.name]}
                    onChange={handleChange}
                  >
                    {control.options.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                          <Radio
                            color="primary"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              '& .MuiSvgIcon-root': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'top',
                                margin: 0,
                                overflow: 'hidden'
                              },
                            }}
                          />
                        }
                        label={option.label}
                        sx={{
                          mb: 0,
                          '.MuiFormControlLabel-label': { fontWeight: 400, fontSize: '1rem' },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ))}
            </Box>
          </Box>
        )}
        {/* Botón para mostrar controles si están ocultos */}
        {!showControls && (
          <Box
            sx={{
              minWidth: 0,
              maxWidth: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              pr: 1,
              pt: 1,
              bgcolor: '#23284a',
            }}
          >
            <Tooltip title="Mostrar controles">
              <IconButton
                size="small"
                onClick={() => setShowControls(true)}
                sx={{
                  color: '#0046AD',
                  bgcolor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  boxShadow: 1,
                  ml: 1,
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
              >
                <TuneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      {/* Bloque de código debajo del bloque principal */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          mt: 0, // Quita el margin top para evitar franja blanca
          mb: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            bgcolor: '#23284a', // Cambia el fondo del bloque principal de código
            borderRadius: '12px',
            boxShadow: '0 2px 8px 0 #0002',
            border: 'none',
            overflow: 'hidden',
            alignSelf: 'stretch',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              bgcolor: '#23284a',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              px: 1,
              py: 1,
              justifyContent: 'space-between',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setShowCode((v) => !v)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  //height: 20,
                  borderRadius: '50%',
                  bgcolor: '#23284a',
                  //border: '1.5px solid #3b4261',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  //mr: 1,
                }}
              >
                <CodeIcon fontSize="small" sx={{ color: '#7dc4fa', fontSize: 18 }} />
              </Box>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', letterSpacing: 0.2 }}>
                Código
              </span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={showCode ? "Ocultar código" : "Mostrar código"}>
                <IconButton
                  size="small"
                  onClick={e => { e.stopPropagation(); setShowCode((v) => !v); }}
                  sx={{
                    color: '#fff',
                    bgcolor: 'transparent',
                    //ml: 1,
                    '&:hover': { bgcolor: '#23272b' },
                  }}
                >
                  {showCode ? <CloseIcon fontSize="small" /> : <CodeIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          {showCode && (
            <Box
              sx={{
                bgcolor: '#23284a', // Cambia el fondo del bloque expandido de código
                color: '#fff',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                p: 0,
                minWidth: 220,
                fontSize: '0.95rem',
                width: '100%',
                maxWidth: '100%',
                maxHeight: 320,
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              <Tooltip title="Copiar código">
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    color: '#e2b93d',
                    bgcolor: 'transparent',
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 2,
                    '&:hover': { bgcolor: '#23272b' },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <pre
                style={{
                  margin: 0,
                  background: 'none',
                  //padding: '18px 20px',
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  overflowX: 'auto'
                }}
              >
                <code
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
            </Box>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Código copiado en el portapapeles"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Paper>
  );
}