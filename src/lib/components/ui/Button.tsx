import { Button as ChakraButton } from '@chakra-ui/react';

import type { ButtonType } from '~/lib/interfaces/ui.interface';

const Button = (props: ButtonType) => {
  const {
    text: textProp,
    icon,
    iconPosition,
    size = 'md',
    variant = 'solid',
    isDisabled,
    isLoading,
    onClick,
    fontSize = '14px',
    fontWeight = 600,
    color: text = variant === 'solid' ? 'white' : 'brand.100',
    bg = variant === 'solid' ? 'brand.100' : 'white',
    border = 'brand.100',
    type = 'submit',
    borderRadius = 10,
    width = 'fit-content',
    px = '6',
    py,
  } = props;

  return (
    <ChakraButton
      size={size}
      variant={variant}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      color={text}
      bg={bg}
      leftIcon={icon && iconPosition === 'left' && icon}
      rightIcon={icon && iconPosition === 'right' && icon}
      borderWidth={variant === 'outline' ? '1px' : '0px'}
      borderColor={border}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily="body"
      type={type}
      width={width}
      px={px}
      py={py}
    >
      {textProp}
    </ChakraButton>
  );
};

export default Button;
