import React, { useState } from 'react';
import {
  BellOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import AuthLayout from './auth-layout';
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

export default function DashboardLayout({children}){
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    // <AuthLayout>

    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
       >
        <Menu.Item style={{display:'flex'}}>
        <HomeOutlined/>
          <Link href="/admin">Acceuil</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/shops">Annexe</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/stores">Dépot</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/users" >Utilisateur</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/customers" >Client</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/suppliers" >Fournisseur</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/products" >Produit</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/productFamilies" >Famille de produits</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/measures" >Unités de mesure</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/packages" >Conditionnements</Link>
          </Menu.Item>
          <Menu.Item>
          <Link href="/price-structures" >Structure de prix</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/deliveries" >Livraison</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/commands" >Commande</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/supplies" >Approvisionnement</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/inventories" >Inventaire</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/invoices" >Facture</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/invoices/index2" >Facture2</Link>
        </Menu.Item>
       </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background:'blue', borderRadius: '5%', marginLeft: '30px', marginRight: '30px'}}>

        <div style={{margin: '0 0 0 700px', display: 'flex' }} >
          <UserOutlined/> Se connecter
        <SettingOutlined />
        <BellOutlined />
        </div>

        </Header>
        <Content style={{ margin: '0 16px' }}>
        <body className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-700 leading-default bg-gray-50 text-slate-500">
        <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>

          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <main className=''>
            {children}
          </main>
          </body>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant Mith</Footer>
      </Layout>
    </Layout>
    // </AuthLayout>
  );
};


