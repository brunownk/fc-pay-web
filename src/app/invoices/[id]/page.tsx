import { cookies } from 'next/headers';
import Link from 'next/link';

import { ArrowLeft, Download } from 'lucide-react';

import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export async function getInvoice(id: string) {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get('apiKey')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice/${id}`, {
    headers: {
      'X-API-Key': apiKey as string,
    },
    cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices/${id}`],
    },
  });
  return response.json();
}

export default async function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoiceData = await getInvoice(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
          <Link href="/invoices">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Fatura {id}</h1>
            <StatusBadge status={invoiceData.status} />
          </div>
          <p className="text-gray-400">
            Criada em {new Date(invoiceData.created_at).toLocaleDateString()}
          </p>
        </div>

        <Button variant="outline" className="border-gray-700 bg-[#2a3749]">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-[#1e293b] p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Informações da Fatura</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">ID da Fatura</span>
              <span className="font-medium text-white">{invoiceData.id}</span>
            </div>

            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Valor</span>
              <span className="font-medium text-white">{invoiceData.amount}</span>
            </div>

            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Data de Criação</span>
              <span className="font-medium text-white">
                {new Date(invoiceData.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between pb-2">
              <span className="text-gray-400">Descrição</span>
              <span className="font-medium text-white">{invoiceData.description}</span>
            </div>
          </div>
        </Card>

        <Card className="border-gray-800 bg-[#1e293b] p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Método de Pagamento</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Tipo</span>
              <span className="font-medium text-white">
                {invoiceData.payment_type === 'credit_card' ? 'Cartão de crédito' : 'Boleto'}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">Últimos Dígitos</span>
              <span className="font-medium text-white">{invoiceData.card_last_digits}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

//route handler /api/invoices/[id]/revalidate revalidatePath('....')
