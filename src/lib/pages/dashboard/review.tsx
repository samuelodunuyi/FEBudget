/* eslint-disable jsx-a11y/label-has-associated-control */

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
  Stack,
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
  useToast,
  Input,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Comments from '~/lib/components/dashboard/Comments';
import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Pagination from '~/lib/components/ui/Pagination';
import {
  useGetBudgetsQuery,
  useCreateBudgetMutation,
  useApproveBudgetMutation,
  useDownloadBudgetFileMutation,
} from '~/lib/redux/services/budgetLine.service';

const statusMap = {
  1: { label: 'Submitted', bg: '#FF7926', color: '#FFD3B7' },
  2: { label: 'Pending Submission', bg: '#808080', color: '#EDEDED' },
  3: { label: 'Approved', bg: '#47B65C', color: '#B8FFAE' },
  4: { label: 'Rejected', bg: '#f70000ff', color: '#ffffffff' },
} as const;

const Report = () => {
  const params = useParams();
  const idParam = params?.id;
  const [downloadBudgetFile] = useDownloadBudgetFileMutation();
  const toast = useToast();

  const id = Array.isArray(idParam) ? idParam[0] : (idParam ?? '');
  const [createBudget] = useCreateBudgetMutation();

  const { data, isLoading, isError } = useGetBudgetsQuery(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

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
      await approveBudget({
        id: budget.id,
        isApproval: !switchChecked,
      }).unwrap();
      setSwitchChecked(!switchChecked);
      toast({
        title: switchChecked
          ? 'Approval revoked successfully'
          : 'Budget approved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating budget approval:', error);
      toast({
        title: 'Error',
        description: 'Failed to update approval status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setSelectedFileName(event.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await createBudget({
        Year: new Date().getFullYear(),
        File: selectedFile,
        Narration: `${budget?.department?.name} Budget Template Upload`,
        DepartmentId: budget?.department?.id || '',
      }).unwrap();

      toast({
        title: 'Budget template submitted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setSelectedFile(null);
      setSelectedFileName('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description:
          error?.data?.message || error?.message || 'Failed to submit budget',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDownload = async (file: { id: any; fileName: string }) => {
    try {
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
      toast({
        title: 'Error',
        description: 'Failed to download file',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleDashboardLayout>
      <HeaderBack />
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
            {budget?.department?.name || ''} Budget Review
          </Text>
        </Stack>
      </HStack>

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
            {budget.budgetFiles?.length > 0 && (
              <HStack spacing={4} bg="#EDEDED" rounded="10px" p={4}>
                <Text color="headText.100" fontSize="14px">
                  Approve Budget
                </Text>
                {budget.status}
                <Switch
                  size="md"
                  colorScheme="blue"
                  isChecked={budget.status === 3 || switchChecked}
                  onChange={handleSwitchChange}
                />
              </HStack>
            )}
          </HStack>
        </Box>

        {/* Version History + Upload */}
        <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
          <HStack w="full" justify="space-between" align="center" mb={4}>
            <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
              Version History
            </Text>
            <HStack>
<Input
  type="file"
  accept=".xlsx,.xls,.csv,.pdf"
  id="budgetFile"
  onChange={handleFileChange}
  display="none"
/>

<label htmlFor="budgetFile">
  <ChakraButton
    as="span"
    size="md"
    variant="outline"
    border="1px solid #808080"
    color="#333333"
    fontWeight={400}
    fontSize="12px"
    borderRadius="10px"
    rightIcon={
      <Image src="/images/upload-2.svg" alt="upload" boxSize={5} />
    }
  >
    Choose File
  </ChakraButton>
</label>


              {selectedFileName && (
                <Text fontSize="sm" color="gray.600">
                  {selectedFileName}
                </Text>
              )}

              <ChakraButton
                size="md"
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={!selectedFile}
              >
                Upload
              </ChakraButton>
            </HStack>
          </HStack>

          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Version</Th>
                  <Th>Filename</Th>
                  <Th>Uploaded</Th>
                  <Th>Download</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedFiles.map((file, index) => (
                  <Tr key={file.id || index}>
                    <Td>v{file.version}</Td>
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
                      <HStack>
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
                          onClick={() => handleDownload(file)}
                        >
                          Download
                        </ChakraButton>
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
