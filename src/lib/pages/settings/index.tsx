'use client';

import {
  VStack,
  Text,
  HStack,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { useMemo, useState, useCallback } from 'react';

import HeaderBack from '~/lib/components/layout/HeaderBack';
import SimpleDashboardLayout from '~/lib/components/layout/SimpleDashboardLayout';
import Department from '~/lib/components/settings/Department';
import Departments from '~/lib/components/settings/Departments';
import Logs from '~/lib/components/settings/Logs';
import Role from '~/lib/components/settings/Role';
import User from '~/lib/components/settings/User';
import Users from '~/lib/components/settings/Users';
import Button from '~/lib/components/ui/Button';

const tabListStyle = {
  bg: 'white',
  borderRadius: 'md',
  width: 'fit-content',
};

const tabStyle = {
  _selected: {
    bg: '#EDEDED',
    color: '#227CBF',
    fontWeight: 'medium',
  },
  color: '#808080',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  fontWeight: '400',
  borderRadius: '0',
};

const Settings = () => {
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [activeModal, setActiveModal] = useState<React.ReactNode | null>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  const openModal = (
    modalComponent: React.ReactNode,
    title: string,
    data?: any
  ) => {
    setActiveModal(modalComponent);
    setModalTitle(title);
    setSelectedData(data);
    setIsOpen(true);
  };

  const handleOpenDrawer = useCallback((data: any, tabKey: string) => {
    const titles: { [key: string]: string } = {
      Users: 'User',
      Departments: 'Department',
    };

    const title = data ? `View ${titles[tabKey]}` : `Add New ${titles[tabKey]}`;

    let modalComponent;

    switch (tabKey) {
      case 'Users':
        modalComponent = <User onClose={handleClose} data={data} />;
        break;
      case 'Departments':
        modalComponent = <Department onClose={handleClose} data={data} />;
        break;
      default:
        modalComponent = (
          <Box>
            <Text>Unknown tab type</Text>
          </Box>
        );
        break;
    }

    openModal(modalComponent, title, data);
  }, []);

  const SettingsTabs = useMemo(
    () => [
      {
        keys: 'Users',
        tab: 'Users',
        title: 'Users',
        component: (
          <Users
            onOpenDrawer={(data: any) => handleOpenDrawer(data, 'Users')}
          />
        ),
        buttonText: 'Add User',
        modalComponent: <User onClose={handleClose} data={selectedData} />,
        modalTitle: selectedData ? 'View User' : 'Add New User',
      },
      {
        keys: 'Departments',
        tab: 'Departments',
        title: 'Departments',
        component: (
          <Departments
            onOpenDrawer={(data: any) => handleOpenDrawer(data, 'Departments')}
          />
        ),
        buttonText: 'Add Department',
        modalComponent: (
          <Department onClose={handleClose} data={selectedData} />
        ),
        modalTitle: selectedData ? 'View Department' : 'Add New Department',
      },
      {
        keys: 'Roles',
        tab: 'Roles',
        title: 'Roles',
        component: <Role />,
      },
      {
        keys: 'Activity log',
        tab: 'Activity log',
        title: 'Activity log',
        component: <Logs />,
      },
    ],
    [selectedData, handleOpenDrawer]
  );

  // Get current active tab
  const currentTab = SettingsTabs[activeTabIndex];

  return (
    <SimpleDashboardLayout>
      <HeaderBack />
      <VStack mt={4} alignItems="stretch" w="full" spacing={6}>
        <HStack justifyContent="space-between" w="full">
          <Text
            color="headText.100"
            fontSize={['lg', 'xl']}
            fontWeight="500"
            textTransform="capitalize"
          >
            Settings
          </Text>

          {/* Only show button if current tab has buttonText (excludes Activity log) */}
          {currentTab?.buttonText && (
            <Button
              text={currentTab.buttonText}
              bg="brand.300"
              onClick={() =>
                openModal(currentTab.modalComponent, currentTab.modalTitle)
              }
            />
          )}
        </HStack>

        <Tabs
          variant="enclosed"
          size="lg"
          index={activeTabIndex}
          onChange={(index) => setActiveTabIndex(index)}
        >
          <HStack justify="space-between">
            <TabList
              {...tabListStyle}
              overflowX="auto"
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              borderColor="#EDEDED"
              borderWidth="1px"
              borderRadius="8px"
            >
              {SettingsTabs.map((tab) => (
                <Tab key={tab.tab} {...tabStyle}>
                  {tab.tab}
                </Tab>
              ))}
            </TabList>
          </HStack>

          <TabPanels>
            {SettingsTabs.map((tab) => (
              <TabPanel key={tab.keys} px="0" pt="4">
                {tab.component}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>

      <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="headText.100" />
          <DrawerHeader color="headText.100" fontSize="18px" fontWeight="600">
            {modalTitle}
          </DrawerHeader>

          <DrawerBody>{activeModal}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </SimpleDashboardLayout>
  );
};

export default Settings;
