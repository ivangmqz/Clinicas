"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import Modal from "@/components/admin/Modal";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/database.types";

const EMPTY: Omit<Product, "id" | "created_at"> = {
  name: "",
  description: "",
  sku: "",
  category: "",
  price: null,
  stock: 0,
  low_stock_threshold: 5,
  image_url: null,
  active: true,
  sort_order: 0
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | (typeof EMPTY & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const isNew = !("id" in editing) || !editing.id;
    const url = isNew ? "/api/products" : `/api/products/${editing.id}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing)
    });
    setSaving(false);
    if (res.ok) {
      setEditing(null);
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }

  async function adjustStock(product: Product, delta: number) {
    const newStock = Math.max(0, product.stock + delta);
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p)));
    await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock })
    });
  }

  const lowStockCount = products.filter((p) => p.active && p.stock <= p.low_stock_threshold).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-900">Productos e inventario</h1>
          <p className="mt-1 text-sm text-slate-500">Catálogo de productos y control de stock.</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary">
          + Nuevo producto
        </button>
      </div>

      {lowStockCount > 0 && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          ⚠ {lowStockCount} producto{lowStockCount > 1 ? "s" : ""} con stock bajo o agotado.
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const low = p.stock <= p.low_stock_threshold;
                return (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image_url} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        )}
                        <div>
                          <p className="font-medium text-clinic-900">{p.name}</p>
                          {p.sku && <p className="text-xs text-slate-400">SKU: {p.sku}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.category || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{formatPrice(p.price)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustStock(p, -1)}
                          className="h-6 w-6 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-50"
                        >
                          −
                        </button>
                        <span className={`w-6 text-center font-semibold ${low ? "text-red-500" : "text-slate-700"}`}>
                          {p.stock}
                        </span>
                        <button
                          onClick={() => adjustStock(p, 1)}
                          className="h-6 w-6 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {!p.active ? (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Inactivo</span>
                      ) : p.stock === 0 ? (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">Agotado</span>
                      ) : low ? (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Stock bajo</span>
                      ) : (
                        <span className="rounded-full bg-clinic-50 px-2 py-0.5 text-xs font-medium text-clinic-700">Disponible</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setEditing(p)} className="font-medium text-clinic-700 hover:underline">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="font-medium text-red-500 hover:underline">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                    No hay productos todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-clinic-900">
              {"id" in editing && editing.id ? "Editar producto" : "Nuevo producto"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label">Nombre</label>
                <input
                  required
                  className="input"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Categoría</label>
                <input
                  className="input"
                  placeholder="Ej. Cuidado facial"
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                />
              </div>
              <div>
                <label className="label">SKU / código (opcional)</label>
                <input
                  className="input"
                  value={editing.sku ?? ""}
                  onChange={(e) => setEditing({ ...editing, sku: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Descripción</label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Precio (MXN)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={editing.price ?? ""}
                  onChange={(e) => setEditing({ ...editing, price: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
              <div>
                <label className="label">Stock actual</label>
                <input
                  type="number"
                  min={0}
                  className="input"
                  value={editing.stock}
                  onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="label">Umbral de stock bajo</label>
                <input
                  type="number"
                  min={0}
                  className="input"
                  value={editing.low_stock_threshold}
                  onChange={(e) => setEditing({ ...editing, low_stock_threshold: Number(e.target.value) })}
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUploader value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Visible en el sitio
              </label>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? "Guardando..." : "Guardar"}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
