import * as React from 'react';
import './Footer.module.css';
import Divider from './Divider';
import Indent from './Indent';
import Grid from './Grid';
import ListItem from './ListItem';
import Link from 'next/link';

const FooterLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
];

const Footer = () => {
  return (
    <>
      <Divider/>
      <Grid>
        <Indent>
          {FooterLinks.map(link => (
            <div>
                <Link href={link.href} style={{ color: 'var(--theme-muted-foreground)' }}>
                {link.name}
                </Link>
            </div>
          ))}
        </Indent>
      </Grid>
    </>
  );
};

export default Footer;
