import { Box, Text } from '@chakra-ui/react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface RichTextDisplayProps {
  content: string;
  maxWidth?: string;
  fontSize?: string;
  fallbackProps?: Record<string, any>;
}

// Component to display draft.js content in read-only mode
const RichTextDisplay = ({
  content,
  maxWidth = '200px',
  fontSize = '12px',
  fallbackProps = {},
}: RichTextDisplayProps) => {
  if (!content) return <Text fontSize={fontSize}>No content</Text>;

  try {
    // Try to parse as JSON (new format)
    const rawContentState = JSON.parse(content);
    const contentState = convertFromRaw(rawContentState);
    const editorState = EditorState.createWithContent(contentState);

    return (
      <Box maxW={maxWidth}>
        <Editor
          editorState={editorState}
          readOnly
          toolbarHidden
          wrapperStyle={{ border: 'none' }}
          editorStyle={{
            border: 'none',
            padding: 0,
            fontSize,
            lineHeight: '1.4',
          }}
        />
      </Box>
    );
  } catch {
    // Fallback to plain text for old format or invalid JSON
    return (
      <Text
        fontSize={fontSize}
        maxW={maxWidth}
        whiteSpace="wrap"
        {...fallbackProps}
      >
        {content}
      </Text>
    );
  }
};

export default RichTextDisplay;
