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
} from '@chakra-ui/react';
import { useState } from 'react';
import ConfirmDialog from '~/lib/components/ui/ConfirmDialog';
import EmptyState from '~/lib/components/ui/EmptyState';
import Pagination from '~/lib/components/ui/Pagination';
import { tableCellStyle, tableHeaderStyle } from '~/lib/utils/formatter';
import { useGetAllDepartmentsQuery } from '~/lib/redux/services/user.service';

interface DepartmentsProps {
  onOpenDrawer?: (data: any) => void;
}

const Departments = ({ onOpenDrawer }: DepartmentsProps) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<any>(null);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch departments
  const { data: departmentsData, isLoading } = useGetAllDepartmentsQuery(undefined);
  const departments = departmentsData?.data || [];

  const onCloseDialog = () => setIsOpen(false);
  const onOpenDialog = (dept: any) => {
    setSelectedDept(dept);
    setIsOpen(true);
  };

  const tableHead = ['S/N', 'Department Name', 'Description', 'Actions'];

  const handleRowClick = (dept: any) => {
    if (onOpenDrawer) onOpenDrawer(dept);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    const totalItems = departments.length;
    const newTotalPages = Math.ceil(totalItems / newPageSize);
    if (currentPage > newTotalPages && newTotalPages > 0) setCurrentPage(newTotalPages);
    setPageSize(newPageSize);
  };

  const handleDelete = async () => {
    toast({
      title: 'Success',
      description: `Department "${selectedDept?.name}" has been deleted successfully`,
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
                <Th key={index} sx={tableHeaderStyle}>{head}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <Tr key={rowIndex}>
                  {Array.from({ length: tableHead.length }).map((_, colIndex) => (
                    <Td key={colIndex}><SkeletonText noOfLines={1} width="100%" /></Td>
                  ))}
                </Tr>
              ))
            }

            {!isLoading && departments.length === 0 && (
              <Tr>
                <Td colSpan={tableHead.length} p={0}>
                  <EmptyState
                    message="No Departments Found"
                    subMessage="You haven't added any departments yet."
                  />
                </Td>
              </Tr>
            )}

            {!isLoading && departments.length > 0 &&
              departments.map((dept: any, index: number) => (
                <Tr key={dept.id} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <Td sx={tableCellStyle}>{index + 1}</Td>
                  <Td sx={tableCellStyle}>{dept.name || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>{dept.description || 'N/A'}</Td>
                  <Td sx={tableCellStyle}>
                    <HStack>
                      <IconButton
                        aria-label="edit"
                        icon={<Image src="/images/edit.svg" alt="edit" />}
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: 'transparent' }}
                        onClick={() => handleRowClick(dept)}
                      />
                      <IconButton
                        aria-label="delete"
                        icon={<Image src="/images/delete.svg" alt="delete" />}
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: 'transparent' }}
                        onClick={() => onOpenDialog(dept)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>

        {!isLoading && departments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={departments.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableContainer>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
        onConfirm={handleDelete}
        title="Delete Department"
        message={`Are you sure you want to delete "${selectedDept?.name}"?`}
        isLoading={false}
        isDisabled={false}
      />
    </Box>
  );
};

export default Departments;
