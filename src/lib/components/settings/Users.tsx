import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  IconButton,
  Image,
  SkeletonText,
  useToast,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';

import ConfirmDialog from '~/lib/components/ui/ConfirmDialog';
import EmptyState from '~/lib/components/ui/EmptyState';
import Pagination from '~/lib/components/ui/Pagination';
import { tableCellStyle, tableHeaderStyle } from '~/lib/utils/formatter';

interface UsersProps {
  onOpenDrawer?: (data: any) => void;
}

const Users = ({ onOpenDrawer }: UsersProps) => {
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = false;

  const onCloseDialog = () => setIsOpen(false);

  const onOpenDialog = () => setIsOpen(true);

  const tableHead = [
    'S/N',
    'First Name',
    'Last Name',
    'Email',
    'Department',
    'Role',
    'Status',
    'Actions',
  ];

  const usersData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'IT',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      department: 'IT',
      role: 'Admin',
      status: 'Active',
    },
  ];

  const handleRowClick = (user: any) => {
    if (onOpenDrawer) {
      onOpenDrawer(user);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    const totalItems = 0;
    const newTotalPages = Math.ceil(totalItems / newPageSize);

    // If current page exceeds new total pages, reset to last valid page
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

    setPageSize(newPageSize);
  };

  const handleDelete = async () => {
    toast({
      title: 'Success',
      description: 'User has been deleted successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
    onCloseDialog();
  };

  return (
    <Box>
      <TableContainer bg="white" borderTopRadius="12px" w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHead.map((head, index) => (
                <Th key={index} sx={tableHeaderStyle}>
                  {head}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {Array.from({ length: tableHead.length }).map((_, index) => (
                    <Td key={index}>
                      <SkeletonText noOfLines={1} width="100%" />
                    </Td>
                  ))}
                </Tr>
              ))}

            {!isLoading && usersData?.length === 0 && (
              <Tr>
                <Td colSpan={tableHead.length} p={0}>
                  <EmptyState
                    message="No Users Found"
                    subMessage="You haven't added any users yet. Click 'Add User' to get started."
                  />
                </Td>
              </Tr>
            )}

            {!isLoading &&
              usersData?.length > 0 &&
              usersData.map((item: any, index: number) => (
                <Tr key={item.id} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <Td sx={tableCellStyle}>{index + 1}</Td>
                  <Td sx={tableCellStyle}>{item?.firstName || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>{item?.lastName || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>{item?.email || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>{item?.department || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>{item?.role || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>
                    <Switch />
                  </Td>
                  <Td sx={tableCellStyle}>
                    <HStack>
                      <IconButton
                        aria-label="edit"
                        icon={<Image src="/images/edit.svg" alt="edit" />}
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: 'transparent' }}
                        onClick={() => handleRowClick(item)}
                      />
                      <IconButton
                        aria-label="delete"
                        icon={<Image src="/images/delete.svg" alt="delete" />}
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: 'transparent' }}
                        onClick={() => {
                          onOpenDialog();
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {!isLoading && usersData?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={usersData?.length || 0}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableContainer>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
        onConfirm={() => handleDelete()}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        isLoading={false}
        isDisabled={false}
      />
    </Box>
  );
};

export default Users;
