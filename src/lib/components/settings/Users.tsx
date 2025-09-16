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
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '~/lib/redux/services/user.service';
import { tableCellStyle, tableHeaderStyle } from '~/lib/utils/formatter';

interface UsersProps {
  onOpenDrawer?: (data: any) => void;
}

const Users = ({ onOpenDrawer }: UsersProps) => {
  const toast = useToast();

  // Pagination state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Confirm dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // API hooks
  const {
    data: usersData,
    isLoading,
    isFetching,
    refetch,
  } = useGetUsersQuery({ page: currentPage, pageSize });


  const users = usersData?.data?.result ?? [];

  const [deleteUser] = useDeleteUserMutation();

  const onCloseDialog = () => setIsOpen(false);

  const onOpenDialog = (user: any) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const tableHead = [
    'S/N',
    'Full Name',
    'Email',
    'Department',
    'Role',
    'Status',
    'Actions',
  ];

  const handleRowClick = (user: any) => {
    if (onOpenDrawer) {
      onOpenDrawer(user);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    setPageSize(newPageSize);
    setCurrentPage(1); // reset to page 1
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id).unwrap();
      toast({
        title: 'Success',
        description: 'User has been deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Failed to delete user',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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
            {(isLoading || isFetching) &&
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {Array.from({ length: tableHead.length }).map((_, index) => (
                    <Td key={index}>
                      <SkeletonText noOfLines={1} width="100%" />
                    </Td>
                  ))}
                </Tr>
              ))}

            {!isLoading && users?.length === 0 && (
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
              users?.length > 0 &&
              users.map((item: any, index: number) => (
                <Tr key={item.id} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <Td sx={tableCellStyle}>
                    {(currentPage - 1) * pageSize + index + 1}
                  </Td>
                  <Td sx={tableCellStyle}>{item?.name || 'N/A'}</Td>
<Td sx={{ ...tableCellStyle, textTransform: 'none' }}>
  {item?.email || 'N/A'}
</Td>
                  <Td sx={tableCellStyle}>
                    {item?.department?.name || 'N/A'}
                  </Td>
                  <Td sx={tableCellStyle}>{item?.role || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>
                    <Switch isChecked />
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
                        onClick={() => onOpenDialog(item)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {!isLoading && users?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={usersData?.data?.totalRecords || 0}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableContainer>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        isLoading={false}
        isDisabled={false}
      />
    </Box>
  );
};

export default Users;
