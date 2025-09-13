import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  SkeletonText,
} from '@chakra-ui/react';
import { useState } from 'react';

import EmptyState from '../ui/EmptyState';
import Pagination from '../ui/Pagination';
import {
  formatDate2,
  tableCellStyle,
  tableHeaderStyle,
} from '~/lib/utils/formatter';

const Logs = () => {
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = false;

  const tableHead = ['S/N', 'Name', 'Email', 'Date/Time', 'Action'];

  const userActivitiesData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      dateTime: '2021-01-01 12:00:00',
      action: 'Login',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      dateTime: '2021-01-01 12:00:00',
      action: 'Logout',
    },
    {
      id: 3,
      name: 'Jim Beam',
      email: 'jim.beam@example.com',
      dateTime: '2021-01-01 12:00:00',
      action: 'Logout',
    },
  ];

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    const totalItems = userActivitiesData?.length || 0;
    const newTotalPages = Math.ceil(totalItems / newPageSize);

    // If current page exceeds new total pages, reset to last valid page
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

    setPageSize(newPageSize);
  };

  return (
    <Box>
      <TableContainer bg="white" borderTopRadius="12px" w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHead.map((head) => (
                <Th sx={tableHeaderStyle} key={head}>
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

            {!isLoading && userActivitiesData?.length === 0 && (
              <Tr>
                <Td colSpan={tableHead.length} p={0}>
                  <EmptyState
                    message="No Activity Logs Found"
                    subMessage="There are no user activities recorded yet. Activities will appear here as users interact with the system."
                  />
                </Td>
              </Tr>
            )}

            {!isLoading &&
              userActivitiesData?.length > 0 &&
              userActivitiesData.map((item: any, index: number) => (
                <Tr key={item.id} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <Td sx={tableCellStyle}>{index + 1}</Td>
                  <Td sx={tableCellStyle}>{item.name}</Td>
                  <Td sx={tableCellStyle}>{item.email}</Td>
                  <Td sx={tableCellStyle}>{formatDate2(item.dateTime)}</Td>
                  <Td sx={tableCellStyle}>{item.action}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        {!isLoading && userActivitiesData?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={userActivitiesData?.length || 0}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default Logs;
