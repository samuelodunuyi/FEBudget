import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  InputGroup,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState, useEffect } from 'react';

interface TextAreaProps {
  name?: string;
  placeholder?: string;
  label?: string;
  bg?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  px?: number;
  py?: number;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minHeight?: string;
  maxHeight?: string;
  debounceMs?: number;
}

const DebouncedTextArea = ({
  name = 'textarea',
  placeholder,
  label,
  bg = 'white',
  borderRadius = 8,
  borderWidth = 1,
  borderColor = '#EDEDED',
  fontSize = 12,
  fontWeight = 400,
  color = '#333333',
  px,
  py,
  size = 'lg',
  rows = 4,
  resize = 'vertical',
  minHeight,
  maxHeight,
  debounceMs = 300,
}: TextAreaProps) => {
  const [field, meta, helpers] = useField(name);
  const [localValue, setLocalValue] = useState(field.value || '');

  // Update local value when field value changes externally
  useEffect(() => {
    setLocalValue(field.value || '');
  }, [field.value]);

  // Debounced update to Formik
  useEffect(() => {
    if (localValue !== field.value) {
      const timeoutId = setTimeout(() => {
        helpers.setValue(localValue);
      }, debounceMs);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [localValue, field.value, helpers, debounceMs]);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel color="headText.100" fontWeight={400} fontSize={12} mb={1}>
        {label}
      </FormLabel>
      <InputGroup>
        <ChakraTextarea
          {...field}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={field.onBlur}
          size={size}
          placeholder={placeholder}
          bg={bg}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={borderColor}
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          px={px}
          py={py}
          rows={rows}
          resize={resize}
          minHeight={minHeight}
          maxHeight={maxHeight}
          isInvalid={meta.touched && !!meta.error}
          errorBorderColor="red.500"
          focusBorderColor="brand.100"
        />
      </InputGroup>

      <FormErrorMessage color="red.500" fontWeight={400} fontSize={12} mt={1}>
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default DebouncedTextArea;
