import React from "react";

const TotalPrice = ({ total }) => {
  const formattedTotal = total && !isNaN(total) ? total : 0;

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount).replace("Rp", "Rp.");
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-right">Total: {formatRupiah(formattedTotal)}</h2>
    </div>
  );
};

export default TotalPrice;
