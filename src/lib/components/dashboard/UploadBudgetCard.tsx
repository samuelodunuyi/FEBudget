'use client';

import { Box, Center, HStack, Image, Text, VStack } from '@chakra-ui/react';

import Button from '~/lib/components/ui/Button';

type UploadBudgetCardProps = {
  selectedFileName?: string;
  isSubmitDisabled?: boolean;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

const UploadBudgetCard = ({
  selectedFileName = '',
  isSubmitDisabled = true,
  onFileChange,
  onSubmit,
}: UploadBudgetCardProps) => {
  return (
    <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
      <HStack spacing={3} mb={4} align="center">
        <Image src="/images/upload-3.svg" alt="Upload" boxSize={6} />
        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          Upload Budget Document
        </Text>
      </HStack>

      <Box
        border="1px dashed #EDEDED"
        rounded="10px"
        p={[6, 10]}
        position="relative"
      >
        <Center flexDirection="column" textAlign="center" gap={2}>
          <Image src="/images/upload.svg" alt="upload" />
          <VStack spacing={0}>
            <Text color="brand.100" fontWeight={400} fontSize="sm" as="span">
              {selectedFileName ? 'Selected file:' : 'Click to upload '}
              {selectedFileName ? (
                <Text as="span" color="#808080" fontSize="sm">
                  {' '}
                  {selectedFileName}
                </Text>
              ) : (
                <Text color="bodyText.300" fontSize="sm" as="span">
                  Files
                </Text>
              )}
            </Text>
            <Text color="bodyText.300" fontSize="sm" as="span">
              Supports PDF, DOCX, XLSX files
            </Text>
          </VStack>
        </Center>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={onFileChange}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      </Box>

      <HStack justify="flex-end" mt={4}>
        <Button
          text="Submit Budget"
          size="md"
          isDisabled={isSubmitDisabled}
          onClick={onSubmit}
        />
      </HStack>
    </Box>
  );
};

export default UploadBudgetCard;
