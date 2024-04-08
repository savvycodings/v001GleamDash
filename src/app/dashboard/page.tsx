"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { ConfirmedTransaction } from "@solana/web3.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { MainNav } from "@/components/main-nav";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Search } from "@/components/search";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";

import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  type ConfirmedTransaction = any;
  const [transactions, setTransactions] = useState<
    (ConfirmedTransaction | null)[]
  >([]);
  const [carbonReduction, setCarbonReduction] = useState({
    value: 0,
    change: 0,
  });
  const [carbonOffset, setCarbonOffset] = useState({ value: 0, change: 0 });
  const [carbonCreditSales, setCarbonCreditSales] = useState({
    value: 0,
    change: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      const connection = new Connection("https://api.devnet.solana.com");
      const publicKey = new PublicKey(
        "9ogReb3EL41JgqkV54YMKsxao14NSdA2ad4tLEbpFuhm"
      ); // replace with your public key
      const confirmedSignatures =
        await connection.getConfirmedSignaturesForAddress2(publicKey);
      const transactionDetails = await Promise.all(
        confirmedSignatures.map((signatureInfo) =>
          connection.getConfirmedTransaction(signatureInfo.signature)
        )
      );
      setTransactions(transactionDetails);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    // Perform some calculation
    const value = -2350;
    const change = value * 0.5; // 50% increase from last month
    setCarbonReduction({ value, change });
  }, []);

  useEffect(() => {
    // Perform some calculation
    const value = 12234;
    const change = value * 0.2; // 20% increase from last month
    setCarbonOffset({ value, change });
  }, []);

  useEffect(() => {
    // Perform some calculation
    const value = 573;
    const change = value * 0.35; // 35% increase since last hour
    setCarbonCreditSales({ value, change: Number(change.toFixed(2)) });
  }, []);

  return (
    <div className="m-4 w-full md:w-3/4  px-4 mx-auto flex flex-col space-y-4">
      {/* <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div> */}
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6 px-8" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <Button className="flex items-center space-x-2">
                9og.....bpFuhm
              </Button>
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 px-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold font-joystix tracking-tight py-6">
              Gleam
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button variant="secondary">Export</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="sm:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-joystix">
                      Contribute to a Greener Future
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Mint carbon credits to fund projects reducing carbon
                      emissions and fighting climate change.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Mint Now</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 space-y-4">
                        <div
                          className="grid gap-4"
                          style={{ overflow: "none" }}
                        >
                          <div className="space-y-4">
                            <h4 className="font-joystix font-medium leading-none">
                              Mint Carbon Credits
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Enter the amount of carbon credits you want to
                              mint.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="amount">Amount</Label>
                              <Input
                                id="amount"
                                defaultValue={transactions.length}
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div style={{ overflow: "none" }}>
                              <Button
                                className="col-span-3 px-4 space-y-4"
                                onClick={() => setShowCard(true)}
                              >
                                Confirm Minting
                              </Button>
                              {showCard && <EvervaultCard text="Gleam" />}
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-joystix text-sm font-medium">
                      Total Carbon Footprint
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {transactions.length} Grams Of Co2
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-joystix text-sm font-medium">
                      Carbon Negative
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {carbonReduction.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {carbonReduction.change}% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle className="font-joystix">
                      Carbon Footprint Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle className="font-joystix">
                      Recent Contributions By Your Teams
                    </CardTitle>
                    <CardDescription>
                      You made 265 contributions this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
