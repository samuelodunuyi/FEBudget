/* eslint-disable no-nested-ternary */
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  InputGroup,
} from '@chakra-ui/react';
import { FastField } from 'formik';

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
  isDisabled?: boolean;
}

const TextArea = ({
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
  isDisabled,
}: TextAreaProps) => {
  return (
    <FastField name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel color="headText.100" fontWeight={400} fontSize={12} mb={1}>
            {label}
          </FormLabel>
          <InputGroup>
            <ChakraTextarea
              {...field}
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
              isInvalid={form.errors[name] && form.touched[name]}
              errorBorderColor="red.500"
              focusBorderColor="brand.100"
              isDisabled={isDisabled}
            />
          </InputGroup>

          <FormErrorMessage
            color="red.500"
            fontWeight={400}
            fontSize={12}
            mt={1}
          >
            {form.errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </FastField>
  );
};

export default TextArea;
