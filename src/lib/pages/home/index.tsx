'use client';

import { Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Comments from '~/lib/components/dashboard/Comments';
import SubmissionStatus from '~/lib/components/dashboard/SubmissionStatus';
import UploadBudgetCard from '~/lib/components/dashboard/UploadBudgetCard';
import VersionHistory from '~/lib/components/dashboard/VersionHistory';
import DashboardHeader from '~/lib/components/layout/DashboardHeader';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Button from '~/lib/components/ui/Button';
import Select2 from '~/lib/components/ui/Select2';
import { yearOptions } from '~/lib/utils/formatter';

const Home = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

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

  const isSubmitDisabled = !selectedFile;

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <SimpleDashboardLayout>
      <DashboardHeader title="Welcome, Tunde 👋" />

      <VStack alignItems="stretch" spacing={6} w="full" mt={4}>
        <SimpleGrid columns={[1, 10]} spacing={4} w="full">
          <Select2
            name="year"
            options={yearOptions()}
            placeholder="Select Year"
            size="md"
          />
          <Button
            text="Dashboard"
            size="md"
            px={14}
            onClick={handleDashboard}
          />
        </SimpleGrid>

        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          Information Technology
        </Text>

        <UploadBudgetCard
          selectedFileName={selectedFileName}
          isSubmitDisabled={isSubmitDisabled}
          onFileChange={handleFileChange}
        />

        {/* Status and Version History */}
        <SimpleGrid columns={[1, 2]} spacing={4} w="full">
          <SubmissionStatus />
          <VersionHistory />
        </SimpleGrid>

        <Comments />
      </VStack>
    </SimpleDashboardLayout>
  );
};

export default Home;
