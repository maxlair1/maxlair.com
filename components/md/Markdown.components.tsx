import CodeBlock from '@root/components/CodeBlock';
import Badge from '@root/components/Badge';


export const MarkdownComponents = {
    code: ({node, className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || '');
      
      return match 
        ? <CodeBlock className={className}>{children}</CodeBlock>
        // replace badge with custom inline code component
        : <Badge {...props}>{children}</Badge>;
    }
}