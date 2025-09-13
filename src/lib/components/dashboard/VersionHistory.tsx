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

export type VersionRow = {
  version: string;
  filename: string;
  uploaded: string;
};

type VersionHistoryProps = {
  rows?: VersionRow[];
};

const defaultRows: VersionRow[] = [
  {
    version: 'v1',
    filename: 'IT_Budget_Template_2026.docx',
    uploaded: '28 August, 2025',
  },
  {
    version: 'v2',
    filename: 'IT_Budget_2026.docx',
    uploaded: '28 August, 2025',
  },
];

const VersionHistory = ({ rows = defaultRows }: VersionHistoryProps) => {
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
            icon={
              <Image src="/images/upload-2.svg" alt="download" boxSize={5} />
            }
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
            {rows.map((r) => (
              <Tr key={r.version}>
                <Td>{r.version}</Td>
                <Td>{r.filename}</Td>
                <Td>{r.uploaded}</Td>
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
                    icon={
                      <Image
                        src="/images/download.svg"
                        alt="download"
                        boxSize={5}
                      />
                    }
                    iconPosition="right"
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
