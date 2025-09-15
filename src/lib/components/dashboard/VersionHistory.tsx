'use client';

import {
  Box,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import Button from '~/lib/components/ui/Button';

export type BudgetFile = {
  id: string;
  documentUrl: string;
  version: number;
  createdAt?: string;
};

export type Budget = {
  id: string;
  budgetFiles?: BudgetFile[];
  createdAt: string;
};

type VersionHistoryProps = {
  budgets?: Budget[];
  isLoading?: boolean;
};

const VersionHistory = ({ budgets = [], isLoading = false }: VersionHistoryProps) => {
  if (isLoading) return <Text>Loading...</Text>;
  if (!budgets.length) return <Text>No version history available.</Text>;

  // Get the latest budget by createdAt
  const latestBudget = budgets.reduce((prev, curr) =>
    new Date(curr.createdAt) > new Date(prev.createdAt) ? curr : prev
  );

  // Sort budget files by version descending
  const sortedFiles = [...(latestBudget.budgetFiles || [])].sort(
    (a, b) => b.version - a.version
  );

  return (
    <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
      <HStack w="full" justify="space-between" align="center" mb={4}>
        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          Version History
        </Text>
        <HStack>
          <Button
            text="Upload Budget Template"
            size="md"
            variant="outline"
            border="#808080"
            color="#333333"
            fontWeight={400}
            fontSize={12}
            borderRadius={10}
            icon={<Image src="/images/upload-2.svg" alt="upload" boxSize={5} />}
            iconPosition="right"
          />
        </HStack>
      </HStack>

      <TableContainer>
        <Table
          variant="simple"
          size="sm"
          sx={{
            'thead th': {
              bg: '#E2EEFE',
              color: 'brand.100',
              fontWeight: 700,
              p: 4,
              fontSize: 'sm',
            },
            'thead th:first-of-type': { borderTopLeftRadius: '10px' },
            'thead th:last-of-type': { borderTopRightRadius: '10px' },
            'tbody td': {
              borderColor: '#EDEDED',
              fontSize: 'sm',
              color: 'headText.100',
              p: 4,
            },
          }}
          width="100%"
          p={10}
        >
          <Thead>
            <Tr>
              <Th>Version</Th>
              <Th>Filename</Th>
              <Th>Uploaded</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedFiles.map((file) => (
              <Tr key={file.id}>
                <Td>{`v${file.version}`}</Td>
                <Td>{file.documentUrl.split('/').pop()}</Td>
                <Td>
                  {file.createdAt
                    ? new Date(file.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '-'}
                </Td>
                <Td>
                  <Button
                    text="Download"
                    size="sm"
                    variant="outline"
                    border="#808080"
                    color="#333333"
                    fontWeight={400}
                    fontSize={12}
                    borderRadius={10}
                    icon={<Image src="/images/download.svg" alt="download" boxSize={5} />}
                    iconPosition="right"
                    onClick={() => window.open(file.documentUrl, '_blank')}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VersionHistory;
