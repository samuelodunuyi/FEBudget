'use client';

import {
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button as ChakraButton,
  useDisclosure,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';

import { logOut } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';

const SessionCheck = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkSession = () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const timeToExpire = decodedToken.exp - currentTime;
        const fiveMinutesInSeconds = 5 * 60;

        if (decodedToken.exp < currentTime) {
          // Token already expired
          dispatch(logOut());
          toast({
            title: 'Session expired',
            description: 'Please log in again',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        } else if (timeToExpire <= fiveMinutesInSeconds) {
          // Token will expire in less than 5 minutes
          onOpen();
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();

    // Check periodically (every minute)
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [toast, dispatch, onOpen]);

  const handleLogout = () => {
    dispatch(logOut());
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Session Expiring Soon
          </AlertDialogHeader>

          <AlertDialogBody>
            Your session will expire in less than 5 minutes.
          </AlertDialogBody>

          <AlertDialogFooter>
            <ChakraButton ref={cancelRef} onClick={handleLogout}>
              Log Out
            </ChakraButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SessionCheck;
