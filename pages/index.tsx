import * as React from 'react';
import SidebarLayout from '@root/components/SidebarLayout';
import ExplorerPage from './explorer';
import PageLoading from '@root/components/PageLoading';
import Layout from './layout';

export default function HomePage() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const steps = 10;
    const duration = 1000;
    const timePerStep = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        currentStep = 0; // Loop
      }
    }, timePerStep);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
        <main style={{padding: 24}}>
            <PageLoading progress={progress} fullscreen={true}></PageLoading>
        </main>
    </Layout>
  );
}
