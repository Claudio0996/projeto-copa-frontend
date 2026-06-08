import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../auth/hooks/useAuth";
import useVendors from "../../hooks/useVendors";
import useSdrs from "../../hooks/useSdrs";
import { createSale, updateSale } from "../../../../shared/apiClient";
import styles from "./SaleForm.module.css";

export default function SaleForm({ sale, onClose }) {
  const isEdit = sale != null;
  const { state } = useAuth();
  const queryClient = useQueryClient();
  const { vendors } = useVendors();
  const { sdrs } = useSdrs();

  const [formData, setFormData] = useState({
    vendor: sale?.vendor._id ?? "",
    sdrId: sale?.sdrId._id ?? "",
    realizedAt: sale?.realizedAt.slice(0, 16) ?? "",
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      isEdit
        ? updateSale({ saleId: sale._id, salesData: data, token: state.token })
        : createSale({ salesData: data, token: state.token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales-admin"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-scoreboard"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-rank"] });
      onClose();
    },
  });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Vendedor
        <select name="vendor" value={formData.vendor} onChange={handleChange} className={styles.select} required>
          <option value="">Selecione um vendedor</option>
          {vendors?.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Assistente
        <select name="sdrId" value={formData.sdrId} onChange={handleChange} className={styles.select}>
          <option value="">Selecione um assistente</option>
          {sdrs?.map((sdr) => (
            <option key={sdr._id} value={sdr._id}>
              {sdr.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Data da venda
        <input
          className={styles.input}
          type="datetime-local"
          name="realizedAt"
          value={formData.realizedAt}
          onChange={handleChange}
          required
        />
      </label>

      {mutation.isError && <p className={styles.error}>{mutation.error?.message ?? "Erro ao salvar venda"}</p>}

      <div className={styles.actions}>
        <button type="button" className={styles.cancel_button} onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className={styles.submit_button} disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar venda"}
        </button>
      </div>
    </form>
  );
}
