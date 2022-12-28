import styles from '../../styles/BackendLayout.module.css'
import React from "react";
import {House, Package, PuzzlePiece, Sliders} from "phosphor-react";
import Link from "next/link";

export default function Layout({children}) {
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.mainNavigationBar}>


                <div className={styles.mainNavigationMenuItem}>
                    <Link href={'/admin/'}>
                    <House size={52} color="#cc0505" />
                    <p className={styles.mainNavigationMenuItemTitle}>Home</p>

                </Link>
                </div>

                <div className={styles.mainNavigationMenuItem}>
                    <Package size={52} color="#cc0505" />
                    <p className={styles.mainNavigationMenuItemTitle}>Catalog</p>
                    <div className={styles.mainNavigationMenuItemDropdownContent}>
                        <a href="#">Products</a>
                        <a href="#">Categories</a>
                    </div>
                </div>
                <div className={styles.mainNavigationMenuItem}>
                    <PuzzlePiece size={52} color="#cc0505" />
                    <p className={styles.mainNavigationMenuItemTitle}>Attributes</p>
                    <div className={styles.mainNavigationMenuItemDropdownContent}>
                        <Link href="/admin/attribute/product">Product Attributes</Link>
                        <a href="#">Customer Attributes</a>
                        <a href="#">Order Attributes</a>

                        <a href="#">Attribute Sets</a>
                    </div>
                </div>
                <div className={styles.mainNavigationMenuItem}>
                    <Sliders size={52} color="#cc0505" />
                    <p className={styles.mainNavigationMenuItemTitle}>Settings</p>
                </div>
            </div>
            <div className={styles.mainContentContainer}>
                <div>
                    <h1>Backend Layout</h1>
                    {children}
                </div>
            </div>

        </div>)
}