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
import { useMemo, useState, useEffect } from 'react';

import StatCard from '~/lib/components/dashboard/StatCard';
import DashboardHeader from '~/lib/components/layout/DashboardHeader';
import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Button from '~/lib/components/ui/Button';
import Input2 from '~/lib/components/ui/Input2';
import Pagination from '~/lib/components/ui/Pagination';
import Select2 from '~/lib/components/ui/Select2';
import { useGetBudgetsQuery, useGetBudgetsStatQuery } from '~/lib/redux/services/budgetLine.service';
import { dashboardStatusColor } from '~/lib/utils/formatter';

const START_YEAR = 2023;

const Report = () => {
  const router = useRouter();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [status, setStatus] = useState<string>(''); 
  const [searchInput, setSearchInput] = useState<string>(''); 
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 500);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [year, status]);

  const queryArgs = useMemo(() => {
    const q: Record<string, any> = {};
    if (year) q.year = Number(year);
    if (status) q.status = Number(status);
    if (search) q.search = search;
    q.curentPage = page;
    q.pageSize = pageSize;
    return q;
  }, [year, status, search, page, pageSize]);

  const { data: budgetData, isLoading } = useGetBudgetsQuery(queryArgs);
  const { data: budgetStatData} = useGetBudgetsStatQuery(queryArgs);
  console.log(budgetStatData)
  const budgets = budgetData?.data?.result ?? [];
  const mapStatus = (statusNum: number | undefined) => {
    switch (statusNum) {
      case 1:
        return 'Submitted';
      case 2:
        return 'Pending Submission';
      case 3:
        return 'Approved';
      case 4:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '—';
    if (iso.startsWith('0001')) return '—';
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const totalDepartments = new Set(
    budgets.map((b: any) => b.department?.id).filter(Boolean)
  ).size;
  const submittedCount = budgets.filter((b: any) => b.status === 1).length;
  const pendingCount = budgets.filter((b: any) => b.status === 2).length;
  const approvedCount = budgets.filter((b: any) => b.status === 3).length;

  const stats = [
    { description: 'Total Department', value: String(totalDepartments || 0), bg: '#227CBF' },
    { description: 'Pending Submission', value: String(pendingCount || 0), bg: '#808080' },
    { description: 'Submitted', value: String(submittedCount || 0), bg: '#FF6633' },
    { description: 'Approved', value: String(approvedCount || 0), bg: '#47B65C' },
  ];

  const heads = ['Department', 'Status', 'Last Submitted', 'Versions', 'Actions'];

const handleReview = (id: string, type: number) => {
  router.push(`/dashboard/${id}/${type}`);
};

  const handleSettings = () => {
    router.push('/settings');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - START_YEAR + 1 }, (_, i) => START_YEAR + i).reverse();

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Submitted', value: '1' },
    { label: 'Pending Submission', value: '2' },
    { label: 'Approved', value: '3' },
  ];

  const handleYearChange = (val: any) => {
  const v = val?.target?.value ?? val;
  if (v !== undefined && v !== null) {
    setYear(Number(v)); // convert string to number
  }
}
  const handleStatusChange = (val: any) => {
    const v = val?.target?.value ?? val;
    setStatus(String(v ?? ''));
  };
  const handleSearchChange = (val: any) => {
    const v = val?.target?.value ?? val;
    setSearchInput(String(v ?? ''));
  };

  const onPageChange = (newPage: number) => setPage(newPage);
const onPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newSize = parseInt(e.target.value, 10);
  if (Number.isNaN(newSize)) return;
  setPageSize(newSize);
  setPage(1);
};

  return (
    <SimpleDashboardLayout>
      <HeaderBack />
      <DashboardHeader>
        <Button text="Settings" px={10} onClick={handleSettings} />
      </DashboardHeader>

      <VStack mt={4} alignItems="stretch" w="full" spacing={6}>
        <SimpleGrid columns={[1, 2, 4]} spacing={4} rounded="15px">
          {isLoading
            ? Array(4 )
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} height="120px" borderRadius="15px" />
                ))
            : stats.map((stat, index) => (
                <StatCard key={index} description={stat.description} value={stat.value} bg={stat.bg} />
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
            <Select2
              options={[{ label: 'All', value: '' }, ...years.map((y) => ({ label: String(y), value: String(y) }))]}
              placeholder="Select Year"
              size="md"
              value={year}
              onChange={handleYearChange}
            />
            <Select2 options={statusOptions} placeholder="Select Status" size="md" value={status} onChange={handleStatusChange} />
          </SimpleGrid>

          <Box w={['100%', 'auto']}>
            <Input2 name="search" type="text" placeholder="Search" size="md" value={searchInput} onChange={handleSearchChange} />
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
              {budgets.length === 0 ? (
                <Tr>
                  <Td colSpan={heads.length} textAlign="center">
                    No budgets found
                  </Td>
                </Tr>
              ) : (
                budgets.map((item: any, index: number) => {
                  const departmentName = item.department?.name ?? '—';
                  const statusLabel = mapStatus(item.status);
                  const lastSubmitted = formatDate(item.updatedAt ?? item.createdAt);
                  const versions = Array.isArray(item.budgetFiles) ? item.budgetFiles.length : 0;

                  return (
                    <Tr key={index}>
                      <Td>{departmentName}</Td>
                      <Td>
                        <Tag
                          bg={dashboardStatusColor(statusLabel).bg}
                          color={dashboardStatusColor(statusLabel).color}
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontWeight={400}
                          fontSize="sm"
                          minW="130px"
                          textAlign="center"
                          justifyContent="center"
                        >
                          {statusLabel}
                        </Tag>
                      </Td>
                      <Td>{lastSubmitted}</Td>
                      <Td>{versions}</Td>
<Td>
  <Button
    text="Review"
    size="sm"
    fontWeight={400}
    fontSize={14}
    px={6}
    onClick={() =>
      handleReview(
        item.id === "00000000-0000-0000-0000-000000000000"
          ? item.department?.id
          : item.id,
        item.id === "00000000-0000-0000-0000-000000000000" ? 0 : 1
      )
    }
  />
</Td>

                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>

          <Pagination
            currentPage={budgetData?.data?.currentPage ?? page}
            pageSize={budgetData?.data?.pageSize ?? pageSize}
            totalItems={budgetData?.data?.totalRecords ?? 0}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
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
