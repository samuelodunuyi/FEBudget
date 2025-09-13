'use client';

import { Card, CardBody, Text, Stack, HStack } from '@chakra-ui/react';

import { formatCardValue } from '~/lib/utils/formatter';

interface DashboardCard2Props {
  description: string;
  value?: string;
  bg?: string;
}

const StatCard2 = ({ description, value, bg }: DashboardCard2Props) => {
  return (
    <Card
      variant="filled"
      bg={bg || 'brand.100'}
      border="1px solid #EDEDED"
      rounded="14px"
      _hover={{
        transform: 'translateY(-4px)',
        transition: 'all 0.4s ease-in-out',
      }}
    >
      <CardBody p={4}>
        <Stack direction="column" justifyContent="space-between" h="100%">
          <HStack justifyContent="space-between" w="100%">
            <Text fontSize={['xl', 'xl']} color="white" fontWeight="600">
              {formatCardValue(Number(value))}
            </Text>
          </HStack>

          <Text fontSize={['14px', '14px']} color="white" fontWeight="400">
            {description}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default StatCard2;
