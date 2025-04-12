import React, { createContext, useContext, useState } from "react";
import { Lead } from "../types/interfaces";
import { deleteLeads as deleteLeadsApi } from "../service/api";
import { toast } from "react-toastify";

interface LeadsContextType {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  deleteLeads: (leadIds: string[]) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const deleteLeads = async (leadIds: string[]) => {
    const result = await deleteLeadsApi(leadIds);
    if (result?.success) {
      setLeads((prevLeads) =>
        prevLeads.filter((lead) => !leadIds.includes(lead.id!))
      );
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <LeadsContext.Provider value={{ leads, setLeads, deleteLeads }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
};
