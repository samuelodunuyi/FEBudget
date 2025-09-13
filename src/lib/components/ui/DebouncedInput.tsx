import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useState, useEffect } from 'react';

import type { InputProps } from '~/lib/interfaces/ui.interface';

const DebouncedInput = ({
  type,
  name = 'input',
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
  leftIcon,
  rightIcon,
  leftIcon2,
  rightIcon2,
  debounceMs = 300,
  isReadOnly,
}: InputProps & { debounceMs?: number }) => {
  const [field, meta, helpers] = useField(name);
  const [show, setShow] = useState<boolean>(false);
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

  const handleClick = () => setShow(!show);

  const getInputType = () => {
    if (type === 'password') {
      return show ? 'text' : 'password';
    }
    return type;
  };

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel color="headText.100" fontWeight={400} fontSize={12} mb={1}>
        {label}
      </FormLabel>
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none" position="absolute" top="5px">
            <Image src={leftIcon} alt={label} boxSize="22px" />
          </InputLeftElement>
        )}
        {leftIcon2 && (
          <InputLeftElement pointerEvents="none" position="absolute" top="5px">
            {leftIcon2}
          </InputLeftElement>
        )}
        <ChakraInput
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
          isInvalid={meta.touched && !!meta.error}
          errorBorderColor="red.500"
          focusBorderColor="brand.100"
          type={getInputType()}
          isReadOnly={isReadOnly}
        />

        {type === 'password' && (
          <InputRightElement position="absolute" top="5px">
            <IconButton
              aria-label={show ? 'Hide' : 'Show'}
              variant="ghost"
              colorScheme="primary"
              size="sm"
              onClick={handleClick}
              icon={
                show ? (
                  <ViewOffIcon color="brand.100" fontSize={16} />
                ) : (
                  <ViewIcon color="brand.100" fontSize={16} />
                )
              }
            />
          </InputRightElement>
        )}

        {rightIcon && (
          <InputRightElement pointerEvents="none" position="absolute" top="5px">
            <Image src={rightIcon} alt={label} boxSize="22px" />
          </InputRightElement>
        )}
        {rightIcon2 && (
          <InputRightElement pointerEvents="none" position="absolute" top="5px">
            {rightIcon2}
          </InputRightElement>
        )}
      </InputGroup>

      <FormErrorMessage color="red.500" fontWeight={400} fontSize={12} mt={1}>
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default DebouncedInput;
