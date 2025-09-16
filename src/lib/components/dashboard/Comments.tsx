'use client';

import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  Textarea as ChakraTextarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import Button from '~/lib/components/ui/Button';
import {
  useGetBudgetChatsQuery,
  useCreateBudgetChatMutation,
} from '~/lib/redux/services/budgetLine.service';

type CommentsProps = {
  budgetId: string;
};

const Comments = ({ budgetId }: CommentsProps) => {
  const toast = useToast();
  const {
    data,
    isLoading,
    isError,
  } = useGetBudgetChatsQuery(budgetId, {
    skip: !budgetId,
  });

  const [createBudgetChat, { isLoading: isSending }] =
    useCreateBudgetChatMutation();

  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await createBudgetChat({
        budgetId,
        message: newComment.trim(),
      }).unwrap();

      toast({
        title: 'Comment added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setNewComment('');
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.data?.message || 'Failed to add comment',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // prepare comments
  const comments = data?.data || [];
  let content;

  if (!budgetId) {
    // don’t show error while waiting for id
    content = <Text color="#808080">Loading budget...</Text>;
  }
  else if (isLoading) {
    content = <Text>Loading comments...</Text>;
  } else if (isError) {
    content = (
      <Text color="red.400">Failed to load comments. Please try again.</Text>
    );
  } else if (comments.length === 0) {
    content = <Text color="#808080">No comments yet</Text>;
  } else {
    content = comments.map((c: any, idx: number) => (
      <Box key={c.id}>
        <HStack justify="space-between" mb={1}>
          <Text color="headText.100" fontWeight={400} fontSize="14px">
            {c.sender || 'Unknown'}
          </Text>
          <Text color="#808080" fontSize="14px" fontWeight={400}>
            {new Date(c.createdAt).toLocaleString()}
          </Text>
        </HStack>
        <Text color="#808080" fontSize="14px" fontWeight={400}>
          {c.message}
        </Text>
        {idx < comments.length - 1 && <Divider mt={6} />}
      </Box>
    ));
  }

  return (
    <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
      <HStack spacing={3} mb={4} align="center">
        <Image src="/images/comment.svg" alt="comments" boxSize={6} />
        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          Comments ({comments.length || 0})
        </Text>
      </HStack>

      <VStack align="stretch" spacing={6}>
        {content}

        {/* Add new comment */}
        <Box>
          <ChakraTextarea
            placeholder="Add a comment"
            bg="white"
            borderColor="#EDEDED"
            fontSize="14px"
            fontWeight={400}
            color="#808080"
            borderRadius="10px"
            borderWidth="1px"
            borderStyle="solid"
            _focus={{ borderColor: 'brand.100' }}
            rows={6}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <HStack justify="flex-end" mt={6}>
            <Button
              text={isSending ? 'Adding...' : 'Add Comment'}
              onClick={handleAddComment}
              isDisabled={isSending}
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Comments;
