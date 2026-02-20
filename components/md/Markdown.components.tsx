import CodeBlock from '@components/CodeBlock';
import Badge from '@components/Badge';
import DataTable from '@components/DataTable';
import BlockQuote from '@components/BlockQuote';
import AlertBanner from '../AlertBanner';

export const MarkdownComponents = {

  // Code Block and Inline using SRCL 
  code: ({node, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return match 
      ? <CodeBlock className={className}>{children}</CodeBlock>
      // replace badge with custom inline code component
      : <Badge {...props}>{children}</Badge>;
  },

  blockquote: ({node, children, ...props}) => {
    return <AlertBanner {...props}>{children}</AlertBanner>;
  }
}