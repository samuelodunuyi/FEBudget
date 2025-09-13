'use client';

import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  Textarea as ChakraTextarea,
} from '@chakra-ui/react';

import Button from '~/lib/components/ui/Button';

export type CommentItem = {
  author: string;
  date: string;
  text: string;
};

type CommentsProps = {
  title?: string;
  comments?: CommentItem[];
};

const defaultComments: CommentItem[] = [
  {
    author: 'Finance Head',
    date: 'Jan 12, 2024 at 1:00 AM',
    text: 'Please revise the training budget allocation. The amount seems excessive for Q2.',
  },
  {
    author: 'Finance Head',
    date: 'Jan 12, 2024 at 1:00 AM',
    text: 'Please revise the training budget allocation. The amount seems excessive for Q2.',
  },
];

const Comments = ({
  title = 'Comments',
  comments = defaultComments,
}: CommentsProps) => {
  return (
    <Box bg="white" rounded="16px" p={4} border="1px solid #EDEDED">
      <HStack spacing={3} mb={4} align="center">
        <Image src="/images/comment.svg" alt="comments" boxSize={6} />
        <Text fontSize={['md', 'lg']} fontWeight="600" color="headText.100">
          {title} ({comments.length})
        </Text>
      </HStack>

      <VStack align="stretch" spacing={6}>
        {comments.map((c, idx) => (
          <Box key={idx}>
            <HStack justify="space-between" mb={1}>
              <Text color="headText.100" fontWeight={400} fontSize="14px">
                {c.author}
              </Text>
              <Text color="#808080" fontSize="14px" fontWeight={400}>
                {c.date}
              </Text>
            </HStack>
            <Text color="#808080" fontSize="14px" fontWeight={400}>
              {c.text}
            </Text>
            {idx < comments.length - 1 && <Divider mt={6} />}
          </Box>
        ))}

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
          />
          <HStack justify="flex-end" mt={6}>
            <Button text="Add Comment" />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Comments;
