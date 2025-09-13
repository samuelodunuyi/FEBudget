'use client';

import {
  Box,
  HStack,
  Image,
  Switch,
  Tag,
  Text,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import Comments from '~/lib/components/dashboard/Comments';
import DashboardHeader from '~/lib/components/layout/DashboardHeader';
import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Button from '~/lib/components/ui/Button';
import Pagination from '~/lib/components/ui/Pagination';

const Report = () => {
  // local constants no longer needed after redesign

  return (
    <SimpleDashboardLayout>
      <HeaderBack />
      <DashboardHeader title="Finance Review Dashboard" />

      <VStack mt={4} alignItems="stretch" w="full" spacing={6}>
        {/* Review Status */}
        <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
          <HStack w="full" justify="space-between">
            <VStack align="stretch" spacing={0} w={['100%', 'auto']}>
              <HStack spacing={3} align="center">
                <Text
                  fontSize={['md', 'lg']}
                  fontWeight="600"
                  color="headText.100"
                >
                  Review Status
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
                  Submitted
                </Tag>
              </HStack>

              <Text color="#808080" fontSize="14px" fontWeight={400}>
                Mark this submission as reviewed or pending
              </Text>
            </VStack>

            <HStack spacing={4} bg="#EDEDED" rounded="10px" p={4}>
              <Text color="headText.100" fontSize="14px">
                Approve Budget
              </Text>
              <Switch size="md" colorScheme="blue" />
            </HStack>
          </HStack>
        </Box>

        {/* Version History */}
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
                  <Image
                    src="/images/upload-2.svg"
                    alt="download"
                    boxSize={5}
                  />
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
                  <Th>Download</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[
                  {
                    v: 'v1',
                    name: 'IT_Budget_Template_2026.docx',
                    date: '28 August, 2025',
                  },
                  {
                    v: 'v2',
                    name: 'IT_Budget_2026.docx',
                    date: '28 August, 2025',
                  },
                ].map((row) => (
                  <Tr key={row.v}>
                    <Td>{row.v}</Td>
                    <Td>{row.name}</Td>
                    <Td>{row.date}</Td>
                    <Td>
                      <HStack>
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
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination
              currentPage={1}
              pageSize={10}
              totalItems={100}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
              bg="transparent"
              borderRadius="0px"
              boxShadow="none"
            />
          </TableContainer>
        </Box>

        {/* Comments */}
        <Comments />
      </VStack>
    </SimpleDashboardLayout>
  );
};

export default Report;
