import { Center, Flex, Icon, Text } from '@chakra-ui/react';
import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

const EmptyState = ({
  message = 'No data found',
  subMessage = 'There are no items to display at the moment.',
}: EmptyStateProps) => {
  return (
    <Center py={10} flexDirection="column" w="100%">
      <Flex
        bg="gray.50"
        borderRadius="full"
        w="80px"
        h="80px"
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        <Icon as={FiInbox} boxSize={10} color="gray.400" />
      </Flex>
      <Text
        fontSize="lg"
        fontWeight={600}
        color="headText.100"
        textAlign="center"
        mb={2}
      >
        {message}
      </Text>
      <Text fontSize="sm" color="gray.500" textAlign="center" maxW="400px">
        {subMessage}
      </Text>
    </Center>
  );
};

export default EmptyState;
