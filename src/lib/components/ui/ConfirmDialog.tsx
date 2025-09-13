import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: any;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  confirmBgColor?: string;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  isDisabled = false,
  confirmBgColor = '#FF3B30',
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            color="headText.100"
            fontSize="lg"
            fontWeight="600"
          >
            {title}
          </AlertDialogHeader>

          <AlertDialogBody color="headText.100" fontSize={14} fontWeight={400}>
            {message}
          </AlertDialogBody>

          <AlertDialogFooter w="full">
            <Button
              ref={cancelRef}
              onClick={onClose}
              w="full"
              bg="#EDEDED"
              borderRadius="10px"
              fontWeight={400}
              fontSize={14}
            >
              {cancelText}
            </Button>
            <Button
              bg={confirmBgColor}
              color="white"
              onClick={handleConfirm}
              ml={3}
              w="full"
              borderRadius="10px"
              fontWeight={400}
              fontSize={14}
              isLoading={isLoading}
              isDisabled={isDisabled}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
