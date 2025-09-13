import { Stack, HStack, Button, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type DashboardHeaderProps = {
  children?: ReactNode;
  onBack?: () => void;
};

const HeaderBack = ({ children, onBack }: DashboardHeaderProps) => {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  return (
    <HStack
      justify="space-between"
      mt={5}
      mb={5}
      w="100%"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'flex-start', md: 'center' }}
    >
      <Button
        leftIcon={<Image src="/images/back.svg" alt="back" />}
        bg="#EDEDED"
        borderWidth={1}
        borderColor="white"
        borderRadius="10px"
        size="md"
        color="headText.100"
        fontSize="14px"
        fontWeight={400}
        px={8}
        _hover={{
          bg: '#EDEDED',
          transition: 'all 0.2s ease-in-out',
        }}
        onClick={handleBack}
      >
        Back
      </Button>

      <Stack
        direction="row"
        spacing={2}
        align="center"
        justifyContent="flex-end"
        w={{ base: '100%', md: '50%', lg: '40%' }}
      >
        {children}
      </Stack>
    </HStack>
  );
};

export default HeaderBack;
