

// 'use client';


// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { MenuItem, SubMenu } from 'react-pro-sidebar';
// // import { relativeUrl } from './relativeurl';


// // types.ts
// export type MenuItemConfig = {
//     label: string;
//     href?: string;            // optional link
//     accessName?: string; 
//     children?: MenuItemConfig[]; // if it has nested items
//   };

// const MenuItemRenderer = ({ item }: { item: MenuItemConfig }) => {
//     const pathname = usePathname();
//     // console.log('pathname', pathname);
//     // console.log('relativeUrl', relativeUrl);
//     // console.log('item.href', item.href);
//     // console.log(pathname === relativeUrl + item.href);
//     if (item.children && item.children.length > 0) {
//         return (
//             <SubMenu key={item.href} label={item.label}>
//                 {item.children.map((childItem) => (
//                     <MenuItemRenderer key={childItem.label} item={childItem} />
//                 ))}
//             </SubMenu>
//         );
//     }

//     return (
//         // <MenuItem 
//         //     key={item.href} 
//         //     active={pathname === relativeUrl + item.href || pathname.includes(relativeUrl + item.href || '')}
//         //     component={<Link href={relativeUrl + item.href || '#'} prefetch={true} />}>
//         //     {item.label}
//         // </MenuItem>  );

  
// };

// export default MenuItemRenderer;


