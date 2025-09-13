/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Image,
  Box,
  Text,
  HStack,
  Input as ChakraInput,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';

interface FileInputProps {
  label: string;
  name: string;
  onChange?: (file: File | null, base64?: string | null) => void;
  url?: string | File;
  error?: string;
}

const FileInput = ({ label, name, onChange, url, error }: FileInputProps) => {
  const splitfileName =
    typeof url === 'string' ? url?.split('/').pop() || '' : '';

  const [fileName, setFileName] = useState<string>(splitfileName || '');

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Shorten the file name if it's too long
      const shortenedName =
        file.name.length > 20
          ? `${file.name.substring(0, 17)}...${file.name.slice(-3)}`
          : file.name;
      setFileName(shortenedName);

      try {
        // Convert file to base64
        const base64WithPrefix = await convertToBase64(file);

        // Remove the data URI prefix (e.g., "data:application/pdf;base64,")
        const base64 = base64WithPrefix.substring(
          base64WithPrefix.indexOf(',') + 1
        );

        onChange?.(file, base64);
      } catch (error) {
        console.error('Error converting file to base64:', error);
        onChange?.(file, null);
      }
    } else {
      setFileName('');
      onChange?.(null, null);
    }
  };

  const handleViewFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (typeof url === 'string' && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box>
      <Text color="headText.100" fontWeight={400} fontSize={12} mb={1}>
        {label}
      </Text>
      <HStack
        position="relative"
        bg="#EDF5FE"
        border="1px solid #EDEDED"
        borderRadius="8"
        h="50px"
        w="100%"
        spacing={0}
        align="center"
        justify="space-between"
        px={4}
        cursor="pointer"
      >
        <HStack alignItems="center">
          <Image src="/images/upload.svg" alt="upload" boxSize={6} />
          <Text color="headText.100" fontSize={12} noOfLines={1}>
            {fileName || 'No file selected'}
          </Text>
        </HStack>

        {typeof url === 'string' && url && (
          <IconButton
            aria-label="View file"
            icon={<Image src="/images/eye-2.svg" alt="view file" boxSize={6} />}
            size="sm"
            variant="ghost"
            onClick={handleViewFile}
            position="relative"
            zIndex={10}
            _hover={{
              bg: 'gray.100',
            }}
          />
        )}

        <ChakraInput
          name={name}
          type="file"
          bg="#EDF5FE"
          borderWidth={0}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          height="100%"
          width="100%"
          opacity={0}
          cursor="pointer"
          onChange={handleFileChange}
        />
      </HStack>
      {error && (
        <Text color="red.500" fontSize={12} mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default FileInput;
