import {
  Select as ChakraSelect,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { MdArrowDropDown } from 'react-icons/md';

import type { SelectProps } from '~/lib/interfaces/ui.interface';

const Select = ({
  name = '',
  label,
  placeholder,
  options,
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
  isDisabled,
  onChange,
  ...rest
}: SelectProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel
            color="headText.100"
            fontWeight={400}
            fontSize={fontSize}
            mb={1}
          >
            {label}
          </FormLabel>

          <ChakraSelect
            {...field}
            placeholder={placeholder}
            icon={<MdArrowDropDown />}
            bg={bg}
            borderRadius={borderRadius}
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            isInvalid={form.errors[name] && form.touched[name]}
            errorBorderColor="red.500"
            focusBorderColor="brand.100"
            borderColor={borderColor}
            px={px}
            py={py}
            size={size}
            borderWidth={borderWidth}
            isDisabled={isDisabled}
            onChange={(e) => {
              field.onChange(e); // Update Formik field
              if (onChange) {
                onChange(e.target.value); // Call custom onChange if provided
              }
            }}
            {...rest}
          >
            {options?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </ChakraSelect>

          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default Select;
