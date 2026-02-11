"use client"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { FiShoppingCart } from 'react-icons/fi';
import Currency from './Currency';
import { openCart } from '@/store/slices/cartSlice';
import { usePathname } from 'next/navigation';

export default function OrderSummary() {
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const cart = useAppSelector((state) => state.cart);
    const pathname = usePathname()
    const getSubTotal = (dt: ProductCart) => {
        return (
            dt.price * dt.qte +
            (dt.checkData.addon?.reduce((a, b) => a + b.price * b.qte, 0) ?? 0)
        );
    };

    const getTotal = useMemo(
        () => {
            return cart.items.reduce((acc, item) => acc + getSubTotal(item), 0);
        }, [cart]
    );
    return (
        getTotal == 0||pathname.includes("/checkout") ? null : <div
            onClick={() => dispatch(openCart(true))}
            className='fixed bottom-2 left-2 right-2 flex justify-center'>
            <div className="bg-primary cursor-pointer p-3 rounded-lg font-semibold shadow flex items-center justify-center gap-2 text-white w-full max-w-xl">
                <FiShoppingCart className="size-5!" />
                {t("your_order")}
                <strong>{getTotal.toFixed(2)}</strong>
                <small><Currency /></small>
            </div>
        </div>
    )
}
