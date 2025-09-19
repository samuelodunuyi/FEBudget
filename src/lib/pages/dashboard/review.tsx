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
import { skipToken } from "@reduxjs/toolkit/query";  
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Comments from '~/lib/components/dashboard/Comments';
import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Pagination from '~/lib/components/ui/Pagination';
import {
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useApproveBudgetMutation,
  useDownloadBudgetFileMutation,
} from '~/lib/redux/services/budgetLine.service';
import {
  useGetDepartmentByIdQuery,
} from '~/lib/redux/services/user.service';

const statusMap = {
  1: { label: 'Submitted', bg: '#FF7926', color: '#FFD3B7' },
  0: { label: 'Pending Submission', bg: '#808080', color: '#EDEDED' },
  2: { label: 'Pending Submission', bg: '#808080', color: '#EDEDED' },
  3: { label: 'Approved', bg: '#47B65C', color: '#B8FFAE' },
  4: { label: 'Rejected', bg: '#f70000ff', color: '#ffffffff' },
} as const;


const Report = () => {
  const params = useParams();
  const idParam = params?.id;
  const router = useRouter(); // at component top

const typeParam = params?.type;
  const type = Array.isArray(typeParam)
    ? parseInt(typeParam[0], 10)
    : parseInt(typeParam ?? '1', 10);

  const [downloadBudgetFile] = useDownloadBudgetFileMutation();
  const toast = useToast();


  
  const id = Array.isArray(idParam) ? idParam[0] : (idParam ?? '');
  const [createBudget] = useCreateBudgetMutation();

const {
  data: budgetQueryData,
  isLoading,
} = useGetBudgetQuery(type === 1 && id ? id : skipToken);

const {
  data: deptQueryData,
} = useGetDepartmentByIdQuery(type === 0 && id ? id : skipToken);

const [currentBudgetId, setCurrentBudgetId] = useState<string | null>(
    type === 1 ? id : null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [approveBudget] = useApproveBudgetMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [switchChecked, setSwitchChecked] = useState(false);
useEffect(() => {
  const budget = type === 1 ? budgetQueryData?.data ?? null : null;
  if (type === 1 && budget) {
    setSwitchChecked(budget.status === 3);
  }
}, [budgetQueryData, type]); 


  if (isLoading) return <Text>Loading...</Text>;

const budget = type === 1 ? budgetQueryData?.data ?? null : null;
const departmentData = type === 0 ? deptQueryData?.data ?? null : null;
console.log(currentBudgetId)
const currentStatus =
  budget && budget.status
    ? statusMap[budget.status as keyof typeof statusMap] || {
        label: 'Not Submitted',
        bg: '#EDEDED',
        color: '#808080',
      }
    : {
        label: 'Not Submitted',
        bg: '#EDEDED',
        color: '#808080',
      };

const sortedFiles = budget?.budgetFiles
  ? [...budget.budgetFiles].sort((a, b) => b.version - a.version)
  : [];

const handleSwitchChange = () => {
  onOpen();
};

const confirmApproval = async () => {
    const newApprovalStatus = !switchChecked;

  try {
    // use the updated value here
    await approveBudget({
      id: budget.id,
      isApproval: newApprovalStatus, // notice: this is opposite of current state
    }).unwrap();

    toast({
      title: !switchChecked
        ? 'Budget approved successfully'
        : 'Approval revoked successfully',
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
      const res = await createBudget({
        Year: new Date().getFullYear(),
        File: selectedFile,
        Narration: `${type === 0 ? departmentData?.name : budgetQueryData?.data?.department?.name} Budget Template Upload`,
        DepartmentId: type === 0 ? departmentData?.id : budgetQueryData?.data?.department?.id,
      }).unwrap();

            const newId = res?.data?.id;

     if (newId) {
        setCurrentBudgetId(newId);
    router.replace(`/dashboard/${newId}/${type}`);


      toast({
        title: 'Budget template submitted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setSelectedFile(null);
      setSelectedFileName('');
  }
      else {
        toast({
          title: 'Created but no ID returned',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
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
  {(type === 0
    ? departmentData?.name
    : budget?.department?.name) || ''}{' '}
  Budget Review
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
                {currentStatus.label}
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
{budget && budget.budgetFiles?.length > 0 && (
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
{ id !== "00000000-0000-0000-0000-000000000000" && (
  <Comments budgetId={id} />
)}
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
