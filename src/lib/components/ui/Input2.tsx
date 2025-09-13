/* eslint-disable no-nested-ternary */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';

import type { InputProps } from '~/lib/interfaces/ui.interface';

const Input2 = ({
  type,
  name,
  placeholder,
  label,
  bg = 'white',
  borderRadius = 8,
  borderWidth = 1,
  borderColor = '#EDEDED',
  fontSize = 14,
  fontWeight = 400,
  color = 'black',
  px,
  py,
  size = 'lg',
  leftIcon,
  rightIcon,
  leftIcon2,
  rightIcon2,
  isDisabled,
  isReadOnly,
  onChange,
  value,
}: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl>
      <FormLabel color="headText.100" fontWeight={400} fontSize={14} mb={1}>
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
          name={name}
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
          errorBorderColor="red.500"
          focusBorderColor="brand.100"
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          onChange={onChange}
          value={value}
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
    </FormControl>
  );
};

export default Input2;
