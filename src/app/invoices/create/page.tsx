import type React from 'react';

import { InvoiceForm } from './InvoiceForm';

export default function CreateInvoicePage() {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#1e293b] p-6">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-white">Nova Fatura</h1>

        <p className="text-gray-400">Preencha os dados abaixo para processar um novo pagamento</p>
      </div>

      <InvoiceForm />
    </div>
  );
}
