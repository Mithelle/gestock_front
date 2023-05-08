import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import DashboardLayout from '@/component/Layout';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

export default function AdminPage(){
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <DashboardLayout>
                <ul>
                   <li>
                    <Link href="/stores/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30'>depots</Link>
                    </li>
                    <li>
                    <Link href="/shops/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30>annexes'>annexes</Link>
                    </li>
                    <li>
                    <Link href="/users/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30'>utlisateurs</Link>
                    </li>
                    <li>
                    <Link href="/customers/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30'>Clients</Link>
                    </li>
                    <li>
                    <Link href="/suppliers/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30'>Fournisseurs</Link>
                    </li>
                    <li>
                    <Link href="/products/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30'>Produits</Link>
                    </li>
                    <li>
                    <Link href="/productFamilies/" className='transition-colors hover:border-gray-400 hover:bg-gray-200 hover:dark:border-neutral-800 hover:dark:bg-neutral-900/30'>Famille de produits</Link>
                    </li>
                    

        </ul>

    </DashboardLayout>
  );
};


