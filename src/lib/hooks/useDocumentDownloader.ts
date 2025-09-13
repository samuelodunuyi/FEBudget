import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppSelector } from '../redux/store';
import { baseUrl } from '~/lib/redux/baseUrl';

interface Document {
  name: string;
  type: string;
  id?: number;
  documentType?: number;
  documentUrl?: string;
}

export const useDocumentDownloader = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const { token } = useAppSelector((state) => state.app.auth);
  const downloadDocument = async (doc: Document, openAfterDownload = false) => {
    // Reset error state
    setError(null);

    // Check for required document properties
    if (!doc.id || !doc.documentType) {
      const errorMsg = 'Document ID or type is missing';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    setIsDownloading(true);

    try {
      const response = await fetch(
        `${baseUrl}api/GreenGrowth/download-document?Id=${doc.id}&Type=${doc.documentType}`,
        {
          method: 'GET',
          headers: {
            accept: 'text/plain',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast({
          title: 'Error',
          description: `Error downloading document: ${response.statusText}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }

      // Create a blob from the response data
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      if (openAfterDownload) {
        // Open the document in a new tab
        window.open(url, '_blank');
      } else {
        // Create a temporary anchor element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name || 'document';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Clean up URL after a delay to ensure it's fully used
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error downloading document:', error);
      toast({
        title: 'Error',
        description: errorMsg,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setError(errorMsg);
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadDocument, isDownloading, error };
};
