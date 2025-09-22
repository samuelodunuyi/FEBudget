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
import { useGetUserActivitiesQuery } from '~/lib/redux/services/user.service'; 
import { formatDate2, tableCellStyle, tableHeaderStyle } from '~/lib/utils/formatter';

const Logs = () => {
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch user activities with query params
  const { data, isLoading } = useGetUserActivitiesQuery({
    CurrentPage: currentPage,
    PageSize: pageSize,
  });

  const tableHead = ['S/N', 'Initiator', 'Details', 'Date/Time', 'Action'];

  const activities = data?.data?.result ?? [];

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    const totalItems = data?.data?.totalRecords || 0;
    const newTotalPages = Math.ceil(totalItems / newPageSize);

    // Ensure currentPage stays valid
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
            {/* Loading skeleton */}
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

            {/* Empty state */}
            {!isLoading && activities.length === 0 && (
              <Tr>
                <Td colSpan={tableHead.length} p={0}>
                  <EmptyState
                    message="No Activity Logs Found"
                    subMessage="There are no user activities recorded yet. Activities will appear here as users interact with the system."
                  />
                </Td>
              </Tr>
            )}

            {/* Data rows */}
            {!isLoading &&
              activities.length > 0 &&
              activities.map((item: any, index: number) => (
                <Tr key={item.id} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <Td sx={tableCellStyle}>
                    {(currentPage - 1) * pageSize + (index + 1)}
                  </Td>
                  <Td sx={tableCellStyle}>{item.initiator}</Td>
                  <Td sx={tableCellStyle}>{item.details}</Td>
                  <Td sx={tableCellStyle}>{formatDate2(item.createdAt)}</Td>
                  <Td sx={tableCellStyle}>{item.action}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {/* Pagination */}
        {!isLoading && activities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={data?.data?.totalRecords || 0}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default Logs;
