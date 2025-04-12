import { cookies } from 'next/headers';
import Link from 'next/link';

import { Download, Eye, PlusIcon } from 'lucide-react';

// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';

type Invoice = {
  id: string;
  created_at: string;
  description: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
};

export async function getInvoices() {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get('apiKey')?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice`, {
    headers: {
      'X-API-Key': apiKey as string,
    },
    cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices`],
    },
  });

  return response.json();
}

export async function InvoiceList() {
  const invoices = await getInvoices();

  return (
    <div className="rounded-lg border border-gray-800 bg-[#1e293b] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Faturas</h1>
          <p className="text-gray-400">Gerencie suas faturas e acompanhe os pagamentos</p>
        </div>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700" asChild>
          <Link href="/invoices/create">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nova Fatura
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      {/* <div className="bg-[#232f43] rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-[#2a3749] border-gray-700 text-white">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Data Inicial</label>
          <Input
            type="text"
            placeholder="dd/mm/aaaa"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-[#2a3749] border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Data Final</label>
          <Input
            type="text"
            placeholder="dd/mm/aaaa"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-[#2a3749] border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Buscar</label>
          <Input
            type="text"
            placeholder="ID ou descrição"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#2a3749] border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div> */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">DATA</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">DESCRIÇÃO</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">VALOR</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">STATUS</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice: Invoice) => (
              <tr key={invoice.id} className="border-b border-gray-800">
                <td className="px-4 py-4 text-white">{invoice.id}</td>
                <td className="px-4 py-4 text-white">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-white">{invoice.description}</td>
                <td className="px-4 py-4 text-white">
                  R$ {invoice.amount.toFixed(2).replace('.', ',')}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-gray-700"
                      asChild
                    >
                      <Link href={`/invoices/${invoice.id}`}>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-700">
                      <Download className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-400">Mostrando 1 - 3 de 50 resultados</div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 border-gray-700 bg-[#2a3749]">
            &lt;
          </Button>
          <Button size="sm" className="h-8 w-8 bg-indigo-600 text-white">
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-gray-700 bg-[#2a3749]">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-gray-700 bg-[#2a3749]">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-gray-700 bg-[#2a3749]">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
