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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button as ChakraButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Comments from '~/lib/components/dashboard/Comments';
import DashboardHeader from '~/lib/components/layout/DashboardHeader';
import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Pagination from '~/lib/components/ui/Pagination';
import {
  useGetBudgetsQuery,
  useApproveBudgetMutation,
} from '~/lib/redux/services/budgetLine.service';

const statusMap = {
  1: { label: 'Submitted', bg: '#FFD3B7', color: '#FF7926' },
  2: { label: 'Pending Submission', bg: '#FFF3C4', color: '#FFB800' },
  3: { label: 'Approved', bg: '#D1F7DD', color: '#00B74A' },
} as const;

const Report = () => {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : (idParam ?? '');

  const { data, isLoading, isError } = useGetBudgetsQuery(undefined);

  const [approveBudget] = useApproveBudgetMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [switchChecked, setSwitchChecked] = useState(false);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !data) return <Text>Error loading budget data</Text>;

  const budget = data.data.result.find(
    (b: { id: string | string[] | undefined }) => b.id === id
  );
  if (!budget) return <Text>Budget not found</Text>;

  const currentStatus = statusMap[budget.status as keyof typeof statusMap] || {
    label: 'Unknown',
    bg: '#EDEDED',
    color: '#808080',
  };

  const sortedFiles = [...(budget.budgetFiles || [])].sort(
    (a, b) => b.version - a.version
  );

  const handleSwitchChange = () => {
    setSwitchChecked((prev) => !prev);

    onOpen();
  };

  const confirmApproval = async () => {
    try {
      console.log(budget.id, !switchChecked);
      await approveBudget({
        id: budget.id,
        isApproval: !switchChecked,
      }).unwrap();
      setSwitchChecked(!switchChecked);
    } catch (error) {
      console.error('Error updating budget approval:', error);
    } finally {
      onClose();
    }
  };

  return (
    <SimpleDashboardLayout>
      <HeaderBack />
      <DashboardHeader />

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
                  bg={currentStatus.bg}
                  color={currentStatus.color}
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontWeight={400}
                  fontSize="sm"
                >
                  {currentStatus.label}
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
              <Switch
                size="md"
                colorScheme="blue"
                isChecked={budget.status === 3 || switchChecked}
                onChange={handleSwitchChange}
              />
            </HStack>
          </HStack>
        </Box>

        {/* Version History */}
        <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
          <HStack w="full" justify="space-between" align="center" mb={4}>
            <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
              Version History
            </Text>
          </HStack>

          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Version</Th>
                  <Th>Filename</Th>
                  <Th>Download</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedFiles.map((file, index) => (
                  <Tr key={file.id || index}>
                    <Td>v{file.version}</Td>
                    <Td>{file.fileName}</Td>
                    <Td>
                      <HStack>
                        <a
                          href={file.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ChakraButton
                            size="sm"
                            variant="outline"
                            border="#808080"
                            color="#333333"
                            fontWeight={400}
                            fontSize={12}
                            borderRadius={10}
                            rightIcon={
                              <Image
                                src="/images/download.svg"
                                alt="download"
                                boxSize={5}
                              />
                            }
                          >
                            Download
                          </ChakraButton>
                        </a>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination
              currentPage={1}
              pageSize={10}
              totalItems={sortedFiles.length}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
              bg="transparent"
              borderRadius="0px"
              boxShadow="none"
            />
          </TableContainer>
        </Box>

        {/* Comments */}
        <Comments budgetId={id} />
      </VStack>

      {/* Approval Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Approval</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to{' '}
            {switchChecked ? 'revoke approval for' : 'approve'} this budget?
          </ModalBody>
          <ModalFooter>
            <ChakraButton onClick={onClose} mr={3}>
              Cancel
            </ChakraButton>
            <ChakraButton colorScheme="blue" onClick={confirmApproval}>
              Yes
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SimpleDashboardLayout>
  );
};

export default Report;
