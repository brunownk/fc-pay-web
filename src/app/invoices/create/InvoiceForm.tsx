'use client';

import { CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { createInvoiceAction } from './create-invoice-action';

export function InvoiceForm() {
  return (
    <form action={createInvoiceAction}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-gray-300">
              Valor (R$)
            </label>

            <Input
              id="amount"
              name="amount"
              type="number"
              step={0.01}
              min={0}
              defaultValue={0.01}
              placeholder="0,00"
              className="border-gray-700 bg-[#2a3749] text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-gray-300">
              Descrição
            </label>

            <Textarea
              id="description"
              name="description"
              placeholder="Descreva o motivo do pagamento"
              defaultValue={'Pagamento de fatura'}
              className="min-h-[120px] border-gray-700 bg-[#2a3749] text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="rounded-lg bg-[#232f43] p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Dados do Cartão</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="block text-gray-300">
                Número do Cartão
              </label>

              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000000000000000"
                  defaultValue={'1111111111111111'}
                  maxLength={16}
                  className="border-gray-700 bg-[#2a3749] pl-10 text-white placeholder-gray-400"
                />

                <CreditCard className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="block text-gray-300">
                  Data de Expiração
                </label>

                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  defaultValue={'12/25'}
                  className="border-gray-700 bg-[#2a3749] text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cvv" className="block text-gray-300">
                  CVV
                </label>

                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  defaultValue={'123'}
                  className="border-gray-700 bg-[#2a3749] text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="cardholderName" className="block text-gray-300">
                Nome no Cartão
              </label>

              <Input
                id="cardholderName"
                name="cardholderName"
                placeholder="Como aparece no cartão"
                defaultValue={'Nome Sobrenome'}
                className="border-gray-700 bg-[#2a3749] text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resumo de Valores */}
      {/* <div className="mt-8 border-t border-gray-800 pt-4">
        <div className="flex justify-between py-2">
          <span className="text-gray-300">Subtotal</span>
          <span className="text-white">
            R$ {value.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-300">Taxa de Processamento (2%)</span>
          <span className="text-white">
            R$ {processingFee.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="flex justify-between py-4">
          <span className="text-xl font-semibold text-white">Total</span>
          <span className="text-xl font-semibold text-white">
            R$ {total.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div> */}

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" className="border-gray-700 bg-[#2a3749]">
          Cancelar
        </Button>

        <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
          <CreditCard className="mr-2 h-4 w-4" />
          Processar Pagamento
        </Button>
      </div>
    </form>
  );
}
