import type { Metadata, Viewport } from 'next';

import Providers from '~/app/providers';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'Budget Management System 1.0';
const APP_URL = 'https://ta.infracredit.ng';
const APP_DESCRIPTION = 'Budget Management System 1.0';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | Budget Management System 1.0' },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: APP_URL,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: {
      url: '',
      alt: '',
    },
  },
  twitter: {
    creator: '@mikie_1',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
