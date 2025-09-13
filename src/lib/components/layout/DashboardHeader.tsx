import { Text, Stack, HStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type DashboardHeaderProps = {
  title: string;
  children?: ReactNode;
};

const DashboardHeader = ({ title, children }: DashboardHeaderProps) => {
  return (
    <HStack
      justify="space-between"
      w="100%"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'flex-start', md: 'center' }}
    >
      <Stack direction="column" spacing={2} w={['full', 'auto']}>
        <Text
          color="headText.100"
          fontSize={['lg', 'xl']}
          fontWeight="500"
          textTransform="capitalize"
        >
          {title}
        </Text>
      </Stack>

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

export default DashboardHeader;
