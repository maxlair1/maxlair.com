import CodeBlock from '@components/CodeBlock';
import Badge from '@components/Badge';
import DataTable from '@components/DataTable';

export const MarkdownComponents = {

  // Code Block and Inline using SRCL 
  code: ({node, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '');
    
    return match 
      ? <CodeBlock className={className}>{children}</CodeBlock>
      // replace badge with custom inline code component
      : <Badge {...props}>{children}</Badge>;
  },

  
}