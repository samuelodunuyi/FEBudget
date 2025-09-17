'use client';

import type { FlexProps } from '@chakra-ui/react';
import {
  Flex,
  HStack,
  Text,
  Image,
  Box,
  Container,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

import ConfirmDialog from '~/lib/components/ui/ConfirmDialog';
import { logOut } from '~/lib/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/store';
import { getRole } from '~/lib/utils/formatter';

interface SimpleDashboardLayoutProps {
  children: React.ReactNode;
}

interface TopNavProps extends FlexProps {
  onLogoutClick: () => void;
}

const TopNav = ({ onLogoutClick, ...props }: TopNavProps) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return (
    <Flex
      px={['4', '6']}
      py={4}
      alignItems="center"
      bg="white"
      justifyContent="space-between"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      {...props}
    >
      <Box>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Company Logo"
            h="35px"
            objectFit="contain"
          />
        </Link>
      </Box>

      <Box>
<Text
  fontFamily="Outfit"
  fontWeight="700"
  fontStyle="normal"
  fontSize="33px"
  lineHeight="100%"
  letterSpacing="0"
  color="#227CBF"
>
  Budget <span style={{ color: '#47B65C' }}>Management</span> System 1.0
</Text>
      </Box>

      <HStack
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        spacing="4"
      >
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="md" color="#333333" fontWeight="600">
            {userInfo?.name || 'User'}
          </Text>
          <Text fontSize="12px" color="#333333" fontWeight="400" mt={-1}>
            {getRole(userInfo?.role)}
          </Text>
        </VStack>

        <Text
          fontSize="md"
          color="#333333"
          fontWeight="400"
          onClick={onLogoutClick}
          cursor="pointer"
        >
          Logout
        </Text>
      </HStack>

      <HStack
        display={{ base: 'flex', md: 'none' }}
        alignItems="center"
        spacing="2"
      >
        <Text
          fontSize="md"
          color="#333333"
          fontWeight="400"
          onClick={onLogoutClick}
          cursor="pointer"
        >
          Logout
        </Text>
      </HStack>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      position="relative"
      bottom={0}
      width="100%"
      px={['4', '6']}
    >
      <HStack justifyContent="space-between">
        <Image
          src="/images/logo.svg"
          alt="Company Logo"
          h="35px"
          objectFit="contain"
        />
        <HStack>
          <Box bg="brand.100" p={2} borderRadius="50%" cursor="pointer">
            <Image
              src="/images/fb.svg"
              alt="Facebook"
              boxSize="20px"
              objectFit="contain"
            />
          </Box>
          <Box bg="brand.100" p={2} borderRadius="50%" cursor="pointer">
            <Image
              src="/images/x.svg"
              alt="Twitter"
              boxSize="20px"
              objectFit="contain"
            />
          </Box>
          <Box bg="brand.100" p={2} borderRadius="50%" cursor="pointer">
            <Image
              src="/images/yt.svg"
              alt="LinkedIn"
              boxSize="20px"
              objectFit="contain"
            />
          </Box>
        </HStack>
      </HStack>

      <Container maxW="container.xl">
        <VStack spacing={2}>
          <HStack
            spacing={['2', '4']}
            justify="center"
            flexDirection={['column', 'row']}
            mt={['6', '0']}
          >
            <Text
              color="brand.100"
              fontSize={['14px', 'md']}
              fontWeight={700}
              textAlign="center"
              cursor="pointer"
            >
              © {new Date().getFullYear()} All rights reserved by InfraCredit
            </Text>
            <Text
              color="brand.100"
              fontSize={['14px', 'md']}
              fontWeight={700}
              cursor="pointer"
            >
              Privacy policy
            </Text>
            <Text
              color="brand.100"
              fontSize={['14px', 'md']}
              fontWeight={700}
              cursor="pointer"
            >
              Terms of Service
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

const SimpleDashboardLayout = ({ children }: SimpleDashboardLayoutProps) => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const onCloseDialog = () => setIsOpen(false);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Box minH="100vh" bg="#EDF5FE" position="relative">
      <TopNav onLogoutClick={() => setIsOpen(true)} />
      <Box p={['4', '8']} pb={20}>
        {children}
      </Box>
      <Footer />

      <ConfirmDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
        onConfirm={handleLogOut}
        title={`Logout ${userInfo?.email}?`}
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </Box>
  );
};

export default SimpleDashboardLayout;
