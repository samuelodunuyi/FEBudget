'use client';

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
import { tableCellStyle, tableHeaderStyle } from '~/lib/utils/formatter';

const Role = () => {
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = false;

  const tableHead = ['S/N', 'Role', 'Description'];

  const rolenumList = [
    { id: 1, value: 'Others', description: 'Other Role' },
    { id: 2, value: 'Finance', description: 'Finance Role' },
    { id: 3, value: 'ITAdmin', description: 'IT-Admin Roles' },
    { id: 4, value: 'Ceo', description: 'Ceo Roles' },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRoles = rolenumList.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    const totalItems = rolenumList.length;
    const newTotalPages = Math.ceil(totalItems / newPageSize);

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

            {!isLoading && rolenumList.length === 0 && (
              <Tr>
                <Td colSpan={tableHead.length} p={0}>
                  <EmptyState
                    message="No Roles Found"
                    subMessage="There are no roles recorded yet."
                  />
                </Td>
              </Tr>
            )}

            {!isLoading &&
              paginatedRoles.map((item, index) => (
                <Tr key={item.id} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <Td sx={tableCellStyle}>{startIndex + index + 1}</Td>
                  <Td sx={tableCellStyle}>{item.value}</Td>
                  <Td sx={tableCellStyle}>{item.description}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        {!isLoading && rolenumList.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={rolenumList.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default Role;
