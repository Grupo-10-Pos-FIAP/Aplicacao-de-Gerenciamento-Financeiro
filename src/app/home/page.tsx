"use client";

import { Card, Header, Icon, IconButton, ListItem } from "@grupo10-pos-fiap/design-system";
import { useEffect, useState } from "react";
import { UserMenu } from "./avatar";
import { UserMenuProps } from "./avatar/interfaces";

export default function HomePage() {
  const [user, setUser] = useState<UserMenuProps | null>(null);
  const [loading, setLoading] = useState(true);

    function getTodayDate() {
        const today = new Date();

        const weekday = today.toLocaleDateString("pt-BR", { weekday: "long" });

        const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${
        String(today.getMonth() + 1).padStart(2, "0")
        }/${today.getFullYear()}`;

        const fullDate = `${weekday}, ${formattedDate}`;

        return fullDate;
    }

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => {
        if (data) setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <div className="flex flex-col bg-[#F4F4F4]">
        <div className="!pb-4 !pt-5 !pr-20 !pl-20 w-full bg-[#FFFFFF]">
            <div className="flex items-center justify-between">
            <Header logo="/Invest+ 1.png" className="!pr-0 !pl-0" />
                {user && <UserMenu {...user} />}
            </div>
        </div>
        <div className="flex gap-6 !pr-20 !pl-20 !pt-10 h-[780px] min-w-[1280px]">
            <div className="flex flex-1 flex-col gap-6 h-full">
                <div className="flex flex-col !pr-3 !pl-3 gap-2">
                    <h3 className="font-bold text-3xl text-[#1A1A1A]">Bem vindo, {user?.name}</h3>
                    <p className="font-normal text-sm text-[#555555]">{getTodayDate()}</p>
                </div>
                <div className="flex flex-col ">
                    <div className="w-full flex justify-center !pr-2 !pl-2 !pt-3 !pb-3">
                        <div className="w-full h-px bg-gray-200"></div>
                    </div>
                    <div>
                        <ListItem label="Inicio" icon="House" onClick={() => alert("Go home")} />
                        <ListItem label="Transação" icon="Repeat" onClick={() => alert("Go to transactions")} />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-6 h-full">
                <div className="flex flex-col gap-6 rounded-[24px] !p-6 bg-gradient-to-r from-[#1C6EA4] to-[#658864]">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-2xl text-white">Saldo</p>
                        <IconButton className="hover:!bg-transparent !text-white" icon={visible ? "Eye" : "EyeOff"} size="medium" variant="transparent" onClick={() => setVisible(!visible)} />
                    </div>
                    {visible && (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                            <p className="font-bold text-xl text-white">R$ 5000,00</p>
                            <Icon name="ArrowUpRight" size="small" color="white" />
                        </div>
                        <p className="font-normal text-xs text-white">Rendeu 3% desde o mês passado</p>
                    </div>
                    )}
                </div>
                <p>Componente de nova transferencia aqui</p>
            </div>
            <div className="h-[780px] flex-1 !p-6 flex flex-col gap-2 bg-white rounded-3xl">
                    <h3 className="font-bold text-[#1C2024] text-2xl">Extrato</h3>
                    <div className="p-3 rounded-lg flex gap-3 bg-white/80">
                        <div className="flex flex-1 flex-col gap-3">
                            <div className="flex gap-2 items-center">
                                <Icon name="ArrowUpRight" size="small" color="error" />
                                <p className="text-[#555555] font-normal text-xs">Transferência efetuada</p>
                            </div>
                            <p className="font-bold text-lg text-[#1C2024]">R$ 5.000,00</p>
                        </div>
                        <div className="flex flex-1"></div>
                    </div>
            </div>
        </div>
    </div>
  );
}