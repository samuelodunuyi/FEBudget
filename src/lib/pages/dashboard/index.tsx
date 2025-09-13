'use client';

import {
  VStack,
  SimpleGrid,
  Skeleton,
  HStack,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import StatCard from '~/lib/components/dashboard/StatCard';
import DashboardHeader from '~/lib/components/layout/DashboardHeader';
import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Button from '~/lib/components/ui/Button';
import Input2 from '~/lib/components/ui/Input2';
import Pagination from '~/lib/components/ui/Pagination';
import Select2 from '~/lib/components/ui/Select2';
import { dashboardStatusColor } from '~/lib/utils/formatter';

const Report = () => {
  const router = useRouter();
  const stats = [
    {
      description: 'Total Department',
      value: '10',
      bg: '#227CBF',
    },
    {
      description: 'Pending Submission',
      value: '4',
      bg: '#808080',
    },
    {
      description: 'Submitted',
      value: '6',
      bg: '#FF6633',
    },
    {
      description: 'Approved',
      value: '10',
      bg: '#47B65C',
    },
  ];

  const heads = [
    'Department',
    'Status',
    'Last Submitted',
    'Versions',
    'Actions',
  ];

  const data = [
    {
      department: 'Information Technology',
      status: 'Pending Submission',
      lastSubmitted: '2025-01-01',
      versions: 1,
      id: '1',
    },
    {
      department: 'Information Technology',
      status: 'Submitted',
      lastSubmitted: '2025-01-01',
      versions: 1,
      id: '2',
    },
    {
      department: 'Information Technology',
      status: 'Reviewed',
      lastSubmitted: '2025-01-01',
      versions: 1,
      id: '3',
    },
    {
      department: 'Information Technology',
      status: 'Reviewed',
      lastSubmitted: '2025-01-01',
      versions: 1,
      id: '4',
    },
  ];

  const handleReview = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const isAllLoading = false;

  return (
    <SimpleDashboardLayout>
      <HeaderBack />
      <DashboardHeader title="Welcome, Tunde 👋">
        <Button text="Settings" px={10} onClick={handleSettings} />
      </DashboardHeader>

      <VStack mt={4} alignItems="stretch" w="full" spacing={6}>
        <SimpleGrid columns={[1, 2, 4]} spacing={4} rounded="15px">
          {isAllLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} height="120px" borderRadius="15px" />
                ))
            : stats.map((stat, index) => (
                <StatCard
                  key={index}
                  description={stat.description}
                  value={stat.value}
                  bg={stat.bg}
                />
              ))}
        </SimpleGrid>

        <HStack
          w="full"
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          spacing={4}
        >
          <SimpleGrid columns={[1, 10]} spacing={4} w={['100%', 'auto']}>
            <Select2 options={[]} placeholder="Select Year" size="md" />
            <Select2 options={[]} placeholder="Select Status" size="md" />
          </SimpleGrid>

          <Box w={['100%', 'auto']}>
            <Input2 name="search" type="text" placeholder="Search" size="md" />
          </Box>
        </HStack>

        <TableContainer>
          <Table
            variant="simple"
            size="sm"
            sx={{
              'thead th': {
                bg: '#E2EEFE',
                color: 'brand.100',
                fontWeight: 700,
                p: 4,
                fontSize: 'sm',
              },
              'thead th:first-of-type': { borderTopLeftRadius: '10px' },
              'thead th:last-of-type': { borderTopRightRadius: '10px' },
              'tbody td': {
                borderColor: '#EDEDED',
                fontSize: 'sm',
                color: 'headText.100',
                bg: 'white',
                p: 4,
              },
            }}
            width="100%"
            p={10}
          >
            <Thead>
              <Tr>
                {heads.map((head) => (
                  <Th key={head}>{head}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr>
                  <Td>{item.department}</Td>
                  <Td>
                    <Tag
                      bg={dashboardStatusColor(item.status).bg}
                      color={dashboardStatusColor(item.status).color}
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontWeight={400}
                      fontSize="sm"
                      minW="130px"
                      textAlign="center"
                      justifyContent="center"
                    >
                      {item.status}
                    </Tag>
                  </Td>
                  <Td>{item.lastSubmitted}</Td>
                  <Td>{item.versions}</Td>
                  <Td>
                    <Button
                      text="Review"
                      size="sm"
                      fontWeight={400}
                      fontSize={14}
                      px={6}
                      onClick={() => handleReview(item.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination
            currentPage={1}
            pageSize={10}
            totalItems={100}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            bg="transparent"
            borderRadius="0px"
            boxShadow="none"
          />
        </TableContainer>
      </VStack>
    </SimpleDashboardLayout>
  );
};

export default Report;
