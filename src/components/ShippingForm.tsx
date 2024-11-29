"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShippingTable from "./ShippingTable";
import { Separator } from "./ui/separator";

export default function ShippingForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      customerName: "",
      destinationCountry: "",
      shipmentNumber: "",
      date: "",
      currency: "",
      factor: "",
      senderName: "",
      senderAddress: "",
      recipientName: "",
      recipientAddress: "",
      exporterName: "",
      exporterAddress: "",
      importerName: "",
      importerAddress: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 mx-auto space-y-6 max-w-7xl"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center md:text-2xl">
              معلومات الفاتورة
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="customerName">اسم الزبون</Label>
                <Input id="customerName" {...register("customerName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationCountry">البلد المقصود</Label>
                <Input
                  id="destinationCountry"
                  {...register("destinationCountry")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipmentNumber">رقم الارسالية</Label>
                <Input id="shipmentNumber" {...register("shipmentNumber")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">تاريخ</Label>
                <Input id="date" type="date" {...register("date")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">العملة</Label>
                <Input id="currency" {...register("currency")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="factor">المعامل</Label>
                <Input id="factor" {...register("factor")} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center md:text-2xl">
              معلومات الزبون
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="senderName">اسم المرسل</Label>
                <Input id="senderName" {...register("senderName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senderAddress">عنوانه</Label>
                <Input id="senderAddress" {...register("senderAddress")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientName">المرسل اليه</Label>
                <Input id="recipientName" {...register("recipientName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientAddress">عنوانه</Label>
                <Input
                  id="recipientAddress"
                  {...register("recipientAddress")}
                />
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="exporterName">Exporter Name</Label>
                <Input id="exporterName" {...register("exporterName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exporterAddress">Address</Label>
                <Input id="exporterAddress" {...register("exporterAddress")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="importerName">Importer Name</Label>
                <Input id="importerName" {...register("importerName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="importerAddress">Address</Label>
                <Input id="importerAddress" {...register("importerAddress")} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold md:text-2xl">
            Shipment Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ShippingTable />
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
