'use client';

import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react';

type SubmissionStatusProps = {
  statusLabel?: string;
  lastSubmitted?: string;
  totalVersions?: number | string;
};

const SubmissionStatus = ({
  statusLabel = 'Submitted',
  lastSubmitted = 'Aug 29, 2025',
  totalVersions = 2,
}: SubmissionStatusProps) => {
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
            bg="#FFD3B7"
            color="#FF7926"
            borderRadius="full"
            px={3}
            py={1}
            fontWeight={400}
            fontSize="sm"
          >
            {statusLabel}
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
