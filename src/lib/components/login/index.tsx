'use client';

import { useMsal } from '@azure/msal-react';
import {
  Flex,
  Stack,
  Image,
  Text,
  VStack,
  Center,
  useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '../ui/Button';
import { loginRequest } from '~/authConfig';
import { useGetUserMeMutation } from '~/lib/redux/services/user.service';
import { setCredentials, setRole } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const { instance } = useMsal();

  const [isLoading, setIsLoading] = useState(false);

  const [getUserMe, { isLoading: isLoadingUserMe }] = useGetUserMeMutation();

  const handleSingleSignIn = () => {
    setIsLoading(true);
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        const { accessToken } = res;
        const email = res.account?.username;
        const data = { email };
        const payload = { data, token: accessToken };
        Cookies.set('token', accessToken, { expires: 1 });
        dispatch(setCredentials(payload));
        getUserMe(email)
          .unwrap()
          .then((res) => {
            const payload = {
              data: res.data,
              token: Cookies.get('token'),
            };
            dispatch(setCredentials(payload));
            dispatch(setRole(res?.data?.role));
            const role = res?.data?.role;
            Cookies.set('role', role.toString());
            toast({
              title: 'Login successful',
              description: 'You have been logged in successfully',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
            router.push('/');
            setIsLoading(false);
          })
          .catch(() => {
            toast({
              title: 'Login failed',
              description: 'Login failed, please try again',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
            setIsLoading(false);
          });
      })
      .catch(() => {
        toast({
          title: 'Login failed',
          description: 'Login failed, please try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bg="brand.100"
      h="100vh"
      p={6}
      w="100%"
      bgImage={`url('/images/auth-bg.svg')`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Stack
        spacing={10}
        rounded="20px"
        bg="white"
        boxShadow="lg"
        p={12}
        maxW="md"
        w="100%"
        align="center"
      >
        <Image src="/images/logo.svg" w="200px" alt="logo" />

        <VStack spacing={0} w="100%">
          <Text
            fontSize="lg"
            fontWeight="700"
            color="headText.500"
            textAlign="center"
          >
            Budget Management System 1.0
          </Text>
          <Text
            fontSize="md"
            color="bodyText.100"
            textAlign="center"
            fontWeight="300"
          >
            Click below to access your account
          </Text>
        </VStack>
        <Center>
          <Button
            text="Sign In"
            width="240px"
            onClick={handleSingleSignIn}
            isLoading={isLoading || isLoadingUserMe}
            isDisabled={isLoading || isLoadingUserMe}
          />
        </Center>
      </Stack>
    </Flex>
  );
};

export default Login;
