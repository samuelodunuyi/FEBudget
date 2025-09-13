import {
  Select as ChakraSelect,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

import type { SelectProps } from '~/lib/interfaces/ui.interface';

const Select2 = ({
  name,
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
  width = 'full',
  onChange,
  ...rest
}: SelectProps) => {
  // Handle onChange events to pass the selected value to the parent component
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <FormControl w="full" m={0}>
      {label && (
        <FormLabel color="headText.100" fontWeight={400} fontSize={12} mb={1}>
          {label}
        </FormLabel>
      )}

      <ChakraSelect
        placeholder={placeholder}
        icon={<MdArrowDropDown />}
        bg={bg}
        borderRadius={borderRadius}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        errorBorderColor="red.500"
        focusBorderColor="brand.100"
        borderColor={borderColor}
        px={px}
        py={py}
        size={size}
        borderWidth={borderWidth}
        width={width}
        onChange={handleChange}
        variant="filled"
        // h="40px"
        {...rest}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select2;
