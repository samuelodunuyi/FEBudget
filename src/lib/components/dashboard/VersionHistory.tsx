'use client';

import { DeleteIcon } from '@chakra-ui/icons';
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
import { useState } from 'react';

import Button from '~/lib/components/ui/Button';
import { useDownloadBudgetFileMutation, useDeleteBudgetMutation } from '~/lib/redux/services/budgetLine.service';

export type BudgetFile = {
  updatedAt: string;
  id: string;
  budgetId: string;
  documentUrl: string;
  version: number;
  fileName: string;
  createdAt?: string;
};

export type Budget = {
  id: string;
  budgetFiles?: BudgetFile[];
  createdAt: string;
};

type VersionHistoryProps = {
  budgets?: Budget;
  isLoading?: boolean;
};

const VersionHistory = ({ budgets, isLoading = false }: VersionHistoryProps) => {
  const [downloadBudgetFile] = useDownloadBudgetFileMutation();
  const [deleteBudgetFile] = useDeleteBudgetMutation();
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);

  if (isLoading) return <Text>Loading...</Text>;
  if (!budgets) return <Text>No version history available.</Text>;

  // Sort budget files by version descending
  const sortedFiles = [...(budgets.budgetFiles || [])].sort(
    (a, b) => b.version - a.version
  );

  const handleDownload = async (file: BudgetFile) => {
    try {
      setDownloadingFileId(file.id);
      const blob = await downloadBudgetFile(file.id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloadingFileId(null);
    }
  };

  const handleDelete = async (file: BudgetFile) => {
    try {
      await deleteBudgetFile(file.id).unwrap();
      // eslint-disable-next-line no-alert
      alert('File deleted successfully.');
    } catch (err) {
      console.error('Delete failed:', err);
      // eslint-disable-next-line no-alert
      alert('Failed to delete file.');
    }
  }

  return (
    <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
      <HStack w="full" justify="space-between" align="center" mb={4}>
        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          Version History
        </Text>

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
                <Td>{file.fileName}</Td>
                <Td>
                  {file.createdAt
                    ? new Date(file.updatedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : '-'}
                </Td>
<Td>
  <HStack spacing={3}>
    <Button
      text={downloadingFileId === file.id ? 'Downloading...' : 'Download'}
      size="sm"
      variant="outline"
      border="#808080"
      color="#333333"
      fontWeight={400}
      fontSize={12}
      borderRadius={10}
      icon={<Image src="/images/download.svg" alt="download" boxSize={5} />}
      iconPosition="right"
      isDisabled={downloadingFileId === file.id}
      onClick={() => handleDownload(file)}
    />

    <Button
      text="Delete"
      size="sm"
      variant="outline"
      border="#FF4D4D"
      color="#FF4D4D"
      fontWeight={400}
      fontSize={12}
      borderRadius={10}
      icon={<DeleteIcon boxSize={4} />}
      iconPosition="right"
      onClick={() => handleDelete(file)}
    />
  </HStack>
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
