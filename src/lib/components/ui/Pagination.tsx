import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Text, Select, IconButton, HStack } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  bg?: string;
  borderRadius?: string;
  boxShadow?: string;
}

const Pagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  bg = 'white',
  borderRadius = 'md',
  boxShadow = 'sm',
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      p={4}
      bg={bg}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
    >
      <HStack alignItems="center">
        <Text fontSize="sm" color="#333333">
          Rows per page:
        </Text>
        <Select
          size="sm"
          value={pageSize}
          onChange={onPageSizeChange}
          w="70px"
          borderRadius="md"
          fontSize="sm"
          bg="#EDEDED"
          borderColor="#EDEDED"
          borderWidth="1px"
          color="#333333"
          fontWeight="400"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
        </Select>
      </HStack>

      {/* Page Numbers */}
      <HStack spacing={4}>
        <IconButton
          aria-label="Previous page"
          icon={<ChevronLeftIcon color="#000000" fontSize="20px" />}
          size="sm"
          bg="#EDEDED"
          borderWidth="1px"
          borderColor="#EDEDED"
          borderRadius="7px"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        <HStack alignItems="center" justifyContent="center">
          <Text fontSize="sm" fontWeight="400" color="#333333">
            Page {currentPage} of {totalPages}
          </Text>
        </HStack>

        <IconButton
          aria-label="Next page"
          icon={<ChevronRightIcon color="#000000" fontSize="20px" />}
          size="sm"
          bg="#EDEDED"
          borderWidth="1px"
          borderColor="#EDEDED"
          borderRadius="7px"
          isDisabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </HStack>
    </HStack>
  );
};

export default Pagination;
