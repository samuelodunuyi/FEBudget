'use client';

import { Text, VStack, SimpleGrid, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import Comments from '~/lib/components/dashboard/Comments';
import SubmissionStatus from '~/lib/components/dashboard/SubmissionStatus';
import UploadBudgetCard from '~/lib/components/dashboard/UploadBudgetCard';
import VersionHistory from '~/lib/components/dashboard/VersionHistory';
import DashboardHeader from '~/lib/components/layout/DashboardHeader';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Button from '~/lib/components/ui/Button';
import Select2 from '~/lib/components/ui/Select2';
import {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
} from '~/lib/redux/services/budgetLine.service';
import { useAppSelector } from '~/lib/redux/store';
import { yearOptions } from '~/lib/utils/formatter';

const Home = () => {
  const router = useRouter();
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [createBudget, { isLoading }] = useCreateBudgetMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const queryArgs = useMemo(() => {
    const q: Record<string, any> = {};
    if (selectedYear) q.Year = Number(selectedYear);
    return q;
  }, [selectedYear]);
  const { data, isLoading: isLoadingBudgets } = useGetBudgetsQuery(queryArgs);

  const departmentBudgets = data?.data?.result.filter(
    (b: { department: { id: any } }) =>
      b.department?.id === userInfo?.department?.id
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const shortenedName =
        file.name.length > 40 ? `${file.name.substring(0, 37)}...` : file.name;
      setSelectedFileName(shortenedName);
    } else {
      setSelectedFileName('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    try {
      await createBudget({
        Year: new Date().getFullYear(),
        File: selectedFile,
        Narration: `${userInfo?.department?.name} Budget Upload`,
        DepartmentId: userInfo?.department?.id || '',
      }).unwrap();

      toast({
        title: 'Budget submitted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setSelectedFile(null);
      setSelectedFileName('');
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

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <SimpleDashboardLayout>
      <DashboardHeader />

      <VStack alignItems="stretch" spacing={6} w="full" mt={4}>
        <SimpleGrid columns={[1, 10]} spacing={4} w="full">
          <Select2
            name="year"
            options={yearOptions()}
            placeholder="Select Year"
            size="md"
            value={selectedYear ?? undefined}
            onChange={(val: any) => setSelectedYear(val)}
          />
          {[2, 3, 4].includes(userInfo.role) && (
            <Button
              text="Dashboard"
              size="md"
              px={14}
              onClick={handleDashboard}
            />
          )}
        </SimpleGrid>

        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          {userInfo?.department?.name || 'Unknown'}
        </Text>

        <UploadBudgetCard
          selectedFileName={selectedFileName}
          isSubmitDisabled={!selectedFile || isLoading}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />

        {/* Status and Version History */}
        <SimpleGrid columns={[1, 2]} spacing={4} w="full">
          <SubmissionStatus
            budgets={departmentBudgets}
            isLoading={isLoadingBudgets}
          />
          <VersionHistory
            budgets={departmentBudgets}
            isLoading={isLoadingBudgets}
          />
        </SimpleGrid>

        <Comments budgetId={departmentBudgets?.[0]?.id} />
      </VStack>
    </SimpleDashboardLayout>
  );
};

export default Home;
