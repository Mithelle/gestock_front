import React, {PropsWithChildren, useState} from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import AuthLayout from './auth-layout';
import Link from 'next/link';
import { BeakerIcon, BellAlertIcon, HomeIcon, HomeModernIcon } from '@heroicons/react/24/solid'

const routesLink = [
  { href: "/admin", name: "Admin", icon: HomeIcon},
  { href: "/shops", name: "Boutiques", icon: HomeIcon},
  { href: "/stores", name: "Depots", icon: HomeIcon},
  { href: "/users", name: "Utilisateurs", icon: HomeIcon},
  { href: "/customers", name: "Clients", icon: HomeIcon},
  { href: "/suppliers", name: "Fournisseurs", icon: HomeIcon},
  { href: "/products", name: "Produits", icon: HomeIcon},
  { href: "/productFamilies", name: "Familles de produits", icon: HomeIcon},
  { href: "/measures", name: "Unités de mesure", icon: HomeIcon},
  { href: "/packages", name: "Conditionnements", icon: HomeIcon},
  { href: "/price-structures", name: "Structures de prix", icon: HomeIcon},
  { href: "/deliveries", name: "Livraison", icon: HomeIcon},
  { href: "/commands", name: "Commandes", icon: HomeIcon},
  { href: "/supplies", name: "Approvisionnements", icon: HomeIcon},
  { href: "/inventories", name: "Inventaires", icon: HomeIcon},
  { href: "/invoices", name: "Factures", icon: HomeIcon},
  { href: "/invoices/index2", name: "Factures 2", icon: HomeIcon},
  { href: "/orders/order-form", name: " Bon de commande ", icon: HomeIcon},
];

export default function DashboardLayout({title = 'Titre de la page', children}: PropsWithChildren<{title?: string}>){
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AuthLayout>
      <main className="flex h-screen">
          <ul className="w-56 flex-grow bg-gray-100 p-3 font-semibold text-gray-800 overflow-y-scroll">
              <li className="flex h-[80px] items-center pl-3">
                  <span className="">GESTOCK</span>
              </li>
              {routesLink.map((route) => (
                  <li key={route.href}>
                      <CustomLink href={route.href} name={route.name} Icon={route.icon} />
                  </li>
              ))}

          </ul>

          <div className="w-[calc(100%-14rem)]">
              <header className="flex h-[80px] items-center justify-between border-b-2 px-4">
                  <h4>{title}</h4>
                  <div>
                      <button className="flex items-center gap-x-2">
                          <div className="text-right text-sm">
                              <p>Nom et Prénom</p>
                              <p>Email</p>
                          </div>
                          <img alt="Photo de profile" className="aspect-square h-12 w-12 rounded-full object-cover"
                               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                      </button>
                  </div>
              </header>

              <div className="h-[calc(100%-80px)] p-3">
                  {children}
              </div>
          </div>
      </main>
     </AuthLayout>
  );
};


function CustomLink(props: { href: string, name: string, Icon: any }) {
  const { href, name, Icon } = props;
  return  (
      <Link href={href} className='flex items-center text-gray-600 w-full p-2 mt-2 text-sm rounded-lg hover:bg-gray-200 '>
        <Icon className='w-6 h-6 pr-2 text-gray-500 ' />
        <span>
          {name}
        </span>
      </Link>
  );
}

