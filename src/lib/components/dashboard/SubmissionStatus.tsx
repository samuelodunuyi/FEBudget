'use client';

import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react';

type BudgetFile = {
  id: string;
  documentUrl: string;
  version: number;
};

type Budget = {
  id: string;
  status: number;
  createdAt: string;
  budgetFiles: BudgetFile[];
};

type SubmissionStatusProps = {
  budgets?: Budget[];
  isLoading?: boolean;
};

const statusMap: Record<number, { label: string; bg: string; color: string }> = {
  1: { label: 'Submitted', bg: '#FFD3B7', color: '#FF7926' },
  2: { label: 'Pending Submission', bg: '#FFE9B7', color: '#FFAA26' },
  3: { label: 'Approved', bg: '#D3FFD3', color: '#27A426' },
};

const SubmissionStatus = ({ budgets = [], isLoading = false }: SubmissionStatusProps) => {
  if (isLoading) return <Text>Loading...</Text>;

  if (!budgets.length)
    return <Text>No budgets found for your department.</Text>;

  // Assuming the latest budget is the one with the latest createdAt
  const latestBudget = budgets.reduce((prev, curr) =>
    new Date(curr.createdAt) > new Date(prev.createdAt) ? curr : prev
  );

  const status = statusMap[latestBudget.status] || {
    label: 'Unknown',
    bg: '#EDEDED',
    color: '#808080',
  };

  const lastSubmitted = new Date(latestBudget.createdAt).toLocaleDateString(
    'en-GB',
    { day: 'numeric', month: 'short', year: 'numeric' }
  );

  const totalVersions = latestBudget.budgetFiles?.length || 0;

  return (
    <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
      <HStack spacing={3} mb={4} align="center">
        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          Submission Status
        </Text>
      </HStack>

      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <Text color="bodyText.400" fontSize="14px">
            Current Status:
          </Text>
          <Tag
            bg={status.bg}
            color={status.color}
            borderRadius="full"
            px={3}
            py={1}
            fontWeight={400}
            fontSize="sm"
          >
            {status.label}
          </Tag>
        </HStack>

        <HStack justify="space-between">
          <Text color="bodyText.400" fontSize="14px">
            Last Submitted:
          </Text>
          <Text color="#808080" fontSize="14px" fontWeight={400}>
            {lastSubmitted}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="bodyText.400" fontSize="14px">
            Total Versions:
          </Text>
          <Text color="headText.100" fontSize="14px" fontWeight={600}>
            {totalVersions}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SubmissionStatus;
